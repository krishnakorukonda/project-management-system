using AutoMapper;
using ProductAppService;
using ProductAppService.Aggregates;
using ProductAppService.Repository;

namespace ProductService.Tests
{
    public class ProductFixture : IDisposable
    {
        public ProductAppService.Services.ProductService? ProductService;

        public IRepository<Product>? Repository;

        public ProductFixture()
        {
            Init();
        }

        private void Init()
        {
            Repository = NSubstitute.Substitute.For<IRepository<Product>>();
            var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingProfile()); });

            IMapper mapper = mapperConfig.CreateMapper();
            ProductService = new ProductAppService.Services.ProductService(Repository, mapper);
        }

        public void Dispose()
        {
            //repository.
        }
    }
}