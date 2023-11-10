namespace ProductAppService.Dtos
{
    public class SubCategoryDto
    {
        public int Id { get; set; }
        public string SubCategoryName { get; set; }

        public int CategoryId { get; set; }
    }
}