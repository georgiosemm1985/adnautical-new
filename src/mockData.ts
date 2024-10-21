import { Boat, User, BlogPost, BlogCategory } from './types';
import { countries } from './data/countries';

export const boats: Boat[] = [
  {
    id: 1,
    title: "Luxury Yacht 2024",
    price: 1500000,
    location: "Miami",
    country: "USA",
    slug: "luxury-yacht-2024",
    images: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1574351406668-7585cd5b080c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    length: 75,
    width: 20,
    depth: 6,
    engine: "Twin Caterpillar 1000HP",
    year: 2024,
    condition: "New",
    description: "Experience luxury on the water with this state-of-the-art yacht. Perfect for entertaining or extended cruises.",
    sellerId: 3,
    category: "yacht"
  },
  {
    id: 2,
    title: "Classic Sailboat",
    price: 85000,
    location: "San Francisco",
    country: "USA",
    slug: "classic-sailboat",
    images: [
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1534854638093-bada1813ca19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    length: 35,
    width: 10,
    depth: 5,
    engine: "Yanmar 30HP Diesel",
    year: 1985,
    condition: "Excellent",
    description: "Beautiful classic sailboat in excellent condition. Perfect for weekend sailing or coastal cruising.",
    sellerId: 2,
    category: "sailboat"
  },
  {
    id: 3,
    title: "Fishing Boat 2022",
    price: 45000,
    location: "Seattle",
    country: "USA",
    slug: "fishing-boat-2022",
    images: [
      "https://images.unsplash.com/photo-1564762861003-0e8a7c2f6a8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1531638280689-3b3a997ccc5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1563394867880-0e2ab0cb2ebe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    length: 22,
    width: 8,
    depth: 3,
    engine: "Mercury 150HP Outboard",
    year: 2022,
    condition: "Like New",
    description: "Versatile fishing boat perfect for both freshwater and saltwater fishing. Equipped with the latest fish-finding technology.",
    sellerId: 3,
    category: "motorboat"
  },
  {
    id: 4,
    title: "Luxury Catamaran",
    price: 950000,
    location: "Honolulu",
    country: "USA",
    slug: "luxury-catamaran",
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    length: 50,
    width: 25,
    depth: 4,
    engine: "Twin Volvo Penta IPS 600",
    year: 2023,
    condition: "New",
    description: "Spacious and stable luxury catamaran, perfect for family cruising or charter operations.",
    sellerId: 3,
    category: "yacht"
  },
  {
    id: 5,
    title: "Performance Racing Sailboat",
    price: 120000,
    location: "Newport",
    country: "USA",
    slug: "performance-racing-sailboat",
    images: [
      "https://images.unsplash.com/photo-1500627964684-26c82a11f255?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    length: 40,
    width: 12,
    depth: 7,
    engine: "Auxiliary Yanmar 40HP",
    year: 2021,
    condition: "Excellent",
    description: "High-performance racing sailboat with a proven track record. Ready for regattas or offshore racing.",
    sellerId: 2,
    category: "sailboat"
  },
  {
    id: 6,
    title: "Family Cruiser Motorboat",
    price: 75000,
    location: "Tampa",
    country: "USA",
    slug: "family-cruiser-motorboat",
    images: [
      "https://images.unsplash.com/photo-1576780656178-7b4cc2e91fc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    length: 28,
    width: 9,
    depth: 3,
    engine: "Single Mercruiser 350HP",
    year: 2020,
    condition: "Very Good",
    description: "Comfortable family cruiser with ample seating and sleeping accommodations. Ideal for weekend getaways.",
    sellerId: 1,
    category: "motorboat"
  }
];

export const users: User[] = [
  // ... (existing user data)
];

export const blogCategories: BlogCategory[] = [
  { id: 1, name: 'Sailing Tips', slug: 'sailing-tips' },
  { id: 2, name: 'Boat Maintenance', slug: 'boat-maintenance' },
  { id: 3, name: 'Marine Technology', slug: 'marine-technology' },
  { id: 4, name: 'Travel Destinations', slug: 'travel-destinations' },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Sailing Destinations for 2024",
    excerpt: "Discover the most breathtaking sailing spots around the world for your next adventure.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "Jane Doe",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1500627964684-26c82a11f255?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categoryId: 4
  },
  {
    id: 2,
    title: "Essential Maintenance Tips for Your Yacht",
    excerpt: "Keep your yacht in top condition with these essential maintenance tips.",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "John Smith",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categoryId: 2
  },
  {
    id: 3,
    title: "The Future of Electric Boats",
    excerpt: "Explore the latest innovations in electric boat technology and their impact on the marine industry.",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Emily Chen",
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categoryId: 3
  },
  {
    id: 4,
    title: "Beginner's Guide to Sailing Knots",
    excerpt: "Learn the essential knots every sailor should know for safety and efficiency on the water.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Michael Johnson",
    date: "2024-02-28",
    image: "https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categoryId: 1
  },
  {
    id: 5,
    title: "Best Coastal Cities for Boat Enthusiasts",
    excerpt: "Discover the top coastal cities around the world that offer the best experiences for boat lovers.",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    author: "Sarah Williams",
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categoryId: 4
  }
];