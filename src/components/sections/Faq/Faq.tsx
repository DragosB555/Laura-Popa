import { ChevronLeft, Gift, Mic, Paperclip, Sticker, User } from 'lucide-react';
import { BackdropHeading, FaqAccordion, PhoneFrame, Reveal, Section } from '@/components/ui';
import { anchors, faq } from '@/content/site';
import styles from './Faq.module.css';

/** Antetul conversatiei, in stilul unei aplicatii de mesagerie. Pur decorativ. */
function ChatHeader() {
  return (
    <div className={styles.chatHead}>
      <span aria-hidden="true" className={styles.chatBack}>
        <ChevronLeft />
      </span>

      <span className={styles.chatIdentity}>
        <span aria-hidden="true" className={styles.chatAvatar}>
          <User />
        </span>

        <span className={styles.chatLines}>
          <span className={styles.chatName}>{faq.chatName}</span>
          <span className={styles.chatStatus}>{faq.chatStatus}</span>
        </span>
      </span>
    </div>
  );
}

/** Bara de scris din josul conversatiei. Decorativa — nu e un formular real. */
function ChatComposer() {
  return (
    <div aria-hidden="true" className={styles.composer}>
      <span className={styles.composerRound}>
        <Paperclip />
      </span>

      <span className={styles.composerField}>
        <span className={styles.composerText}>{faq.chatPlaceholder}</span>
        <span className={styles.composerTools}>
          <Gift />
          <Sticker />
        </span>
      </span>

      <span className={styles.composerRound}>
        <Mic />
      </span>
    </div>
  );
}

/** 07 — Întrebările frecvente, ca un fir de conversație pe telefon. */
export function Faq() {
  return (
    <Section id={anchors.faq} containerSize="lg" className={styles.section}>
      <BackdropHeading backdrop={faq.backdrop}>{faq.title}</BackdropHeading>

      <div className={styles.stage}>
        <Reveal className={`${styles.veilBox} u-squircle`} />

        <Reveal className={styles.phoneCol}>
          <PhoneFrame header={<ChatHeader />} footer={<ChatComposer />}>
            <FaqAccordion
              data={faq.items.map((item, index) => ({
                id: index,
                question: item.question,
                answer: item.answer,
              }))}
            />
          </PhoneFrame>
        </Reveal>
      </div>
    </Section>
  );
}
