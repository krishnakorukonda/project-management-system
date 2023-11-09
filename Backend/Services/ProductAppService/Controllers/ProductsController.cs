using Microsoft.AspNetCore.Mvc;
using ProductAppService.Commands;
using ProductAppService.Dtos;
using ProductAppService.Services;

namespace ProductAppService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        //private readonly ProductsDbContext _context;

        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {            
            _productService = productService;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<IReadOnlyCollection<ProductDto>> GetProducts()
        {            
            return await _productService.GetProducts();
        }

        [HttpPost("Search")]
        public async Task<IReadOnlyCollection<ProductDto>> SearchProducts(SearchQueryDto searchQueryDto)
        {
            return await _productService.SearchQuery(searchQueryDto);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ProductDto> GetProduct(int id)
        {
            return await _productService.GetProductById(id);
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ProductDto> PutProduct(UpdateProductCommand updateProductCommand)
        {            
            return await _productService.UpdateProduct(updateProductCommand);
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ProductDto> PostProduct(CreateProductCommand createProductCommand)
        {
            return await _productService.CreateProduct(createProductCommand);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteProduct(int id)
        {            
            return await _productService.DeleteProductAsync(id);
        }

    }
}
