export type WorkCategory = "photography" | "design" | "technology" | "writing" | "spoken-word" | "event";

export interface BaseWorkItem {
  slug: string;
  title: string;
  description: string;
  category: WorkCategory;
  date?: string;
  coverImage?: string;
  gallery?: string[];
  externalLink?: string;
  relatedLinks?: { label: string; url: string }[];
  featured?: boolean;
}

export interface PhotographyCollection extends BaseWorkItem {
  category: "photography";
  title: string;
  description: string;
  coverImage: string;
  galleryLink: string;
  subcategory: "Portraits" | "Events" | "Nature" | "Creative Concepts";
}

export interface DesignProject extends BaseWorkItem {
  category: "design";
  behanceLink?: string;
  canvaLink?: string;
  figmaLink?: string;
  tools?: string[];
  role?: string;
}

export interface TechProject extends BaseWorkItem {
  category: "technology";
  techStack: string[];
  githubLink: string;
  demoLink?: string;
  role?: string;
  tools?: string[];
}

export interface WritingItem extends BaseWorkItem {
  category: "writing";
  excerpt: string;
  readTime?: string;
  publishedAt?: string;
  substackLink: string;
  body?: string;
}

export interface SpokenWordItem extends BaseWorkItem {
  category: "spoken-word";
  excerpt: string;
  performanceDescription: string;
  videoUrl?: string;
  youtubeLink?: string;
  instagramLink?: string;
}

export interface EventItem extends BaseWorkItem {
  category: "event";
  role: string;
  photoGallery?: string[];
  videoGallery?: string[];
  testimonial?: string;
}

export type PortfolioItem = PhotographyCollection | DesignProject | TechProject | WritingItem | SpokenWordItem | EventItem;
