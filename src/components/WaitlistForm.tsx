import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/.netlify/functions/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2" noValidate>
        <label htmlFor="waitlist-email" className="sr-only">
          Correo electrónico
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          minLength={3}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'success'}
          placeholder="tu@correo.com"
          className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent/60 focus:outline-none disabled:opacity-60"
        />
        <button type="submit" disabled={status === 'sending' || status === 'success'} className="btn-accent !px-4">
          {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {status === 'sending' ? 'Enviando…' : 'Apuntarme'}
        </button>
      </form>
      {status === 'success' && (
        <p role="status" className="mt-2 text-sm text-emerald-400">
          ¡Listo! Te avisaremos cuando lancemos.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-2 text-sm text-red-400">
          No se pudo enviar. Inténtalo de nuevo.
        </p>
      )}
    </div>
  );
}