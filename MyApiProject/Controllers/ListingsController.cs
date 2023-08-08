using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;

[ApiController]
[Route("listings")]
[EnableCors("AllowAll")]

public class ListingsController : ControllerBase
{
    // In-memory storage to hold the listings
    private static List<Listing> listings = new List<Listing>();

   // GET: /listings/{id}/prices
    [HttpGet("{id}/prices")]
    public ActionResult<IEnumerable<PriceHistory>> GetPrices(int id)
    {
        var listing = listings.FirstOrDefault(l => l.id == id);

        if (listing == null)
        {
            return NotFound($"Listing with ID {id} not found");
        }

        var priceHistory = new List<PriceHistory>
        {
            new PriceHistory { created_date = listing.created_date, latest_price_eur = listing.latest_price_eur }
        };

        // Optionally, you can also retrieve additional price history records from your database here

        return Ok(priceHistory);
    }

    // POST: /listings
    [HttpPost]
    public ActionResult<Listing> CreateListing([FromBody] Listing listing)
    {
        // Generate a unique ID - this could be done in various ways
        // Here we'll just use the next integer that hasn't been used yet
        listing.id = listings.Count > 0 ? listings.Max(l => l.id) + 1 : 1;

        // Set the created and updated dates to the current time
        listing.created_date = DateTime.UtcNow;
        listing.updated_date = DateTime.UtcNow;

        // Add the listing to the in-memory list
        listings.Add(listing);

        // Returning the newly created listing
        return CreatedAtAction(nameof(GetListings), new { id = listing.id }, listing);
    }

    // GET: /listings
    [HttpGet]
    public ActionResult<IEnumerable<Listing>> GetListings()
    {
        // Returning all the listings from the in-memory list
        return Ok(listings);
    }

    // PUT: /listings/{id}
    [HttpPut("{id}")]
    public ActionResult<Listing> UpdateListing(int id, [FromBody] Listing updatedListing)
    {
        // Find the listing with the specified ID
        var listing = listings.FirstOrDefault(l => l.id == id);

        // If the listing is not found, return a NotFound status
        if (listing == null)
        {
            return NotFound();
        }

        // Update the listing properties
        listing.name = updatedListing.name;
        listing.postal_address = updatedListing.postal_address;
        listing.description = updatedListing.description;
        listing.building_type = updatedListing.building_type;
        listing.latest_price_eur = updatedListing.latest_price_eur;
        listing.surface_area_m2 = updatedListing.surface_area_m2;
        listing.rooms_count = updatedListing.rooms_count;
        listing.bedrooms_count = updatedListing.bedrooms_count;
        listing.contact_phone_number = updatedListing.contact_phone_number;

        // Update the updated_date to the current time
        listing.updated_date = DateTime.UtcNow;

        // Return the updated listing
        return Ok(listing);
        }
    }
