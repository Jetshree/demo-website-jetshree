import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Using direct local string logic for Vercel traversal instead of process.cwd()
const DOCS_DIRECTORY = './docs';

export interface DocMetadata {
  title: string;
  description: string;
  slug: string;
}

export function getAllDocs(): DocMetadata[] {
  if (!fs.existsSync(DOCS_DIRECTORY)) {
    console.error("Vercel/NextJS Build Error: Missing docs directory at", DOCS_DIRECTORY);
    return [];
  }

  const files = fs.readdirSync(DOCS_DIRECTORY);
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = `${DOCS_DIRECTORY}/${file}`;
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      return {
        title: data.title || file.replace(/\.mdx?$/, ''),
        description: data.description || '',
        slug: file.replace(/\.mdx?$/, ''),
      };
    });
}

export function getDocBySlug(slug: string) {
  const mdxPath = `${DOCS_DIRECTORY}/${slug}.mdx`;
  const mdPath = `${DOCS_DIRECTORY}/${slug}.md`;
  
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    metadata: {
      title: data.title || slug,
      description: data.description || '',
      slug,
    },
    // Fix CRLF issues causing MDX parsing to break formatting
    content: content.replace(/\r\n/g, '\n'),
  };
}
