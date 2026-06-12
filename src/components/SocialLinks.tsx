import { SOCIALS } from "@/data/site";

const ICONS: Record<(typeof SOCIALS)[number]["key"], React.ReactNode> = {
  facebook: (
    <path d="M14 8h2.5V4.5h-3C10.9 4.5 9.5 6.4 9.5 9v2H7v3.5h2.5v7h3.5v-7h2.6l.6-3.5H13V9c0-.6.4-1 1-1Z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.8" cy="7.2" r="1.3" />
    </>
  ),
  tiktok: (
    <path d="M14.5 4h2.7c.2 1.8 1.3 3.2 3.3 3.5v2.8c-1.3 0-2.4-.4-3.3-1v5.6c0 3.3-2.3 5.6-5.5 5.6A5.3 5.3 0 0 1 6.5 15c0-3.1 2.4-5.3 5.6-5.2v2.9c-1.6-.2-2.8.7-2.8 2.3 0 1.4 1 2.4 2.4 2.4 1.6 0 2.8-1.1 2.8-3V4Z" />
  ),
  x: (
    <path d="M4.5 4.5h4.6l4 5.4 4.6-5.4h2.9l-6.2 7.2 6.6 8.8h-4.6l-4.3-5.9-5 5.9H4.2l6.6-7.7-6.3-8.3Z" />
  )
};

export default function SocialLinks({ title }: { title: string }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold tracking-[0.25em] text-bone-dim uppercase">{title}</p>
      <ul className="flex gap-3">
        {SOCIALS.map(({ key, label, href }) => (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="flex h-10 w-10 items-center justify-center border border-smoke text-bone transition-all hover:-translate-y-0.5 hover:border-blood hover:bg-blood"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                {ICONS[key]}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
