using Microsoft.AspNetCore.Mvc;
using ProductAppService.Dtos;
using ProductAppService.Services;

namespace ProductAppService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<IReadOnlyCollection<CategoryDto>> GetCategories()
        {
            return await _categoryService.GetCategories();
        }


        // GET: api/Products
        [HttpGet("{id}/subcategories")]
        public async Task<IReadOnlyCollection<SubCategoryDto>> GetSubCategoriesBasedOnCategoryId(int id)
        {
            return await _categoryService.GetSubCategories(id);
        }
    }
}