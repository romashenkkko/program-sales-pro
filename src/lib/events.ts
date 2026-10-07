import chisinauRun from '@/assets/events/chisinau-run.jpg';
import trailCarpathians from '@/assets/events/trail-carpathians.jpg';
import triathlonLake from '@/assets/events/triathlon-lake.jpg';
import coachPortrait from '@/assets/trainers/andrei-popescu.jpg';

export type SportType = 'Road running' | 'Trail running' | 'Triathlon';

export type EventRecord = {
  slug: string;
  name: string;
  shortName: string;
  date: string;
  dateLabel: string;
  location: string;
  country: 'Moldova' | 'Romania';
  organizer: string;
  type: SportType;
  distances: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
  sourceUrl: string;
};

export const events: EventRecord[] = [
  {
    slug: 'chisinau-marathon-2026',
    name: 'maib | Mastercard Chișinău Marathon',
    shortName: 'Chișinău Marathon',
    date: '2026-09-13',
    dateLabel: '13 Sep 2026',
    location: 'Great National Assembly Square, Chișinău',
    country: 'Moldova',
    organizer: 'Sporter',
    type: 'Road running',
    distances: ['5 km', '10.5 km', '21.1 km', '42.2 km'],
    image: chisinauRun,
    imageAlt: 'Road runners racing through central Chișinău',
    featured: true,
    sourceUrl: 'https://marathon.md/en',
  },
  {
    slug: 'transylvania-100-2026',
    name: 'Transylvania 100',
    shortName: 'Transylvania 100',
    date: '2026-05-23',
    dateLabel: '23 May 2026',
    location: 'Bran, Brașov County',
    country: 'Romania',
    organizer: 'Transylvania 100',
    type: 'Trail running',
    distances: ['20 km', '30 km', '50 km', '80 km', '100 km'],
    image: trailCarpathians,
    imageAlt: 'Trail runners in the Romanian Carpathians',
    sourceUrl: 'https://www.transylvania100k.com/',
  },
  {
    slug: 'mamaia-triathlon-2026',
    name: 'World Triathlon Regional Cup Mamaia',
    shortName: 'Mamaia Triathlon',
    date: '2026-05-30',
    dateLabel: '30 May 2026',
    location: 'Mamaia, Constanța',
    country: 'Romania',
    organizer: 'World Triathlon',
    type: 'Triathlon',
    distances: ['750 m swim', '20 km bike', '5 km run'],
    image: triathlonLake,
    imageAlt: 'Triathlete leaving the water at an open-water event',
    sourceUrl: 'https://triathlon.org/events/2026-world-triathlon-development-regional-cup-mamaia',
  },
  {
    slug: 'volvo-ultra-race-2026',
    name: 'Volvo Ultra Race',
    shortName: 'Volvo Ultra Race',
    date: '2026-05-02',
    dateLabel: '02 May 2026',
    location: 'Poiana Winery, Codrii Reserve',
    country: 'Moldova',
    organizer: 'Run Moldova',
    type: 'Trail running',
    distances: ['11 km', '25 km', '56 km'],
    image: trailCarpathians,
    imageAlt: 'Runners climbing a green mountain trail',
    sourceUrl: 'https://www.runmoldova.com/en/volvo-ultra-race-2026/',
  },
  {
    slug: 'dragonul-de-aur-2026',
    name: 'Dragonul de Aur',
    shortName: 'Dragonul de Aur',
    date: '2026-08-29',
    dateLabel: '29 Aug 2026',
    location: 'Orheiul Vechi, Butuceni',
    country: 'Moldova',
    organizer: 'Run Moldova',
    type: 'Trail running',
    distances: ['14 km', '23 km', '44.5 km'],
    image: trailCarpathians,
    imageAlt: 'Endurance runners on a scenic ridge trail',
    sourceUrl: 'https://www.runmoldova.com/en/dragonul-de-aur-2026/',
  },
  {
    slug: 'crosul-arenelor-2026',
    name: 'Crosul Arenelor',
    shortName: 'Crosul Arenelor',
    date: '2026-09-27',
    dateLabel: '27 Sep 2026',
    location: 'Bucharest',
    country: 'Romania',
    organizer: 'Crosul Arenelor',
    type: 'Road running',
    distances: ['2 km', '10 km'],
    image: chisinauRun,
    imageAlt: 'City runners competing on a broad autumn boulevard',
    sourceUrl: 'https://crosularenelor.ro/en/',
  },
];

export const referenceEvent = {
  ...events[0],
  summary: 'Moldova’s largest road race brings runners together in the heart of Chișinău. Choose a first 5K, a fast half marathon, or the full city marathon.',
  schedule: [
    { label: 'Race village', value: '12–13 September' },
    { label: 'Main race day', value: 'Sunday, 13 September' },
    { label: 'Start & finish', value: 'Great National Assembly Square' },
  ],
  course: 'A central city course with broad boulevards, enthusiastic support, and certified marathon and half-marathon distances.',
  editions: [
    { year: '2025', note: '11th edition', stat: 'Four race distances' },
    { year: '2024', note: '10th anniversary edition', stat: 'International field' },
    { year: '2023', note: 'City-centre return', stat: 'Community race weekend' },
  ],
};

export type TrainerRecord = {
  slug: string;
  name: string;
  location: string;
  role: string;
  tags: string[];
  languages: string[];
  experience: string;
  bio: string;
  approach: string;
  image: string;
  imageAlt: string;
  social: { label: string; href: string }[];
};

export const trainers: TrainerRecord[] = [
  {
    slug: 'andrei-popescu',
    name: 'Andrei Popescu',
    location: 'Bucharest, Romania',
    role: 'Endurance running coach',
    tags: ['Marathon', 'Long-distance running', 'Endurance', 'Trail running', 'Race strategy'],
    languages: ['Romanian', 'English'],
    experience: '9 years coaching',
    bio: 'Andrei helps recreational runners build the consistency and confidence needed for their first long race or a stronger marathon finish.',
    approach: 'Simple weekly structure, realistic progression, and regular feedback. Every plan adapts to work, recovery, and the athlete’s actual training history.',
    image: coachPortrait,
    imageAlt: 'Reference endurance coach Andrei Popescu on a running track',
    social: [
      { label: 'Instagram', href: 'https://instagram.com/' },
      { label: 'Strava', href: 'https://www.strava.com/' },
    ],
  },
  {
    slug: 'maria-rusu',
    name: 'Maria Rusu',
    location: 'Chișinău, Moldova',
    role: 'Road running coach',
    tags: ['First 10K', 'Half marathon', 'Running form'],
    languages: ['Romanian', 'Russian', 'English'],
    experience: '6 years coaching',
    bio: 'Maria works with first-time road runners and returning athletes.',
    approach: 'Approachable plans built around gradual volume and sound technique.',
    image: coachPortrait,
    imageAlt: 'Reference road running coach',
    social: [],
  },
  {
    slug: 'ioana-stancu',
    name: 'Ioana Stancu',
    location: 'Brașov, Romania',
    role: 'Trail & ultra coach',
    tags: ['Trail running', 'Ultra', 'Elevation'],
    languages: ['Romanian', 'English'],
    experience: '8 years coaching',
    bio: 'Ioana coaches trail runners for mountain endurance and technical terrain.',
    approach: 'Strength, time on feet, and practical course preparation.',
    image: coachPortrait,
    imageAlt: 'Reference trail running coach',
    social: [],
  },
];