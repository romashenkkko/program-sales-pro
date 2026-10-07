import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, ExternalLink, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteLayout } from '@/components/site';
import { events, referenceEvent, trainers } from '@/lib/events';

export const Route = createFileRoute('/events/$slug')({
  loader: ({ params }) => {
    const event = events.find(item => item.slug === params.slug);
    if (!event) throw notFound();
    return event;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? 'Event'} — PULS` },
    { name: 'description', content: loaderData ? `${loaderData.dateLabel} in ${loaderData.location}. See distances, organizer details, and coaches.` : 'Endurance event details on PULS.' },
    { property: 'og:title', content: `${loaderData?.name ?? 'Event'} — PULS` },
    { property: 'og:description', content: loaderData ? `${loaderData.type} in ${loaderData.country}. Explore distances and prepare with a coach.` : 'Event details on PULS.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  notFoundComponent: () => <SiteLayout><main className="container-site section-space"><h1 className="font-display text-5xl font-extrabold">Event not found.</h1><Link to="/" className="mt-8 inline-flex items-center gap-2 font-bold text-primary"><ArrowLeft className="size-4" />All events</Link></main></SiteLayout>,
  component: EventPage,
});

function EventPage() {
  const event = Route.useLoaderData();
  const isReference = event.slug === referenceEvent.slug;
  return <SiteLayout><main>
    <section className="container-site pt-8 md:pt-12"><Link to="/" hash="events" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-primary"><ArrowLeft className="size-4" /> All events</Link></section>
    <section className="container-site pb-14 pt-8 md:pb-20"><div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
      <div><div className="flex flex-wrap gap-2"><span className="bg-primary px-3 py-2 text-[11px] font-bold uppercase text-primary-foreground">{event.type}</span><span className="border border-border px-3 py-2 text-[11px] font-bold uppercase">{event.country}</span></div><h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">{event.name}</h1><div className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2"><p className="flex gap-3 text-sm"><CalendarDays className="size-5 shrink-0 text-primary" /><span><strong className="block">{event.dateLabel}</strong>Race day</span></p><p className="flex gap-3 text-sm"><MapPin className="size-5 shrink-0 text-primary" /><span><strong className="block">{event.location}</strong>{event.country}</span></p></div></div>
      <div className="aspect-[4/3] overflow-hidden bg-secondary"><img src={event.image} alt={event.imageAlt} width={1408} height={992} className="h-full w-full object-cover" /></div>
    </div></section>

    <section className="border-y border-border bg-secondary/50 py-16"><div className="container-site grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Choose your distance</p><h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl">One event.<br />Your challenge.</h2></div><div className="grid gap-px bg-border sm:grid-cols-2">{event.distances.map((distance, index) => <div key={distance} className="min-h-36 bg-background p-6"><span className="text-xs font-bold text-primary">0{index + 1}</span><h3 className="mt-6 font-display text-3xl font-extrabold">{distance}</h3><p className="mt-2 text-sm text-muted-foreground">Official race distance</p></div>)}</div></div></section>

    {isReference ? <>
      <section className="container-site section-space"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">The event</p><h2 className="mt-4 font-display text-4xl font-extrabold">Run the heart of Chișinău.</h2><p className="mt-6 leading-relaxed text-muted-foreground">{referenceEvent.summary}</p><Button asChild variant="outline" className="mt-8 rounded-sm"><a href={event.sourceUrl} target="_blank" rel="noreferrer">Official website <ExternalLink /></a></Button></div><div><p className="text-lg leading-relaxed">{referenceEvent.course}</p><div className="mt-8 border-t border-border">{referenceEvent.schedule.map(item => <div key={item.label} className="grid gap-2 border-b border-border py-5 sm:grid-cols-2"><span className="text-sm text-muted-foreground">{item.label}</span><strong>{item.value}</strong></div>)}</div></div></div></section>
      <section className="bg-foreground py-20 text-background"><div className="container-site"><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Previous editions</p><div className="mt-10 grid gap-px bg-background/20 md:grid-cols-3">{referenceEvent.editions.map(edition => <div key={edition.year} className="bg-foreground p-7"><span className="font-display text-5xl font-extrabold text-primary">{edition.year}</span><h3 className="mt-8 font-display text-xl font-bold">{edition.note}</h3><p className="mt-2 text-sm text-background/60">{edition.stat}</p></div>)}</div></div></section>
      <CoachesSection />
    </> : <section className="container-site section-space"><div className="grid gap-8 border-y border-border py-12 md:grid-cols-[1fr_auto] md:items-center"><div><h2 className="font-display text-3xl font-extrabold">Full guide coming soon.</h2><p className="mt-3 max-w-xl text-muted-foreground">We’re confirming past editions and matching coaches for this event. Official event information remains available from the organizer.</p></div><Button asChild variant="outline" className="rounded-sm"><a href={event.sourceUrl} target="_blank" rel="noreferrer">Organizer page <ExternalLink /></a></Button></div></section>}
  </main></SiteLayout>;
}

function CoachesSection() {
  return <section className="container-site section-space"><div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Train for this event</p><h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Coaches who can get you there.</h2></div><span className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="size-5 text-primary" />3 matched coaches</span></div><div className="grid gap-5 md:grid-cols-3">{trainers.map((trainer, index) => <Link key={trainer.slug} to="/trainers/$slug" params={{ slug: trainer.slug }} className="group border border-border bg-background p-5"><div className="aspect-[4/3] overflow-hidden bg-secondary"><img src={trainer.image} alt={trainer.imageAlt} width={1024} height={1408} loading="lazy" className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${index > 0 ? 'object-[center_25%]' : ''}`} /></div><p className="mt-5 text-xs font-bold uppercase text-primary">{trainer.role}</p><h3 className="mt-2 font-display text-2xl font-extrabold">{trainer.name}</h3><p className="mt-2 text-sm text-muted-foreground">{trainer.location}</p><div className="mt-5 flex flex-wrap gap-2">{trainer.tags.slice(0, 2).map(tag => <span key={tag} className="bg-secondary px-2.5 py-1 text-[11px] font-bold">{tag}</span>)}</div><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">View profile <ArrowRight className="size-4" /></span></Link>)}</div><p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Check className="size-4 text-primary" />Coach profiles shown as launch references; verify credentials before booking.</p></section>;
}