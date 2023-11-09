using Microsoft.EntityFrameworkCore;
using System.Reflection.PortableExecutable;
using System.Xml;

namespace ProductAppService.Aggregates
{
    public class ProductsDbContext:DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Configure the SQL Server connection string
            optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=ProductsDB;Persist Security Info=True;User ID=sa;Password=bellinadmin;MultipleActiveResultSets=true;TrustServerCertificate=true;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
    new Category { Id = 1, CategoryName = "Electronics" },
    new Category { Id = 2, CategoryName = "Apparel" },
    new Category { Id = 3, CategoryName = "Footwear" }
);

            modelBuilder.Entity<SubCategory>().HasData(
                new SubCategory { Id = 1, SubCategoryName = "TV", CategoryId = 1 },
                new SubCategory { Id = 2, SubCategoryName = "Mobile", CategoryId = 1 },
                new SubCategory { Id = 3, SubCategoryName = "Refrigerator", CategoryId = 1 },
                new SubCategory { Id = 4, SubCategoryName = "Men's Cloth", CategoryId = 2 },
                new SubCategory { Id = 5, SubCategoryName = "Women's Cloth", CategoryId = 2 },
                new SubCategory { Id = 6, SubCategoryName = "Men's Footwear", CategoryId = 3 },
                new SubCategory { Id = 7, SubCategoryName = "Kid's Footwear", CategoryId = 3 }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    ProductCode = "P001",
                    Name = "Product 1",
                    Quantity = 50,
                    Price = 99.99m,
                    Description = "Sample product 1",
                    ImageUrl = "product1.jpg",
                    CategoryId = 1,
                    SubCategoryId = 1
                },
                new Product
                {
                    Id = 2,
                    ProductCode = "P002",
                    Name = "Product 2",
                    Quantity = 25,
                    Price = 49.99m,
                    Description = "Sample product 2",
                    ImageUrl = "product2.jpg",
                    CategoryId = 2,
                    SubCategoryId = 4
                }
            );
            base.OnModelCreating(modelBuilder);
        }
    }
}
