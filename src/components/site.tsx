import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowRight, ChevronDown, Instagram, Menu, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type Audience = 'trainer' | 'client';
type SiteContext = { audience: Audience; setAudience: (value: Audience) => void; language: string; setLanguage: (value: string) => void };
let listeners = new Set<() => void>();
let state: SiteContext = { audience: 'trainer', setAudience: (value) => { state = { ...state, audience: value }; listeners.forEach(fn => fn()); }, language: 'RU', setLanguage: (value) => { state = { ...state, language: value }; listeners.forEach(fn => fn()); } };
export function useSite() {
  const [, setTick] = useState(0);
  useEffect(() => { const fn = () => setTick(v => v + 1); listeners.add(fn); return () => { listeners.delete(fn); }; }, []);
  return state;
}
export const translations: Record<string, { trainers: string; clients: string; catalog: string; blog: string; join: string }> = {
  RU: { trainers: 'Для тренеров', clients: 'Для спортсменов', catalog: 'Каталог', blog: 'Блог', join: 'Ранний доступ' },
  RO: { trainers: 'Pentru antrenori', clients: 'Pentru sportivi', catalog: 'Catalog', blog: 'Blog', join: 'Acces timpuriu' },
  EN: { trainers: 'For trainers', clients: 'For athletes', catalog: 'Explore', blog: 'Journal', join: 'Early access' },
  IT: { trainers: 'Per allenatori', clients: 'Per atleti', catalog: 'Catalogo', blog: 'Blog', join: 'Accesso anticipato' },
  ESP: { trainers: 'Para entrenadores', clients: 'Para deportistas', catalog: 'Catálogo', blog: 'Blog', join: 'Acceso anticipado' },
};
export function SiteHeader() {
  const { audience, setAudience, language, setLanguage } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });
  const t = translations[language] ?? translations["RU"] ?? { trainers: "Для тренеров", clients: "Для спортсменов", catalog: "Каталог", blog: "Блог", join: "Ранний доступ" };
  return <header className="relative z-30 border-b border-border bg-background">
    <div className="container-site flex h-20 items-center justify-between gap-4">
      <Link to="/" className="font-display text-[29px] font-extrabold leading-none tracking-normal" aria-label="Forma — на главную">forma<span className="text-primary">.</span></Link>
      <nav className="hidden items-center gap-9 lg:flex" aria-label="Основная навигация">
        <Link to="/" onClick={() => setAudience('trainer')} className={`text-sm font-semibold transition-colors hover:text-primary ${pathname === '/' && audience === 'trainer' ? 'text-primary' : ''}`}>{t.trainers}</Link>
        <Link to="/" onClick={() => setAudience('client')} className={`text-sm font-semibold transition-colors hover:text-primary ${pathname === '/' && audience === 'client' ? 'text-primary' : ''}`}>{t.clients}</Link>
        <Link to="/catalog" className="text-sm font-semibold transition-colors hover:text-primary">{t.catalog}</Link>
        <Link to="/blog" className="text-sm font-semibold transition-colors hover:text-primary">{t.blog}</Link>
      </nav>
      <div className="hidden items-center gap-5 lg:flex">
        <label className="relative flex items-center gap-1 text-xs font-bold" aria-label="Язык"><select value={language} onChange={e => setLanguage(e.target.value)} className="cursor-pointer appearance-none bg-transparent pr-4 outline-none" aria-label="Выбрать язык">{['RO','RU','EN','IT','ESP'].map(l => <option key={l}>{l}</option>)}</select><ChevronDown className="pointer-events-none absolute right-0 size-3" /></label>
        <Button asChild size="lg" className="h-11 rounded-sm px-5 font-semibold"><Link to="/" hash="join">{t.join} <ArrowRight /></Link></Button>
      </div>
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </div>
    {menuOpen && <nav className="container-site flex flex-col gap-5 border-t border-border py-6 lg:hidden" aria-label="Мобильная навигация">
      <Link to="/" onClick={() => {setAudience('trainer'); setMenuOpen(false);}}>{t.trainers}</Link><Link to="/" onClick={() => {setAudience('client'); setMenuOpen(false);}}>{t.clients}</Link><Link to="/catalog" onClick={() => setMenuOpen(false)}>{t.catalog}</Link><Link to="/blog" onClick={() => setMenuOpen(false)}>{t.blog}</Link>
      <select value={language} onChange={e => setLanguage(e.target.value)} aria-label="Выбрать язык" className="w-fit bg-transparent">{['RO','RU','EN','IT','ESP'].map(l => <option key={l}>{l}</option>)}</select>
      <Button asChild><Link to="/" hash="join" onClick={() => setMenuOpen(false)}>{t.join}</Link></Button>
    </nav>}
  </header>;
}
export function SiteFooter() { return <footer className="bg-foreground py-14 text-background"><div className="container-site grid gap-10 md:grid-cols-[1fr_1fr]"><div><Link to="/" className="font-display text-4xl font-extrabold">forma<span className="text-primary">.</span></Link><p className="mt-5 max-w-xs text-sm opacity-70">Тренировки не знают границ. И ваш следующий шаг — тоже.</p></div><div className="grid grid-cols-2 gap-6 text-sm"><div className="flex flex-col gap-4"><Link to="/catalog">Каталог</Link><Link to="/blog">Блог</Link><Link to="/" hash="join">Ранний доступ</Link></div><div className="flex flex-col gap-4"><Link to="/privacy">Конфиденциальность</Link><a href="mailto:hello@forma.fit">Контакты</a><span className="flex items-center gap-2 opacity-60"><Instagram className="size-4" /> Instagram — скоро</span></div></div></div><div className="container-site mt-14 flex justify-between border-t border-background/20 pt-6 text-xs opacity-60"><span>© {new Date().getFullYear()} forma.</span><span>Move your way.</span></div></footer>; }
export function SiteLayout({ children }: { children: ReactNode }) { return <><SiteHeader />{children}<SiteFooter /></>; }
