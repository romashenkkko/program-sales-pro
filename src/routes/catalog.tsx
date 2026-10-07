import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { SiteLayout } from '@/components/site';
import { trainers } from '@/lib/events';

export const Route = createFileRoute('/catalog')({
  head: () => ({ meta: [
    { title: 'Endurance coaches in Moldova & Romania — PULS' },
    { name: 'description', content: 'Meet running, trail and endurance coaches who can prepare you for your next race.' },
    { property: 'og:title', content: 'Endurance coaches — PULS' },
    { property: 'og:description', content: 'Find a coach for running, trail, marathon and endurance events.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Catalog,
});

function Catalog() {
  return <SiteLayout><main>
    <section className="container-site section-space"><p className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-primary">Coaches on PULS</p><div className="grid items-end gap-8 md:grid-cols-2"><h1 className="font-display text-5xl font-extrabold leading-tight md:text-7xl">Train for the<br /><span className="text-primary">start ahead.</span></h1><p className="max-w-md text-lg leading-relaxed text-muted-foreground">Discover specialists by distance and discipline. This first profile shows the format for the growing PULS coach network.</p></div></section>
    <section className="border-t border-border pb-24"><div className="container-site grid gap-6 pt-10 md:grid-cols-2 lg:grid-cols-3">{trainers.map((trainer, index) => <Link key={trainer.slug} to="/trainers/$slug" params={{ slug: trainer.slug }} className="group border-b border-border pb-7"><div className="aspect-[4/5] overflow-hidden bg-secondary"><img src={trainer.image} alt={trainer.imageAlt} width={1024} height={1408} loading={index === 0 ? 'eager' : 'lazy'} className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${index > 0 ? 'object-[center_30%]' : ''}`} /></div><div className="mt-5 flex items-center justify-between"><span className="text-xs font-bold uppercase text-primary">{trainer.role}</span><ArrowUpRight className="size-5" /></div><h2 className="mt-2 font-display text-2xl font-extrabold">{trainer.name}</h2><p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-primary" />{trainer.location}</p><div className="mt-5 flex flex-wrap gap-2">{trainer.tags.slice(0, 3).map(tag => <span key={tag} className="bg-secondary px-2.5 py-1 text-[11px] font-bold">{tag}</span>)}</div></Link>)}</div></section>
  </main></SiteLayout>;
}