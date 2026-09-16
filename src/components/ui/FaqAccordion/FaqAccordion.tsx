'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Collapse } from '@/components/ui/Collapse';
import styles from './FaqAccordion.module.css';

export type FaqAccordionItem = {
  id: number | string;
  question: string;
  answer: ReactNode;
  /** Pictograma optionala (emoji sau nod React) afisata langa raspuns. */
  icon?: ReactNode;
  /** Partea pe care apare pictograma. Implicit: `left`. */
  iconPosition?: 'left' | 'right';
};

type FaqAccordionProps = {
  data: FaqAccordionItem[];
  /** Permite deschiderea mai multor raspunsuri simultan. Implicit: `false`. */
  allowMultiple?: boolean;
  /** Text discret sub lista (ex. „Actualizat saptamanal”). */
  timestamp?: string;
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
};

/** FAQ in forma de conversatie: intrebarea e un rand, raspunsul apare ca o bula. */
export function FaqAccordion({
  data,
  allowMultiple = false,
  timestamp,
  className,
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Array<number | string>>([]);

  function toggle(id: number | string) {
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id);
      return allowMultiple ? [...current, id] : [id];
    });
  }

  return (
    <div className={cx(styles.root, className)}>
      <ul className={styles.list}>
        {data.map((item) => {
          const isOpen = openIds.includes(item.id);
          const triggerId = `${baseId}-trigger-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;
          const iconPosition = item.iconPosition ?? 'left';

          return (
            <li key={item.id} className={styles.item}>
              <div className={styles.rowIn}>
                <h3 className={styles.questionWrap}>
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className={cx(styles.question, questionClassName)}
                  >
                    <span>{item.question}</span>
                    <svg
                      className={styles.chevron}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </button>
                </h3>
              </div>

              <Collapse open={isOpen} id={panelId} role="region" aria-labelledby={triggerId}>
                <div className={styles.rowOut}>
                  {item.icon ? (
                    <span
                      aria-hidden="true"
                      className={cx(styles.icon, iconPosition === 'right' && styles.iconRight)}
                    >
                      {item.icon}
                    </span>
                  ) : null}
                  <div className={cx(styles.answer, answerClassName)}>{item.answer}</div>
                </div>
              </Collapse>
            </li>
          );
        })}
      </ul>

      {timestamp ? <p className={styles.timestamp}>{timestamp}</p> : null}
    </div>
  );
}
