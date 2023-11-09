namespace ProductAppService.Aggregates
{
    public class SubCategory: BaseEntity
    {        
        public string? SubCategoryName { get; set;}
        public int CategoryId { get; set; }
    }
}
