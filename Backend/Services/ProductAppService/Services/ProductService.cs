using AutoMapper;
using ProductAppService.Aggregates;
using ProductAppService.Commands;
using ProductAppService.Dtos;
using ProductAppService.Repository;
using System.Linq.Expressions;

namespace ProductAppService.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IMapper _mapper;
        public ProductService(IRepository<Product> productRepository , IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }
        public async Task<ProductDto> CreateProduct(CreateProductCommand createProductCommand)
        {
            var product = _mapper.Map<Product>(createProductCommand);
            _productRepository.Add(product);

            await _productRepository.SaveChangesAsync();

            var addedProduct =  await _productRepository.GetByIdAsync(product.Id);
            
            return _mapper.Map<ProductDto>(addedProduct);
        }

        public async Task< bool> DeleteProductAsync(int productId)
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

     
        public async Task< ProductDto> GetProductById(int id)
        {
            return _mapper.Map<ProductDto>(await _productRepository.GetByIdAsync(id));
        }

        public async Task<IReadOnlyCollection<ProductDto>> GetProducts()
        {            
            var products = await _productRepository.GetAllAsync();
            return products.Select(p=> _mapper.Map<ProductDto>(p)).ToList();
        }

        public async Task<IReadOnlyCollection<ProductDto>> SearchQuery(SearchQueryDto searchQueryDto)
        {
            var lambdaExp = LambdaExpressionGenerator.GenerateFilterExpression<Product>(searchQueryDto.Filter.PropertyName, searchQueryDto.Filter.Value);

            var prods = await _productRepository.FindByConditionAsync(lambdaExp);

            return prods.Select(new Func<Product, ProductDto>(p => _mapper.Map<ProductDto>(p))).ToList();
        }
    }

    public static class LambdaExpressionGenerator
    {
        public static Expression<Func<T, bool>> GenerateFilterExpression<T>(string propertyName, object propertyValue)
        {
            var parameter = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(parameter, propertyName);
            //var propertyType = ((PropertyInfo)property.Member).PropertyType;
            //var converter = TypeDescriptor.GetConverter(propertyType); // 1
            //var propertyValue1 = converter.ConvertFrom(propertyValue); // 3
            //var convertedValue = (propertyType.GetType())propertyValue; 
            var constant = Expression.Constant(propertyValue);

            var body = Expression.Equal(property, constant);

            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }

        // private static object ConvertValue(Type targetType, object value)
        // {
        //     // Handle conversion based on the actual types involved
        //     if (targetType == typeof(JsonElement))
        //     {
        //         // Extract the int value from JsonElement
        //         return ((JsonElement)value).GetInt32();
        //     }
        //
        //     // Add more conversion logic as needed
        //
        //     // If no specific conversion is needed, return the original value
        //     return value;
        // }
    } 
}
