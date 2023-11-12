using AutoMapper;
using ProductAppService.Aggregates;
using ProductAppService.Commands;
using ProductAppService.Dtos;
using ProductAppService.Repository;
using System.Linq.Expressions;
using System.Text.Json;

namespace ProductAppService.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            //_logger = logger;
        }

        public async Task<ProductDto> CreateProduct(CreateProductCommand createProductCommand)
        {
            var product = _mapper.Map<Product>(createProductCommand);
            _productRepository.Add(product);

            await _productRepository.SaveChangesAsync();

            var addedProduct = await _productRepository.GetByIdAsync(product.Id);

            return _mapper.Map<ProductDto>(addedProduct);
        }

        public async Task<bool> DeleteProductAsync(int productId)
        {
            return await _productRepository.DeleteAsync(productId);
        }

        public async Task<ProductDto> UpdateProduct(UpdateProductCommand updateProductCommand)
        {
            var product = _mapper.Map<Product>(updateProductCommand);

            var savedEntity = _productRepository.Update(product);

            await _productRepository.SaveChangesAsync();

            return _mapper.Map<ProductDto>(savedEntity);
        }


        public async Task<ProductDto> GetProductById(int id)
        {
            return _mapper.Map<ProductDto>(await _productRepository.GetByIdAsync(id));
        }

        public async Task<IReadOnlyCollection<ProductDto>> GetProducts()
        {
            var products = await _productRepository.GetAllAsync();
            return products.Select(p => _mapper.Map<ProductDto>(p)).ToList();
        }

        public async Task<IReadOnlyCollection<ProductDto>> SearchQuery(SearchQueryDto searchQueryDto)
        {
            searchQueryDto.Filter.FilteredProperties.ForEach(s => { s.Value = GetIntValue(s.Value); });

            if (searchQueryDto.Filter.FilteredProperties.All(s => (int)s.Value == 0))
            {
                return await GetProducts();
            }
            else
            {
                var prods = await _productRepository
                    .FindByConditionAsync(
                        LambdaExpressionGenerator.GenerateFilterExpression<Product>(
                            searchQueryDto.Filter.FilteredProperties));

                return prods.Select((p => _mapper.Map<ProductDto>(p))).ToList();
            }
        }

        private int GetIntValue(object categoryFilterValue)
        {
            if (categoryFilterValue is JsonElement el)
            {
                if (el.TryGetInt32(out int result))
                {
                    return result;
                }
            }
            return 0;
        }
    }

    public static class LambdaExpressionGenerator
    {
        public static Expression<Func<T, bool>> GenerateFilterExpression<T>(List<PropertyFilter> filters)
        {
            var parameter = Expression.Parameter(typeof(T), "x");

            var filterExps = filters
                .Where(e => (int)e.Value > 0)
                .Select(e => EqualBinaryExpression<T>(e.PropertyName, e.Value, parameter))
                .ToList();

            return CombineExpressions(filterExps, ExpressionType.And);
        }

        private static Expression<Func<T, bool>> EqualBinaryExpression<T>(string propertyName, object propertyValue,
            ParameterExpression parameter)
        {
            var property = Expression.Property(parameter, propertyName);

            var constant = Expression.Constant(propertyValue);

            var body = Expression.Equal(property, constant);
            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }

        private static Expression<Func<T, bool>> CombineExpressions<T>(
            List<Expression<Func<T, bool>>> expressions,
            ExpressionType operation)
        {
            if (expressions == null || expressions.Count == 0)
            {
                throw new ArgumentException("Expression list is empty");
            }

            ParameterExpression parameter = expressions[0].Parameters[0];

            Expression combinedExpression = expressions[0].Body;

            for (int i = 1; i < expressions.Count; i++)
            {
                // Apply the logical operation (AND or OR) between expressions
                combinedExpression = Expression.MakeBinary(operation, combinedExpression, expressions[i].Body);
            }

            return Expression.Lambda<Func<T, bool>>(combinedExpression, parameter);
        }
    }
}