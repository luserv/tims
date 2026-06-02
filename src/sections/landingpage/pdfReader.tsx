'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF_FILE = '/docs/malla_curricular_propuesta.pdf';
const BASE_WIDTH = 800;
const MIN_SCALE = 0.5;
const MAX_SCALE = 3.0;
const SCALE_STEP = 0.25;

function ZoomOutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5H6" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

export default function PdfReader() {
  const t = useTranslations('pdfViewer');
  const [numPages, setNumPages] = useState<number>();
  const [scale, setScale] = useState(1.0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full my-10">
      <div className="border-l-4 border-gold pl-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blueti dark:text-foreground">{t('title')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('subtitle')}</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-muted/40 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScale((s) => Math.max(s - SCALE_STEP, MIN_SCALE))}
              disabled={scale <= MIN_SCALE}
              aria-label={t('zoomOut')}
              className="cursor-pointer"
            >
              <ZoomOutIcon />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[52px] text-center tabular-nums font-mono">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE))}
              disabled={scale >= MAX_SCALE}
              aria-label={t('zoomIn')}
              className="cursor-pointer"
            >
              <ZoomInIcon />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setScale(1.0)}
              aria-label={t('zoomReset')}
              className="cursor-pointer"
            >
              <ResetIcon />
            </Button>
          </div>

          <a
            href={PDF_FILE}
            download="malla_curricular_propuesta.pdf"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blueti hover:bg-blueti/90 text-white text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer"
          >
            <DownloadIcon />
            {t('download')}
          </a>
        </div>

        {/* PDF viewport */}
        <div
          ref={containerRef}
          className="overflow-auto bg-muted/20"
          style={{ height: '520px', scrollbarWidth: 'thin' }}
        >
          <Document
            file={PDF_FILE}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="flex flex-col items-center py-4 min-w-fit"
          >
            {numPages &&
              Array.from({ length: numPages }, (_, i) => (
                <Page
                  key={`page_${i + 1}`}
                  pageNumber={i + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="mb-4 shadow-sm"
                  width={BASE_WIDTH * scale}
                />
              ))}
          </Document>
        </div>
      </div>
    </section>
  );
}
