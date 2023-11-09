using ProductAppService.Commands;
using ProductAppService.Dtos;

namespace ProductAppService.Services
{
    public interface IProductService
    {
        public Task< IReadOnlyCollection<ProductDto>> GetProducts();
        public Task<ProductDto> GetProductById(int id);
        public Task<ProductDto> CreateProduct(CreateProductCommand createProductCommand);
        public Task<ProductDto> UpdateProduct(UpdateProductCommand updateProductCommand);

        public Task<bool> DeleteProductAsync(int id);

        public Task<IReadOnlyCollection<ProductDto>> SearchQuery(SearchQueryDto searchQueryDto);        
    }
}
