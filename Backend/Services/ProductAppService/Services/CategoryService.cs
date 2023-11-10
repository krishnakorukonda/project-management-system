using AutoMapper;
using ProductAppService.Aggregates;
using ProductAppService.Dtos;
using ProductAppService.Repository;

namespace ProductAppService.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly IMapper _mapper;
        private readonly IRepository<SubCategory> _subCatgoryRepository;

        public CategoryService(
            IRepository<Category> catRepository,
            IRepository<SubCategory> subCatgoryRepository,
            IMapper mapper)
        {
            _categoryRepository = catRepository;
            _mapper = mapper;
            _subCatgoryRepository = subCatgoryRepository;
        }

        public async Task<IReadOnlyCollection<CategoryDto>> GetCategories()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return categories.Select(c => _mapper.Map<CategoryDto>(c)).ToList();
        }

        public async Task<IReadOnlyCollection<SubCategoryDto>> GetSubCategories(int categoryId)
        {
            var subCategories = await _subCatgoryRepository.FindByConditionAsync(c => c.CategoryId == categoryId);

            return subCategories.Select(s => _mapper.Map<SubCategoryDto>(s)).ToList();
        }
    }
}