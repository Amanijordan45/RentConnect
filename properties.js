// RentConnect — Sample Property Data
// All images use Unsplash placeholders (no auth required)

const PROPERTIES = [
  {
    id: 1,
    title: "Modern Studio in Nakasero",
    location: "Nakasero, Kampala",
    city: "Kampala",
    price: 850000,
    currency: "UGX",
    type: "Studio",
    bedrooms: 0,
    bathrooms: 1,
    area: 35,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=800&q=80"
    ],
    description: "A beautifully designed studio apartment in the heart of Nakasero. Floor-to-ceiling windows flood the space with natural light. Walking distance to restaurants, cafes, and business centres.",
    amenities: ["WiFi", "Security", "Parking", "Water", "Generator", "Gym"],
    landlord: { name: "Sarah Nakato", phone: "+256 701 234 567", rating: 4.8, reviews: 24 },
    available: true,
    featured: true,
    dateAdded: "2024-12-01"
  },
  {
    id: 2,
    title: "Spacious 2BR Apartment, Kololo",
    location: "Kololo, Kampala",
    city: "Kampala",
    price: 1800000,
    currency: "UGX",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80"
    ],
    description: "Elegant 2-bedroom apartment in the prestigious Kololo hill area. Fully fitted kitchen, large balcony with panoramic city views, and access to rooftop pool.",
    amenities: ["WiFi", "Pool", "Security", "Parking", "Water", "Generator", "Gym", "Balcony"],
    landlord: { name: "James Ssemwezi", phone: "+256 702 345 678", rating: 4.9, reviews: 41 },
    available: true,
    featured: true,
    dateAdded: "2024-11-15"
  },
  {
    id: 3,
    title: "Executive 3BR House, Muyenga",
    location: "Muyenga, Kampala",
    city: "Kampala",
    price: 3500000,
    currency: "UGX",
    type: "House",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80"
    ],
    description: "Stunning executive home on Muyenga hill with sweeping views of Lake Victoria. Private garden, double garage, servant quarters, and a mature fruit garden.",
    amenities: ["WiFi", "Garden", "Security", "Parking", "Water", "Generator", "DSTV", "Servant Quarters"],
    landlord: { name: "Grace Akello", phone: "+256 703 456 789", rating: 5.0, reviews: 18 },
    available: true,
    featured: true,
    dateAdded: "2024-10-22"
  },
  {
    id: 4,
    title: "Cosy 1BR Flat, Ntinda",
    location: "Ntinda, Kampala",
    city: "Kampala",
    price: 650000,
    currency: "UGX",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80"
    ],
    description: "A warm and inviting one-bedroom flat in Ntinda. Recently renovated with modern finishes, tiled throughout, and a compact private balcony.",
    amenities: ["WiFi", "Security", "Water", "Generator"],
    landlord: { name: "Peter Okello", phone: "+256 704 567 890", rating: 4.6, reviews: 33 },
    available: true,
    featured: false,
    dateAdded: "2024-12-05"
  },
  {
    id: 5,
    title: "Luxury Penthouse, Bugolobi",
    location: "Bugolobi, Kampala",
    city: "Kampala",
    price: 6000000,
    currency: "UGX",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    area: 280,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80"
    ],
    description: "A rare and opulent penthouse atop Bugolobi's most iconic building. Private rooftop terrace, wine cellar, home theatre, and butler service available.",
    amenities: ["WiFi", "Pool", "Gym", "Security", "Parking", "Water", "Generator", "DSTV", "Rooftop Terrace", "Butler"],
    landlord: { name: "Amanda Nabirye", phone: "+256 705 678 901", rating: 4.9, reviews: 12 },
    available: true,
    featured: true,
    dateAdded: "2024-09-30"
  },
  {
    id: 6,
    title: "Modern Office Space, Kampala CBD",
    location: "City Centre, Kampala",
    city: "Kampala",
    price: 2200000,
    currency: "UGX",
    type: "Office",
    bedrooms: 0,
    bathrooms: 2,
    area: 120,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80"
    ],
    description: "Prime office space on the 12th floor of Kampala's Business Tower. Open-plan layout with glass partitions, server room, kitchenette and stunning city views.",
    amenities: ["WiFi", "Security", "Parking", "Generator", "Reception", "Meeting Rooms"],
    landlord: { name: "David Musoke", phone: "+256 706 789 012", rating: 4.7, reviews: 29 },
    available: true,
    featured: false,
    dateAdded: "2024-11-28"
  },
  {
    id: 7,
    title: "Garden Cottage, Lubowa",
    location: "Lubowa, Kampala",
    city: "Kampala",
    price: 1200000,
    currency: "UGX",
    type: "House",
    bedrooms: 2,
    bathrooms: 1,
    area: 80,
    images: [
      "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=800&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80"
    ],
    description: "Charming garden cottage in the serene Lubowa estate. Surrounded by tropical gardens, with a wide verandah, outdoor braai area, and pet-friendly compound.",
    amenities: ["WiFi", "Garden", "Security", "Parking", "Water", "DSTV"],
    landlord: { name: "Ruth Namutebi", phone: "+256 707 890 123", rating: 4.5, reviews: 16 },
    available: true,
    featured: false,
    dateAdded: "2024-12-10"
  },
  {
    id: 8,
    title: "Smart 1BR, Kisaasi",
    location: "Kisaasi, Kampala",
    city: "Kampala",
    price: 550000,
    currency: "UGX",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 48,
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80",
      "https://images.unsplash.com/photo-1549388604-817d15aa0110?w=800&q=80"
    ],
    description: "Affordable smart apartment with solar-powered amenities. Ideal for young professionals. Close to schools, supermarkets, and matatu stage.",
    amenities: ["WiFi", "Security", "Water", "Solar Power"],
    landlord: { name: "Moses Kibuuka", phone: "+256 708 901 234", rating: 4.3, reviews: 52 },
    available: true,
    featured: false,
    dateAdded: "2024-12-12"
  },
  {
    id: 9,
    title: "4BR Villa, Munyonyo",
    location: "Munyonyo, Kampala",
    city: "Kampala",
    price: 5500000,
    currency: "UGX",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257592-4a9a32f9141b?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=800&q=80"
    ],
    description: "Magnificent lakeside villa in Munyonyo with private jetty, infinity pool, and landscaped gardens. Perfect for families seeking luxury and tranquility.",
    amenities: ["WiFi", "Pool", "Garden", "Jetty", "Security", "Parking", "Generator", "DSTV", "Gym", "Sauna"],
    landlord: { name: "Christine Bukenya", phone: "+256 709 012 345", rating: 5.0, reviews: 8 },
    available: false,
    featured: true,
    dateAdded: "2024-08-14"
  }
];

// Statistics shown on homepage
const SITE_STATS = {
  properties: 1240,
  cities: 12,
  landlords: 380,
  renters: 5600
};

// Testimonials
const TESTIMONIALS = [
  {
    name: "Brian Ssebulime",
    role: "Renter · Kololo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "RentConnect made finding my apartment so easy. I viewed 6 listings in one afternoon and moved in within a week. The landlord verification gave me real peace of mind.",
    rating: 5
  },
  {
    name: "Olivia Namukasa",
    role: "Landlord · Ntinda",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    text: "I listed my three properties and had tenants within days. The dashboard makes managing everything so simple. I've referred all my friends who are landlords.",
    rating: 5
  },
  {
    name: "Samuel Ochieng",
    role: "Renter · Muyenga",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    text: "The search filters are incredibly detailed. I found exactly what I needed — 3 bedrooms, pet-friendly, with parking — in under 10 minutes. Exceptional platform.",
    rating: 5
  }
];

// Export for use across pages
if (typeof module !== 'undefined') {
  module.exports = { PROPERTIES, SITE_STATS, TESTIMONIALS };
}
