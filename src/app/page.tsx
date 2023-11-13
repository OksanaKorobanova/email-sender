import styles from './page.module.css';
import { compileTemplate, sendMail } from '@/lib/mail';

const send = async () => {
  'use server';
  await sendMail({
    to: process.env.SMTP_EMAIL_TO as string, // just take it from the real form
    subject: 'Test email sending',
    body: compileTemplate('Hanna'),
  });
};

export default function Home() {
  return (
    <main className={styles.main}>
      <form>
        <button formAction={send}>Send email</button>
      </form>
    </main>
  );
}
