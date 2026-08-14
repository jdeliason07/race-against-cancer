'use client';
import { useEffect, useState } from 'react';
import {
  fetchGroups,
  sendCampaignToGroup,
  sendTestEmail,
  signOut,
  syncAudienceToGroup,
  type ActionResult,
  type Audience,
} from './actions';
import { REGISTRATION_OPEN } from '@/config/site';
import type { SenderGroup } from '@/lib/senderNet';

const CONFIRM_WORD = 'SEND';

const inputClass =
  'w-full rounded-card border border-line bg-paper px-4 py-3 font-body text-sm text-ink focus:border-pink focus:outline-none';
const labelClass = 'mb-1 block font-body text-xs font-bold uppercase tracking-widest text-ash';

function Notice({ result }: { result: ActionResult | null }) {
  if (!result) return null;
  const isError = 'error' in result;
  return (
    <p
      role="status"
      className={`mt-3 rounded-card border px-4 py-3 font-body text-sm ${
        isError
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-green-200 bg-green-50 text-green-800'
      }`}
    >
      {isError ? result.error : result.message}
    </p>
  );
}

export function EmailComposer({ defaultEmail }: { defaultEmail: string }) {
  const [groups, setGroups] = useState<SenderGroup[]>([]);
  const [groupsError, setGroupsError] = useState('');
  const [groupId, setGroupId] = useState('');

  const [subject, setSubject] = useState('');
  const [preheader, setPreheader] = useState('');
  const [body, setBody] = useState('');

  const [testEmail, setTestEmail] = useState(defaultEmail);
  const [confirmText, setConfirmText] = useState('');

  const [busy, setBusy] = useState<'' | 'sync-waitlist' | 'sync-registered' | 'test' | 'send'>('');
  const [syncResult, setSyncResult] = useState<ActionResult | null>(null);
  const [testResult, setTestResult] = useState<ActionResult | null>(null);
  const [sendResult, setSendResult] = useState<ActionResult | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetchGroups().then((result) => {
      if ('error' in result) setGroupsError(result.error);
      else {
        setGroups(result.groups);
        if (result.groups.length === 1) setGroupId(result.groups[0].id);
      }
    });
  }, []);

  const selectedGroup = groups.find((g) => g.id === groupId);
  const canSend =
    !!groupId && !!subject.trim() && !!body.trim() && confirmText.trim() === CONFIRM_WORD && !sent;

  async function run(kind: 'sync-waitlist' | 'sync-registered' | 'test' | 'send') {
    setBusy(kind);
    try {
      if (kind === 'sync-waitlist' || kind === 'sync-registered') {
        const audience: Audience = kind === 'sync-registered' ? 'registered' : 'waitlist';
        setSyncResult(await syncAudienceToGroup(audience, groupId));
      }
      if (kind === 'test') setTestResult(await sendTestEmail({ toEmail: testEmail, subject, body }));
      if (kind === 'send') {
        const result = await sendCampaignToGroup({ groupId, subject, body, preheader });
        setSendResult(result);
        if ('ok' in result) {
          setSent(true);
          setConfirmText('');
        }
      }
    } finally {
      setBusy('');
    }
  }

  return (
    <div className="space-y-10">
      {/* Audience */}
      <section>
        <h2 className="mb-4 font-display text-2xl uppercase text-ink">1. Pick the audience</h2>
        {groupsError ? (
          <p className="rounded-card border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
            {groupsError}
          </p>
        ) : (
          <>
            <label htmlFor="group" className={labelClass}>
              Sender group
            </label>
            <select
              id="group"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className={inputClass}
            >
              <option value="">
                {groups.length ? 'Choose a group…' : 'Loading groups…'}
              </option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.title} ({group.recipientCount} subscribers)
                </option>
              ))}
            </select>

            <div className="mt-4 rounded-card border border-line bg-mist p-4">
              <p className="font-body text-sm text-ash">
                People live in Stripe. Copy them into the selected group before your first send —
                Sender handles unsubscribes, so it has to be the list you send from. Re-running is
                safe; nobody is duplicated.
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => run('sync-waitlist')}
                  disabled={!groupId || busy !== ''}
                  className="btn-ghost disabled:opacity-40"
                >
                  {busy === 'sync-waitlist' ? 'Syncing…' : 'Sync waitlist'}
                </button>
                <button
                  type="button"
                  onClick={() => run('sync-registered')}
                  disabled={!groupId || busy !== ''}
                  className="btn-ghost disabled:opacity-40"
                >
                  {busy === 'sync-registered' ? 'Syncing…' : 'Sync registrations'}
                </button>
              </div>
              <p className="mt-2 font-body text-xs text-ash">
                {REGISTRATION_OPEN
                  ? 'Pick the group that matches — waitlist people and registrants are different lists.'
                  : 'Registrations will be empty until registration opens. Sync them into your Registered group then.'}
              </p>
              <Notice result={syncResult} />
            </div>
          </>
        )}
      </section>

      {/* Compose */}
      <section>
        <h2 className="mb-4 font-display text-2xl uppercase text-ink">2. Write the email</h2>

        <div className="mb-4">
          <label htmlFor="subject" className={labelClass}>Subject</label>
          <input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
            placeholder="Registration is open!"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="preheader" className={labelClass}>
            Preview text <span className="font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="preheader"
            value={preheader}
            onChange={(e) => setPreheader(e.target.value)}
            className={inputClass}
            placeholder="The line shown after the subject in an inbox"
          />
        </div>

        <div>
          <label htmlFor="body" className={labelClass}>Message</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={14}
            className={inputClass + ' font-body leading-relaxed'}
            placeholder={'Write in plain text.\n\nLeave a blank line between paragraphs.'}
          />
          <p className="mt-1 font-body text-xs text-ash">
            Plain text — blank lines become paragraphs. No HTML needed.
          </p>
        </div>
      </section>

      {/* Test */}
      <section>
        <h2 className="mb-4 font-display text-2xl uppercase text-ink">3. Send yourself a test</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            aria-label="Test recipient"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
          <button
            type="button"
            onClick={() => run('test')}
            disabled={busy !== '' || !subject.trim() || !body.trim()}
            className="btn-ghost shrink-0 disabled:opacity-40"
          >
            {busy === 'test' ? 'Sending…' : 'Send test'}
          </button>
        </div>
        <Notice result={testResult} />
      </section>

      {/* Send */}
      <section>
        <h2 className="mb-4 font-display text-2xl uppercase text-ink">4. Send for real</h2>
        <div className="rounded-card border-2 border-pink bg-blush p-5">
          <p className="font-body text-sm text-ink">
            {selectedGroup ? (
              <>
                This sends to <span className="font-bold">{selectedGroup.recipientCount}</span>{' '}
                subscribers in <span className="font-bold">{selectedGroup.title}</span>.
              </>
            ) : (
              'Choose a group above first.'
            )}{' '}
            There is no undo.
          </p>

          <label htmlFor="confirm" className={labelClass + ' mt-4'}>
            Type {CONFIRM_WORD} to confirm
          </label>
          <input
            id="confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className={inputClass + ' bg-white'}
            autoComplete="off"
            placeholder={CONFIRM_WORD}
          />

          <button
            type="button"
            onClick={() => run('send')}
            disabled={!canSend || busy !== ''}
            className="btn-primary mt-4 w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy === 'send'
              ? 'Sending…'
              : sent
                ? 'Sent'
                : `Send to ${selectedGroup?.recipientCount ?? 0} subscribers`}
          </button>
          <Notice result={sendResult} />
        </div>
      </section>

      <form action={signOut}>
        <button type="submit" className="font-body text-sm text-ash underline underline-offset-2">
          Sign out
        </button>
      </form>
    </div>
  );
}
