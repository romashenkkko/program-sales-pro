import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, CircleHelp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SiteLayout } from '@/components/site';

const questions = [
  {
    question: 'Что представляет собой платформа GetMove?',
    answer: 'GetMove — это маркетплейс для программ тренировок и спортивного контента. Атлеты смогут находить подходящие планы и специалистов под свою цель, а тренеры — собирать, продавать и развивать свои программы в одном удобном пространстве.',
  },
  {
    question: 'Почему платформа бесплатна для атлетов?',
    answer: 'Мы хотим поддерживать спорт как часть живой и доступной повседневной жизни. Чем больше людей смогут без лишних барьеров найти понятную программу и начать двигаться, тем сильнее становится спортивное сообщество. Для нас важно, чтобы первый шаг к тренировкам был не про бюджет, а про интерес, поддержку и желание заботиться о себе.',
  },
  {
    question: 'Что получает тренер на GetMove?',
    answer: 'Тренер получает инструмент для продажи программ, хранения материалов и общения с аудиторией. Вместо разрозненных ссылок, папок и ручных переводов можно будет собрать понятный продукт, поделиться одной ссылкой и получать обратную связь от людей, которые им пользуются.',
  },
  {
    question: 'Почему с тренеров взимается небольшая комиссия?',
    answer: 'Комиссия планируется только с успешных продаж. Она помогает поддерживать платформу, платежную инфраструктуру, хранение контента и развитие инструментов для тренеров. При этом тренер сохраняет возможность зарабатывать на своём опыте, а GetMove растёт вместе с его результатами.',
  },
  {
    question: 'Как GetMove помогает с международными продажами?',
    answer: 'Платформа создаётся для людей из разных стран. Мы работаем над тем, чтобы тренеру не приходилось вручную объяснять способы оплаты, отправлять несколько реквизитов и искать отдельный сервис для каждого клиента. Доступные страны, валюты и способы выплат будут опубликованы до запуска продаж.',
  },
  {
    question: 'Где будут храниться программы и спортивные материалы?',
    answer: 'Тренировочные планы, видео и дополнительные материалы должны быть собраны в одном защищённом пространстве. Это удобнее для тренера и понятнее для атлета: нужный контент не теряется среди переписок, случайных ссылок и папок.',
  },
  {
    question: 'Можно ли будет получить обратную связь от пользователей?',
    answer: 'Да, обратная связь — одна из важных частей продукта. Она поможет тренерам видеть, что понятно клиентам, где возникают сложности и какие материалы действительно помогают двигаться вперёд.',
  },
  {
    question: 'Для каких целей подойдут программы на платформе?',
    answer: 'На GetMove смогут появляться программы для разных уровней и целей: первые тренировки, сила, выносливость, мобильность, возвращение к движению и спортивная подготовка. Выбор программы всегда стоит соотносить со своим состоянием и при необходимости обсуждать нагрузку со специалистом.',
  },
  {
    question: 'Когда откроется каталог программ?',
    answer: 'Сейчас мы собираем ранний интерес от тренеров и атлетов. Оставьте контакт на главной странице, чтобы узнать о запуске каталога и первых доступных программах.',
  },
  {
    question: 'Можно ли удалить свои данные?',
    answer: 'Да. Вы сможете запросить доступ к своим данным, их исправление или удаление. Подробная информация находится на странице политики конфиденциальности.',
  },
];

export const Route = createFileRoute('/faq')({
  head: () => ({
    meta: [
      { title: 'Информационный центр GetMove — вопросы о тренировках и платформе' },
      { name: 'description', content: 'Ответы о маркетплейсе GetMove: программы тренировок для атлетов, инструменты для тренеров, продажи спортивного контента и ранний доступ.' },
      { property: 'og:title', content: 'Информационный центр GetMove' },
      { property: 'og:description', content: 'Разбираемся, как работает платформа для атлетов и тренеров.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: InformativeCenter,
});

function InformativeCenter() {
  return <SiteLayout>
    <main>
      <section className="border-b border-border bg-secondary/50">
        <div className="container-site section-space">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-primary">ИНФОРМАЦИОННЫЙ ЦЕНТР</p>
          <div className="grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-end">
            <h1 className="font-display text-5xl font-extrabold leading-tight md:text-7xl">Всё важное<br /><span className="text-primary">о GetMove.</span></h1>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">Здесь мы отвечаем на вопросы о платформе, программах тренировок, работе тренеров и том, как спорт может стать доступнее для большего количества людей.</p>
          </div>
        </div>
      </section>
      <section className="container-site section-space">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <CircleHelp className="size-9 text-primary" />
            <h2 className="mt-6 font-display text-3xl font-extrabold md:text-4xl">Ответы без сложных слов.</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">GetMove строится вокруг двух людей: атлета, который хочет двигаться к своей цели, и тренера, который хочет делиться опытом.</p>
            <Link to="/" hash="join" className="mt-7 inline-flex items-center gap-2 font-bold text-primary">Получить ранний доступ <ArrowRight className="size-4" /></Link>
          </div>
          <Accordion type="single" collapsible className="border-t border-border">
            {questions.map((item, index) => <AccordionItem key={item.question} value={`question-${index}`} className="border-b border-border">
              <AccordionTrigger className="py-6 text-left font-display text-base font-bold hover:no-underline sm:text-lg">{item.question}</AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>)}
          </Accordion>
        </div>
      </section>
    </main>
  </SiteLayout>;
}
