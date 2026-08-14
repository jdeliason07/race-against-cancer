import { CONTACT_EMAIL } from '@/config/site';
import { EmailComposer } from '../EmailComposer';

// Auth, the shell, and the tab nav all live in ../layout.tsx.
export default function AdminEmailPage() {
  return <EmailComposer defaultEmail={CONTACT_EMAIL} />;
}
