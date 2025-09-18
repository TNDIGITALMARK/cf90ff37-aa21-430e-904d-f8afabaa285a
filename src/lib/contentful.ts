import { createClient } from 'contentful';
import { ContentfulClientApi } from 'contentful';

// Contentful client configuration
const client: ContentfulClientApi = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Content types for Luxe Atelier
export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulDesigner {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    slug: string;
    bio: string;
    profileImage?: ContentfulAsset;
    featuredImage?: ContentfulAsset;
    website?: string;
    instagram?: string;
    specialties: string[];
    founded?: string;
    location?: string;
    philosophy?: string;
    awards?: string[];
    featured: boolean;
  };
}

export interface ContentfulProduct {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    sku: string;
    images: ContentfulAsset[];
    category: string;
    designer: ContentfulDesigner;
    materials: string[];
    careInstructions: string[];
    sizes: string[];
    colors: string[];
    inStock: boolean;
    featured: boolean;
    newArrival: boolean;
    onSale: boolean;
    seoTitle?: string;
    seoDescription?: string;
    measurements?: {
      [key: string]: string;
    };
    tags?: string[];
  };
}

export interface ContentfulCollection {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    slug: string;
    description: string;
    featuredImage: ContentfulAsset;
    products: ContentfulProduct[];
    season?: string;
    year?: number;
    featured: boolean;
    seoTitle?: string;
    seoDescription?: string;
  };
}

export interface ContentfulBlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: any; // Rich text content
    featuredImage: ContentfulAsset;
    author: string;
    publishDate: string;
    tags: string[];
    category: string;
    seoTitle?: string;
    seoDescription?: string;
  };
}

export interface ContentfulPage {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    content: any; // Rich text content
    seoTitle?: string;
    seoDescription?: string;
    metaKeywords?: string[];
  };
}

// Contentful API functions
export const contentfulApi = {
  // Get all products
  async getProducts(limit: number = 100, skip: number = 0): Promise<ContentfulProduct[]> {
    try {
      const response = await client.getEntries({
        content_type: 'product',
        limit,
        skip,
        include: 2,
      });
      return response.items as ContentfulProduct[];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get product by slug
  async getProductBySlug(slug: string): Promise<ContentfulProduct | null> {
    try {
      const response = await client.getEntries({
        content_type: 'product',
        'fields.slug': slug,
        limit: 1,
        include: 2,
      });
      return response.items[0] as ContentfulProduct || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Get featured products
  async getFeaturedProducts(limit: number = 8): Promise<ContentfulProduct[]> {
    try {
      const response = await client.getEntries({
        content_type: 'product',
        'fields.featured': true,
        limit,
        include: 2,
        order: '-sys.createdAt',
      });
      return response.items as ContentfulProduct[];
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  // Get new arrivals
  async getNewArrivals(limit: number = 12): Promise<ContentfulProduct[]> {
    try {
      const response = await client.getEntries({
        content_type: 'product',
        'fields.newArrival': true,
        limit,
        include: 2,
        order: '-sys.createdAt',
      });
      return response.items as ContentfulProduct[];
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      return [];
    }
  },

  // Get products by category
  async getProductsByCategory(category: string, limit: number = 20): Promise<ContentfulProduct[]> {
    try {
      const response = await client.getEntries({
        content_type: 'product',
        'fields.category': category,
        limit,
        include: 2,
        order: '-sys.createdAt',
      });
      return response.items as ContentfulProduct[];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Get all designers
  async getDesigners(limit: number = 50): Promise<ContentfulDesigner[]> {
    try {
      const response = await client.getEntries({
        content_type: 'designer',
        limit,
        include: 1,
        order: 'fields.name',
      });
      return response.items as ContentfulDesigner[];
    } catch (error) {
      console.error('Error fetching designers:', error);
      return [];
    }
  },

  // Get designer by slug
  async getDesignerBySlug(slug: string): Promise<ContentfulDesigner | null> {
    try {
      const response = await client.getEntries({
        content_type: 'designer',
        'fields.slug': slug,
        limit: 1,
        include: 1,
      });
      return response.items[0] as ContentfulDesigner || null;
    } catch (error) {
      console.error('Error fetching designer:', error);
      return null;
    }
  },

  // Get featured designers
  async getFeaturedDesigners(limit: number = 6): Promise<ContentfulDesigner[]> {
    try {
      const response = await client.getEntries({
        content_type: 'designer',
        'fields.featured': true,
        limit,
        include: 1,
      });
      return response.items as ContentfulDesigner[];
    } catch (error) {
      console.error('Error fetching featured designers:', error);
      return [];
    }
  },

  // Get collections
  async getCollections(limit: number = 20): Promise<ContentfulCollection[]> {
    try {
      const response = await client.getEntries({
        content_type: 'collection',
        limit,
        include: 2,
        order: '-sys.createdAt',
      });
      return response.items as ContentfulCollection[];
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  },

  // Get collection by slug
  async getCollectionBySlug(slug: string): Promise<ContentfulCollection | null> {
    try {
      const response = await client.getEntries({
        content_type: 'collection',
        'fields.slug': slug,
        limit: 1,
        include: 2,
      });
      return response.items[0] as ContentfulCollection || null;
    } catch (error) {
      console.error('Error fetching collection:', error);
      return null;
    }
  },

  // Get blog posts
  async getBlogPosts(limit: number = 10, skip: number = 0): Promise<ContentfulBlogPost[]> {
    try {
      const response = await client.getEntries({
        content_type: 'blogPost',
        limit,
        skip,
        include: 1,
        order: '-fields.publishDate',
      });
      return response.items as ContentfulBlogPost[];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  // Get page by slug
  async getPageBySlug(slug: string): Promise<ContentfulPage | null> {
    try {
      const response = await client.getEntries({
        content_type: 'page',
        'fields.slug': slug,
        limit: 1,
      });
      return response.items[0] as ContentfulPage || null;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  },

  // Helper function to get optimized image URL
  getOptimizedImageUrl(asset: ContentfulAsset, width?: number, height?: number, format?: string): string {
    if (!asset?.fields?.file?.url) return '';
    
    let url = `https:${asset.fields.file.url}`;
    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    if (format) params.append('fm', format);
    params.append('q', '85'); // Quality
    
    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
  },
};

export default contentfulApi;