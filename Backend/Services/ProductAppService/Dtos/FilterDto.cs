namespace ProductAppService.Dtos
{
    public class FilterDto
    {
        public List<PropertyFilter> FilteredProperties { get; set; }
    }

    public class PropertyFilter //(string PropertyName, object Value);
    {
        public string PropertyName { get; set; }
        public object Value { get; set; }
    }
}