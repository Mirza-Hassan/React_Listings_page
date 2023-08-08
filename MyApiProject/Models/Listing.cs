public class Listing
{
    public int id { get; set; }
    public int bedrooms_count { get; set; }
    public string building_type { get; set; }
    public string contact_phone_number { get; set; }
    public DateTime created_date { get; set; }
    public string description { get; set; }
    public double latest_price_eur { get; set; }
    public string name { get; set; }
    public PostalAddress postal_address { get; set; }
    public int rooms_count { get; set; }
    public double surface_area_m2 { get; set; }
    public DateTime updated_date { get; set; }
}

public class PostalAddress
{
    public string city { get; set; }
    public string country { get; set; }
    public string postal_code { get; set; }
    public string street_address { get; set; }
}

public class PriceHistory
{
    public DateTime created_date { get; set; }
    public double latest_price_eur { get; set; }
}
