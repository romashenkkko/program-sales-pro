import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Clock3, Globe2, Instagram, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteLayout } from '@/components/site';
import { trainers } from '@/lib/events';

export const Route = createFileRoute('/trainers/$slug')({
  loader: ({ params }) => {
    const trainer = trainers.find(item => item.slug === params.slug);
    if (!trainer) throw notFound();
    return trainer;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? 'Coach'} — PULS` },
    { name: 'description', content: loaderData?.bio ?? 'Endurance coach profile on PULS.' },
    { property: 'og:title', content: `${loaderData?.name ?? 'Coach'} — PULS` },
    { property: 'og:description', content: loaderData?.bio ?? 'Endurance coach profile on PULS.' },
    { property: 'og:type', content: 'profile' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  notFoundComponent: () => <SiteLayout><main className="container-site section-space"><h1 className="font-display text-5xl font-extrabold">Coach not found.</h1><Link to="/catalog" className="mt-8 inline-flex items-center gap-2 font-bold text-primary"><ArrowLeft className="size-4" />All coaches</Link></main></SiteLayout>,
  component: TrainerPage,
});

function TrainerPage() {
  const trainer = Route.useLoaderData();
  return <SiteLayout><main>
    <section className="container-site pt-8"><Link to="/catalog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-primary"><ArrowLeft className="size-4" /> All coaches</Link></section>
    <section className="container-site pb-16 pt-8 md:pb-24"><div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end"><div className="aspect-[4/5] overflow-hidden bg-secondary"><img src={trainer.image} alt={trainer.imageAlt} width={1024} height={1408} className="h-full w-full object-cover" /></div><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Reference coach profile</p><h1 className="mt-5 font-display text-5xl font-extrabold md:text-7xl">{trainer.name}</h1><p className="mt-4 text-xl font-semibold">{trainer.role}</p><div className="mt-7 flex flex-wrap gap-2">{trainer.tags.map(tag => <span key={tag} className="border border-border bg-secondary/50 px-3 py-2 text-xs font-bold">{tag}</span>)}</div><div className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-3"><span className="flex items-center gap-2 text-sm"><MapPin className="size-4 text-primary" />{trainer.location}</span><span className="flex items-center gap-2 text-sm"><Clock3 className="size-4 text-primary" />{trainer.experience}</span><span className="flex items-center gap-2 text-sm"><Globe2 className="size-4 text-primary" />{trainer.languages.join(', ')}</span></div><p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{trainer.bio}</p><Button className="mt-8 h-12 rounded-sm px-6">Ask about coaching <ArrowRight /></Button></div></div></section>

    <section className="border-y border-border bg-secondary/45 py-20"><div className="container-site grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Coaching style</p><h2 className="mt-4 font-display text-4xl font-extrabold">Structured, honest, sustainable.</h2></div><div><p className="text-xl leading-relaxed">{trainer.approach}</p><div className="mt-10 grid gap-4 sm:grid-cols-3">{['Plan built around your race', 'Weekly progress review', 'Pacing and race-day strategy'].map(item => <div key={item} className="border-t-2 border-primary pt-4 text-sm font-bold">{item}</div>)}</div></div></div></section>

    <section className="container-site section-space"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">In training</p><h2 className="mt-4 font-display text-4xl font-extrabold">Work behind the start line.</h2></div><div className="grid grid-cols-2 gap-4 md:grid-cols-[1.2fr_.8fr_.8fr]"><div className="col-span-2 aspect-[16/10] overflow-hidden bg-secondary md:col-span-1"><img src={trainer.image} alt={`${trainer.name} coaching portrait`} width={1024} height={1408} loading="lazy" className="h-full w-full object-cover object-top" /></div><div className="aspect-square overflow-hidden bg-secondary"><img src={trainer.image} alt={`${trainer.name} at the track`} width={1024} height={1408} loading="lazy" className="h-full w-full scale-125 object-cover object-[center_78%]" /></div><div className="aspect-square overflow-hidden bg-secondary"><img src={trainer.image} alt={`${trainer.name} during an outdoor session`} width={1024} height={1408} loading="lazy" className="h-full w-full scale-150 object-cover object-[center_20%]" /></div></div></section>

    <section className="bg-foreground py-16 text-background"><div className="container-site flex flex-wrap items-center justify-between gap-8"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Follow the work</p><h2 className="mt-3 font-display text-3xl font-extrabold">Connect with {trainer.name.split(' ')[0]}.</h2></div><div className="flex flex-wrap gap-3">{trainer.social.map(item => <Button asChild key={item.label} variant="outline" className="rounded-sm border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"><a href={item.href} target="_blank" rel="noreferrer">{item.label === 'Instagram' && <Instagram />} {item.label}</a></Button>)}</div></div></section>
  </main></SiteLayout>;
}