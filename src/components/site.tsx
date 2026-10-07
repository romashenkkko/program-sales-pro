import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUpRight, ChevronDown, Instagram, Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

const languages = ['RO', 'RU', 'EN'] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const pathname = useRouterState({ select: state => state.location.pathname });
  const links = [
    { to: '/', label: 'Events' },
    { to: '/catalog', label: 'Coaches' },
    { to: '/blog', label: 'Stories' },
    { to: '/faq', label: 'About' },
  ] as const;

  return <header className="relative z-30 border-b border-border bg-background">
    <div className="container-site flex h-[76px] items-center justify-between gap-5">
      <Link to="/" className="font-display text-[28px] font-extrabold leading-none" aria-label="PULS home">PULS<span className="text-primary">.</span></Link>
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
        {links.map(link => <Link key={link.to} to={link.to} className={`text-sm font-semibold transition-colors hover:text-primary ${pathname === link.to || (link.to === '/' && pathname.startsWith('/events')) ? 'text-primary' : ''}`}>{link.label}</Link>)}
      </nav>
      <div className="hidden items-center gap-5 lg:flex">
        <label className="relative flex items-center gap-1 text-xs font-bold" aria-label="Language">
          <select value={language} onChange={event => setLanguage(event.target.value)} className="cursor-pointer appearance-none bg-transparent pr-4 outline-none" aria-label="Choose language">{languages.map(item => <option key={item}>{item}</option>)}</select>
          <ChevronDown className="pointer-events-none absolute right-0 size-3" />
        </label>
        <Button asChild className="h-11 rounded-sm px-5"><Link to="/" hash="events">Find a race <ArrowUpRight /></Link></Button>
      </div>
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X /> : <Menu />}</Button>
    </div>
    {menuOpen && <nav className="container-site flex flex-col gap-5 border-t border-border py-6 lg:hidden" aria-label="Mobile navigation">
      {links.map(link => <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="font-semibold">{link.label}</Link>)}
      <select value={language} onChange={event => setLanguage(event.target.value)} aria-label="Choose language" className="w-fit bg-transparent text-sm font-bold">{languages.map(item => <option key={item}>{item}</option>)}</select>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="bg-foreground py-14 text-background">
    <div className="container-site grid gap-10 md:grid-cols-[1fr_1fr]">
      <div><Link to="/" className="font-display text-4xl font-extrabold">PULS<span className="text-primary">.</span></Link><p className="mt-5 max-w-xs text-sm opacity-70">Find your next start. Train for it with the right coach.</p><p className="mt-3 text-xs font-bold uppercase opacity-50">Moldova · Romania</p></div>
      <div className="grid grid-cols-2 gap-6 text-sm"><div className="flex flex-col gap-4"><Link to="/">Events</Link><Link to="/catalog">Coaches</Link><Link to="/blog">Stories</Link><Link to="/faq">About</Link></div><div className="flex flex-col gap-4"><Link to="/privacy">Privacy</Link><a href="mailto:hello@puls.fit">hello@puls.fit</a><span className="flex items-center gap-2 opacity-60"><Instagram className="size-4" /> Instagram — soon</span></div></div>
    </div>
    <div className="container-site mt-14 flex justify-between border-t border-background/20 pt-6 text-xs opacity-60"><span>© {new Date().getFullYear()} PULS</span><span>puls.fit</span></div>
  </footer>;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /></>;
}