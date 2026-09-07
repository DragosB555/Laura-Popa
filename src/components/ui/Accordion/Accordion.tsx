'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Collapse } from '@/components/ui/Collapse';
import styles from './Accordion.module.css';

export type AccordionItem = {
  question: string;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Permite deschiderea mai multor răspunsuri simultan. Implicit: `false`. */
  allowMultiple?: boolean;
  className?: string;
};

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const baseId = useId();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  function toggle(index: number) {
    setOpenIndexes((current) => {
      const isOpen = current.includes(index);
      if (isOpen) return current.filter((i) => i !== index);
      return allowMultiple ? [...current, index] : [index];
    });
  }

  return (
    <ul className={cx(styles.list, className)}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={item.question} className={styles.item}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={styles.trigger}
              >
                <span>{item.question}</span>
                <svg
                  className={styles.icon}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M8 2.5v11M2.5 8h11" />
                </svg>
              </button>
            </h3>

            <Collapse open={isOpen} id={panelId} role="region" aria-labelledby={triggerId}>
              <div className={styles.panelContent}>{item.answer}</div>
            </Collapse>
          </li>
        );
      })}
    </ul>
  );
}
