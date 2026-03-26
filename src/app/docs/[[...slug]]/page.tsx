import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getDocBySlug, getAllDocs } from '@/lib/docs-utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import remarkGfm from 'remark-gfm';

interface DocsPageProps {
  params: Promise<{ slug?: string[] }>;
}

// Ordered doc slugs for prev/next navigation
const DOC_ORDER = ['introduction', 'installation', 'usage', 'configuration', 'running'];

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({ slug: [doc.slug] }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const currentSlug = slug?.[0];
  if (!currentSlug) return { title: 'Documentation | NSB' };
  const doc = getDocBySlug(currentSlug);
  if (!doc) return { title: '404 | NSB' };
  return {
    title: `${doc.metadata.title} | NSB Documentation`,
    description: doc.metadata.description,
  };
}

const DocsPage = async ({ params }: DocsPageProps) => {
  const { slug } = await params;
  const currentSlug = slug?.[0];

  if (!currentSlug) redirect('/docs/introduction');

  const doc = getDocBySlug(currentSlug);
  if (!doc) notFound();

  const allDocs = getAllDocs();
  const currentIndex = DOC_ORDER.indexOf(currentSlug);
  
  const prevSlug = currentIndex > 0 ? DOC_ORDER[currentIndex - 1] : null;
  const nextSlug = currentIndex < DOC_ORDER.length - 1 ? DOC_ORDER[currentIndex + 1] : null;
  
  const prevDoc = prevSlug ? allDocs.find(d => d.slug === prevSlug) : null;
  const nextDoc = nextSlug ? allDocs.find(d => d.slug === nextSlug) : null;

  return (
    <article className="max-w-3xl animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
        <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">{doc.metadata.title}</span>
      </nav>

      {/* Page header */}
      <header className="mb-10 pb-8 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-3 leading-tight">
          {doc.metadata.title}
        </h1>
        {doc.metadata.description && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {doc.metadata.description}
          </p>
        )}
      </header>

      {/* MDX Content */}
      <div className="mdx-content prose prose-slate dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-[1.8] prose-p:text-foreground/80
        prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
        prose-code:before:content-none prose-code:after:content-none
        prose-blockquote:border-l-primary prose-blockquote:not-italic
        prose-strong:text-foreground prose-strong:font-semibold
        prose-ul:text-foreground/80 prose-ol:text-foreground/80
        prose-li:my-1
        prose-hr:border-border">
        <MDXRemote source={doc.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-16 pt-8 border-t border-border grid grid-cols-2 gap-4">
        {prevDoc ? (
          <Link
            href={`/docs/${prevDoc.slug}`}
            className="group flex flex-col gap-1 rounded-xl border border-border p-5 hover:border-primary/50 hover:bg-muted/40 transition-all"
          >
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
              <ChevronLeft size={12} /> Previous
            </span>
            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {prevDoc.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextDoc ? (
          <Link
            href={`/docs/${nextDoc.slug}`}
            className="group flex flex-col gap-1 rounded-xl border border-border p-5 hover:border-primary/50 hover:bg-muted/40 transition-all text-right ml-auto w-full"
          >
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center justify-end gap-1">
              Next <ChevronRight size={12} />
            </span>
            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {nextDoc.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
};

export default DocsPage;
