namespace ProductAppService.Aggregates
{
    public class SubCategory: BaseEntity
    {        
        public int Id { get; set; }
        public string? SubCategoryName { get; set;}
        public int CategoryId { get; set; }
    }
}
