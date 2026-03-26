import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_DIRECTORY = path.join(process.cwd(), '../nsb/docs');

export interface DocMetadata {
  title: string;
  description: string;
  slug: string;
}

export function getAllDocs(): DocMetadata[] {
  if (!fs.existsSync(DOCS_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(DOCS_DIRECTORY);
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(DOCS_DIRECTORY, file);
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
  const mdxPath = path.join(DOCS_DIRECTORY, `${slug}.mdx`);
  const mdPath = path.join(DOCS_DIRECTORY, `${slug}.md`);
  
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
    content,
  };
}
