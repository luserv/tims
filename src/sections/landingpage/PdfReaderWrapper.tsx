'use client';

import dynamic from 'next/dynamic';

function PdfViewerSkeleton() {
  return (
    <section className="w-full my-10">
      <div className="border-l-4 border-gold pl-4 mb-8">
        <div className="h-8 w-56 bg-muted animate-pulse rounded" />
        <div className="h-4 w-72 bg-muted animate-pulse rounded mt-2" />
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-12 bg-muted/40 border-b border-border" />
        <div className="h-[520px] bg-muted/20 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blueti border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </section>
  );
}

const PdfReader = dynamic(() => import('./pdfReader'), {
  ssr: false,
  loading: () => <PdfViewerSkeleton />,
});

export default function PdfReaderWrapper() {
  return <PdfReader />;
}
