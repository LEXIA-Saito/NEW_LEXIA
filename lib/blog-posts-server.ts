import { cache } from "react"
import type { BlogPost } from "./blog-posts.types"
import fs from 'fs/promises';
import path from 'path';
import { computeReadingTime, withComputedReadingTime } from "./blog-posts"; // Import client-safe functions

const blogDataDir = path.join(process.cwd(), 'data', 'blog');

export async function fetchLocalBlogPosts(): Promise<BlogPost[]> {
  try {
    const filenames = await fs.readdir(blogDataDir);
    const posts = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.ts'))
        .map(async filename => {
          const { post } = await import(`@/data/blog/${filename.replace(/\.ts$/, '')}`);
          return post;
        })
    );
    return posts.map(withComputedReadingTime);
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export async function fetchLocalBlogPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const { post } = await import(`@/data/blog/${slug}`);
    return post ? withComputedReadingTime(post) : undefined;
  } catch (error) {
    // It's okay if a post is not found, so just log other errors.
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.error(`Failed to fetch blog post with slug "${slug}":`, error);
    }
    return undefined;
  }
}

export const fetchBlogPosts = cache(fetchLocalBlogPosts)

export const fetchBlogPost = cache(fetchLocalBlogPost)
