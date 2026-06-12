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
  ),
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3-5.2 3Z" />
  ),
  telegram: (
    <path d="M21.9 4.6 19 19.3c-.2 1-.8 1.25-1.6.78l-4.5-3.3-2.17 2.1c-.24.24-.44.44-.9.44l.32-4.57L18.6 7.3c.36-.32-.08-.5-.56-.18L7.75 13.5l-4.43-1.38c-.96-.3-.98-.96.2-1.42L20.55 3.2c.8-.3 1.5.18 1.35 1.4Z" />
  )
};

export default function SocialLinks({ title }: { title: string }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold tracking-[0.25em] text-bone-dim uppercase">{title}</p>
      <ul className="flex flex-wrap justify-center gap-3 md:justify-start">
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
