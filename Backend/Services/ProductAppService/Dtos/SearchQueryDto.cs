using Newtonsoft.Json.Schema;

namespace ProductAppService.Dtos
{
    public class SearchQueryDto
    {
        public SearchQueryDto()
        {
        }

        public FilterDto Filter { get; set; }       
    }
    
}
