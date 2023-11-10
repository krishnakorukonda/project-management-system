using AutoMapper;
using NSubstitute;
using ProductAppService;
using ProductAppService.Aggregates;
using ProductAppService.Repository;
using ProductAppService.Services;

namespace ProductService.Tests;

public class ProductServiceTest : IClassFixture<ProductFixture>
{
    public ProductFixture _productFixture;

    public ProductServiceTest(ProductFixture productFixture)
    {
        _productFixture = productFixture;
    }

    [Fact]
    public void CreateProduct_ProductAdded()
    {
        var response = _productFixture.ProductService.CreateProduct(
            new ProductAppService.Commands.CreateProductCommand()
            {
                CategoryId = 1,
                Description = "sa",
                Name = "na",
                Price = 1000,
                ProductCode = "P1",
                Quantity = 100,
                SubCategoryId = 2
            });

        Assert.NotNull(response);
        _productFixture.Repository.Received()
            .Add(Arg.Is<Product>(p => p.CategoryId == 1 && p.SubCategoryId == 2 && p.Quantity == 100));
    }

    [Fact]
    public void UpdateProduct_ProductUpdated()
    {
        var response = _productFixture.ProductService.UpdateProduct(
            new ProductAppService.Commands.UpdateProductCommand()
            {
                CategoryId = 1,
                Description = "sa",
                Name = "na",
                Price = 1000,
                ProductCode = "P1",
                Quantity = 100,
                SubCategoryId = 2
            });

        Assert.NotNull(response);
        _productFixture.Repository.Received()
            .Update(Arg.Is<Product>(
                p => p.CategoryId == 1
                     && p.SubCategoryId == 2
                     && p.Quantity == 100));
    }
}