using ProductAppService.Dtos;

namespace ProductAppService.Services
{
    public interface ICategoryService
    {
        Task<IReadOnlyCollection<CategoryDto>> GetCategories();
        Task<IReadOnlyCollection<SubCategoryDto>> GetSubCategories(int categoryId);
    }
}