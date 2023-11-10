namespace ProductAppService.Aggregates
{
    public class Product : BaseEntity
    {
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }

        public string? ProductCode { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }

        public string? Name { get; set; }
        public string? ImageUrl { get; set; }
    }
}