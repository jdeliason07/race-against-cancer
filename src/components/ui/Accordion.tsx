'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '@/data/faq';
import { cn } from '@/lib/utils';

export function Accordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <dl className="divide-y divide-line">
      {items.map((item, i) => (
        <div key={i} className="py-6">
          <dt>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 text-left"
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="font-body text-base font-semibold text-ink">
                {item.question}
              </span>
              <span className="shrink-0 text-pink" aria-hidden="true">
                {open === i ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
          </dt>
          <dd
            id={`faq-answer-${i}`}
            className={cn(
              'overflow-hidden transition-all duration-300',
              open === i ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0',
            )}
          >
            <p className="font-body text-sm text-ash leading-relaxed">{item.answer}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}
