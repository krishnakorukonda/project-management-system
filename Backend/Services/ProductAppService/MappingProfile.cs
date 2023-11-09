using AutoMapper;
using ProductAppService.Aggregates;
using ProductAppService.Commands;
using ProductAppService.Dtos;

namespace ProductAppService
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductCommand, Product>();
            CreateMap<UpdateProductCommand, Product>();

        }
    }
}
