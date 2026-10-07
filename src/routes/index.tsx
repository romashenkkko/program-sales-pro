import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SiteLayout } from '@/components/site';
import { events, type SportType } from '@/lib/events';
import hero from '@/assets/events/trail-carpathians.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'PULS — running, trail and triathlon events in Moldova & Romania' },
    { name: 'description', content: 'Discover running, trail-running and triathlon events across Moldova and Romania, then find a coach for your next start.' },
    { property: 'og:title', content: 'PULS — find your next race' },
    { property: 'og:description', content: 'A curated calendar of endurance events and coaches across Moldova and Romania.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: HomePage,
});

type Filter = 'All' | SportType;
const filters: Filter[] = ['All', 'Road running', 'Trail running', 'Triathlon'];

function HomePage() {
  const [filter, setFilter] = useState<Filter>('All');
  const filteredEvents = useMemo(() => filter === 'All' ? events : events.filter(event => event.type === filter), [filter]);
  return <SiteLayout><main>
    <section className="relative isolate min-h-[620px] overflow-hidden bg-foreground text-background sm:min-h-[680px]">
      <img src={hero} width={1536} height={1024} alt="Trail runners crossing a mountain ridge" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground/95 via-foreground/70 to-foreground/10" />
      <div className="container-site flex min-h-[620px] items-end pb-14 pt-24 sm:min-h-[680px] sm:pb-20">
        <div className="max-w-[820px]">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em]"><span className="h-px w-9 bg-primary" /> Moldova · Romania · 2026</p>
          <h1 className="font-display text-[clamp(44px,7vw,92px)] font-extrabold leading-[.98]">Your next start<br /><span className="text-primary">begins here.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-background/80 sm:text-xl">Running, trail and triathlon events—curated in one place, with coaches who can help you arrive ready.</p>
          <Button asChild size="lg" className="mt-8 h-14 rounded-sm px-7"><a href="#events">Explore events <ArrowDown /></a></Button>
        </div>
      </div>
    </section>

    <section id="events" className="scroll-mt-6 section-space">
      <div className="container-site">
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-primary">Race calendar</p><h2 className="font-display text-4xl font-extrabold md:text-6xl">Pick your next line.</h2><p className="mt-5 max-w-xl text-muted-foreground">Verified 2026 events across city streets, mountain trails, and open water.</p></div>
          <div className="flex flex-wrap gap-2" aria-label="Filter events">{filters.map(item => <Button key={item} variant={filter === item ? 'default' : 'outline'} className="rounded-sm" onClick={() => setFilter(item)}>{item}</Button>)}</div>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {filteredEvents.map(event => <Link key={event.slug} to="/events/$slug" params={{ slug: event.slug }} className="group block border-b border-border pb-8">
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary"><img src={event.image} alt={event.imageAlt} width={1408} height={992} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute left-4 top-4 bg-background px-3 py-2 text-[11px] font-bold uppercase tracking-[.12em] text-foreground">{event.type}</span><span className="absolute right-4 top-4 bg-primary px-3 py-2 text-[11px] font-bold uppercase text-primary-foreground">{event.country}</span></div>
            <div className="mt-5 flex items-center justify-between gap-4 text-xs font-bold uppercase text-primary"><span className="flex items-center gap-2"><CalendarDays className="size-4" />{event.dateLabel}</span><ArrowUpRight className="size-5 text-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
            <h3 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">{event.name}</h3>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-primary" />{event.location}</p>
            <div className="mt-5 flex flex-wrap gap-2">{event.distances.map(distance => <span key={distance} className="border border-border bg-secondary/40 px-3 py-1.5 text-xs font-bold">{distance}</span>)}</div>
            <p className="mt-5 text-xs text-muted-foreground">Organized by <span className="font-bold text-foreground">{event.organizer}</span></p>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="border-y border-border bg-secondary/55 py-20"><div className="container-site grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-primary">Train with purpose</p><h2 className="max-w-2xl font-display text-4xl font-extrabold md:text-5xl">A date on the calendar changes everything.</h2><p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Choose an event, meet coaches for your discipline, and build a plan around the distance ahead.</p></div><Button asChild variant="outline" size="lg" className="rounded-sm"><Link to="/catalog">Meet the coaches <ArrowRight /></Link></Button></div></section>
  </main></SiteLayout>;
}