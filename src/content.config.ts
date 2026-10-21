import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    category: z.enum(['AI & Developer Tools', 'React Native']),
    featured: z.boolean().default(false),
    order: z.number().int(),
    icon: z.enum(['graph', 'route', 'skills', 'otp', 'spark']),
    tags: z.array(z.string()),
    repository: z.string().url(),
    packageUrl: z.string().url().optional(),
    docsUrl: z.string().url().optional(),
    demoCommands: z.array(z.string().min(1)).min(1).max(4),
    screenshots: z.array(z.object({ src: z.string().url(), alt: z.string().min(1), caption: z.string().min(1) })).optional(),
    highlights: z.array(z.string()),
  }),
});

export const collections = { projects };
