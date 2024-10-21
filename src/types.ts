export interface Boat {
  // ... (existing Boat interface)
}

export interface User {
  // ... (existing User interface)
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  categoryId: number; // Add this line
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}