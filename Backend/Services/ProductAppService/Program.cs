using AutoMapper;
using Microsoft.AspNetCore.Diagnostics;
using ProductAppService;
using ProductAppService.Aggregates;
using ProductAppService.Filters;
using ProductAppService.Repository;
using ProductAppService.Services;

var builder = WebApplication.CreateBuilder(args);

//var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddControllers(options => { options.Filters.Add<HttpResponseExceptionFilter>(); });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingProfile()); });

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IRepository<Category>, Repository<Category>>();
builder.Services.AddScoped<IRepository<SubCategory>, Repository<SubCategory>>();
builder.Services.AddScoped<IRepository<Product>, Repository<Product>>();

builder.Services.AddDbContext<ProductsDbContext>();

var app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseExceptionHandler(c => c.Run(async context =>
{
    var exception = context.Features
        .Get<IExceptionHandlerPathFeature>()
        .Error;
    var response = new { error = "Custom: " + exception.Message };
    await context.Response.WriteAsJsonAsync(response);
}));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();