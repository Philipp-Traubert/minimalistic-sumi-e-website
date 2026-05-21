import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Layout } from './Layout';
import { TopNav } from './TopNav';
import { GlassPanel } from './GlassPanel';
import { InkSplashHeading } from './InkSplashHeading';
import { SereneReveal } from './SereneReveal';
import { GradientButton } from './GradientButton';
import { SumiEImage } from './SumiEImage';
import { FallingBlossoms } from './FallingBlossoms';
import { Footer } from './Footer';
import { BabyNotice } from './BabyNotice';
import { trackExternalLink } from '../utils/matomo';
import sumiBranch from '../assets/branch-transparent.webp';
import paperTexture from '../assets/b67594e9b3c439245fdadadaacf25076d0420eda Large.jpeg';

const InlineReviewsCarousel = lazy(async () => {
  const module = await import('./reviews/InlineReviewsCarousel');
  return { default: module.InlineReviewsCarousel };
});

export function FreeSessionPage() {
  const introShellRef = useRef<HTMLElement | null>(null);
  const [petalOffsetY, setPetalOffsetY] = useState(0);

  useEffect(() => {
    const updatePetalOffset = () => {
      const rect = introShellRef.current?.getBoundingClientRect();
      if (!rect) {
        setPetalOffsetY(0);
        return;
      }

      const releaseOffset = rect.bottom - window.innerHeight;
      setPetalOffsetY(releaseOffset < 0 ? releaseOffset : 0);
    };

    updatePetalOffset();
    window.addEventListener('scroll', updatePetalOffset, { passive: true });
    window.addEventListener('resize', updatePetalOffset);

    return () => {
      window.removeEventListener('scroll', updatePetalOffset);
      window.removeEventListener('resize', updatePetalOffset);
    };
  }, []);

  const petalStyle = {
    '--petal-offset-y': `${petalOffsetY + window.innerHeight * 0.07}px`,
  } as CSSProperties;

  const bookingUrl = 'https://cal.com/loslasszen/loslasszen-bei-philipp-kostenfreie-sitzung-60-min';

  const handleBookingClick = () => {
    trackExternalLink(bookingUrl, 'QR Landing Page – Kostenfreie Sitzung');
  };

  return (
    <Layout fixedBackground fixedBlossoms={false}>
      <TopNav />

      <div className="landing-page-flow" id="top">
        <div className="petal-overlay petal-overlay--back" aria-hidden="true" style={petalStyle}>
          <div className="petal-overlay-track">
            <FallingBlossoms layer="back" />
          </div>
        </div>

        <div className="petal-overlay petal-overlay--front" aria-hidden="true" style={petalStyle}>
          <div className="petal-overlay-track">
            <FallingBlossoms layer="front" />
          </div>
        </div>

        <section className="intro-shell" ref={introShellRef}>
          <div className="intro-sticky-stage" aria-hidden="true">
            <div
              className="intro-paper-texture"
              style={{ backgroundImage: `url(${paperTexture})` }}
            />
            <SumiEImage
              src={sumiBranch}
              alt="Cherry blossom branch in Sumi-e style"
              className="sumi-e-image--section"
            />
          </div>

          <div className="content-section intro-content-section">
            <GlassPanel className="glass-panel-custom paid-session-page-panel">
              <div className="space-y-10">
                <div>
                  <InkSplashHeading delay={0.2} className="mb-4">
                    <h1 className="heading-xl">60-minütige kostenfreie Kennenlern-Sitzung in Eberswalde</h1>
                  </InkSplashHeading>
                  <p className="text-body leading-relaxed paid-session-subtitle">
                    Raum für Ausrichtung, Entlastung und mehr Bewegungsfreiheit im Körper
                  </p>
                  <div className="separator" />
                </div>

                <SereneReveal delay={600} scrollDelay={100}>
                  <p className="text-body leading-relaxed">
                    Für Menschen, die Philipps Körperarbeit kennenlernen möchten und offen dafür sind, im Anschluss ehrliches Feedback zu ihrer Erfahrung zu geben. Termin online in unter 1 Minute reservieren.
                  </p>
                </SereneReveal>

                <SereneReveal delay={680} scrollDelay={110}>
                  <BabyNotice />
                </SereneReveal>

                <div className="space-y-6">
                  <SereneReveal delay={760} scrollDelay={120}>
                    <div className="paid-session-inline-cta">
                      <GradientButton
                        href={bookingUrl}
                        target="_blank"
                        onClick={handleBookingClick}
                      >
                        <span className="cta-copy cta-copy-long">In Unter Einer Minute Online Termin Sichern</span>
                        <span className="cta-copy cta-copy-short">Online Termin Sichern</span>
                      </GradientButton>
                    </div>
                  </SereneReveal>

                  <SereneReveal delay={850} scrollDelay={140}>
                    <h2 className="heading-lg">Für wen eignet sich diese Sitzung?</h2>
                  </SereneReveal>

                  <SereneReveal delay={1050} scrollDelay={180}>
                    <div className="text-body space-y-4">
                      <p>Diese kostenfreie Kennenlern-Sitzung richtet sich an Sie, wenn Sie</p>
                      <br></br>
                      <ul className="pl-6 list-bullet">
                        <li>meine Arbeit ohne finanzielles Risiko kennenlernen wollen.</li>
                        <li>seit neuestem oder schon lange Schmerzen haben.</li>
                        <li>mehr Kraft, Freiheit und Geschmeidigkeit in Ihrem Körper wünschen.</li>
                        <li>sich nach intensiver körperlicher Leistung wieder ausrichten und entspannen wollen.</li>
                        <li>schon vieles probiert haben und manche Sachen einfach nicht loswerden - bei mir selbst war es diese Arbeit, die endlich geholfen hat.</li>
                        <li>merken, dass sich Ereignisse in ihrem Körper abgelagert haben, die Sie auf somatische Art angehen möchten.</li>
                      </ul>
                      <br></br>
                      <p>Wenn Sie sich hier wiedererkennen, ist diese 60-minütige Sitzung für Sie gedacht.

                      </p>
                    </div>
                  </SereneReveal>
                </div>

                <div className="space-y-6">
                  <SereneReveal delay={1200} scrollDelay={210}>
                    <h2 className="heading-lg">Was passiert in den 60 Minuten?</h2>
                  </SereneReveal>

                  <div className="space-y-6 text-body">
                    <SereneReveal delay={1320} scrollDelay={240}>
                      <div>
                        <h3 className="heading-sm">1. Ankommen &amp; Gespräch (5 - 10 Min.)</h3>
                        <p>Kurzes Check-in zu Ihrem aktuellen Zustand, zum Ankommen und für Ihre Wünsche.</p>

                      </div>
                    </SereneReveal>

                    <SereneReveal delay={1440} scrollDelay={270}>
                      <div>
                        <h3 className="heading-sm">2. Individuelle Körperarbeit (ca. 45 Min.)</h3>
                        <p>
                          Jede Sitzung beginnt und endet mit Nackenarbeit. Ein entspannter Nacken entspannt den ganzen Körper.
                          In diesen Momenten können Sie weiter ankommen, loslassen und sich in genau diesem Moment wiederfinden und mit ihrem Körper verbinden.

                          Daraf folgt direkt Ihre Individuell angepasste Sitzung.
                          Den Großteil der Sitzung arbeiten wir entsprechend Ihrer präsenten Beschwerden oder Schmerzen. Sie sind stets in Kontrolle darüber,
                          wie intensiv die Arbeit an diesem Tag wird.
                        </p>
                      </div>
                    </SereneReveal>

                    <SereneReveal delay={1560} scrollDelay={300}>
                      <div>
                        <h3 className="heading-sm">3. Ausrichtung &amp; Integration (ca. 10 Min.)</h3>
                        <p>
                          Ausrichtung und Erdung nach der tiefen Arbeit. Manchmal werde ich Ihnen eine Übung für zu Hause mitgeben. Immer werde ich darauf achten, dass
                          Sie nach der Arbeit ausgeglichen und geerdet sind.
                        </p>
                      </div>
                    </SereneReveal>
                  </div>
                </div>

                <div className="space-y-6">
                  <SereneReveal delay={1650} scrollDelay={310}>
                    <h2 className="heading-lg">Was ich mir im Gegenzug wünsche</h2>
                  </SereneReveal>

                  <SereneReveal delay={1760} scrollDelay={340}>
                    <div className="text-body space-y-4 paid-session-note-block">
                      <p>Diese Kennenlern-Sitzung ist für Sie kostenfrei.</p>
                      <p>Im Gegenzug bitte ich Sie um:</p>
                      <ul className="pl-6 list-bullet">
                        <li>ein ehrliches schriftliches Feedback zu Ihrer Erfahrung (einige Sätze genügen),</li>
                        <li>die Erlaubnis, dieses Feedback ggf. auszugsweise und mit Initialen oder Vornamen und wenn Sie bereit sind mit Foto, als Erfahrungsbericht zu verwenden (Website, Flyer o. Ä.).</li>
                      </ul>
                      <p>Wenn Sie nach der Sitzung merken, dass Sie kein Testimonial geben möchten, ist das in Ordnung – die Sitzung bleibt für Sie kostenfrei. Ihre Rückmeldung ist eine Einladung, kein Zwang.</p>
                      <p>Am meisten hilft auch eine ehrliche Bewertung auf Google und Facebook. Ich werde Sie nach der Sitzung darauf ansprechen.</p>
                    </div>
                  </SereneReveal>
                </div>

                <SereneReveal delay={1680} scrollDelay={315}>
                  <Suspense
                    fallback={
                      <div className="inline-reviews-loading text-body">
                        Bewertungen werden geladen …
                      </div>
                    }
                  >
                    <InlineReviewsCarousel />
                  </Suspense>
                </SereneReveal>

                <div className="space-y-6">
                  <SereneReveal delay={1700} scrollDelay={320}>
                    <h2 className="heading-lg">Wichtige Hinweise &amp; Erwartungsrahmen</h2>
                  </SereneReveal>

                  <SereneReveal delay={1820} scrollDelay={350}>
                    <div className="text-body space-y-4 paid-session-note-block">
                      <p>
                        Diese Arbeit zielt auf eine nachhaltige Ausrichtung des Körpers und das Lösen
                        von Blockaden ab, die das freie Erleben von Körper und Geist eingeschränkt haben können. Erfahrungen sind individuell und können sich von Person zu Person
                        unterscheiden. Emotionen können hochkommen. Jeder Mensch reagiert etwas anders auf die intensiven Momente auf dem Tisch.
                      </p>
                      <br></br>
                      <p>
                        Nach einer Sitzung kann es in manchen Fällen zu einer Erstverschlimmerung kommen, während sich der
                        Körper neu sortiert. Dies ist allerdings nicht notwendig um spürbare und bleibende Verbesserung zu erfahren.
                        Oft bringen scheinbar kleine, unauffällige Momente auf dem Tisch große Ergebnisse mit sich.
                        Während es während der intensiven Arbeit zu schmerzhaften Momenten kommen kann, sind keine Schmerzen notwendig für direkt sichtbare Fortschritte in der Ausrichtung des Körpers.
                      </p>
                      <br></br>
                      <p>
                        Meine Arbeit ersetzt keine ärztliche oder psychotherapeutische Behandlung und
                        ich kann keine bestimmten Wirkungen oder Heilerfolge zusichern.
                        Lediglich Sie selbst vermögen es Ihren Körper zu heilen und Ihre Schmerzen loszulassen.
                        Dabei unterstütze ich Sie gerne durch den Raum dafür, angeleitete Atmung in wichtigen Momenten und die Arbeit an Ihrem Körper.
                      </p>
                    </div>
                  </SereneReveal>
                </div>

                <div className="space-y-6">
                  <SereneReveal delay={1960} scrollDelay={380}>
                    <h2 className="heading-lg">Ort, Dauer &amp; Ausgleich</h2>
                  </SereneReveal>

                  <SereneReveal delay={2080} scrollDelay={410}>
                    <div className="text-body">
                      <ul className="pl-6 list-bullet">
                        <li>Ort: Schillerstr. 3, 16225 Eberswalde</li>
                        <li>Dauer: 60 Minuten</li>
                        <li>Honorar: 0 € (kostenfreie Kennenlern-Sitzung gegen ehrliches Testimonial)</li>
                        <li>Zahlung: entfällt</li>
                        <li>Umbuchung: Kostenfreie Umbuchung bis 24 Stunden vor dem Termin möglich.</li>
                      </ul>
                    </div>
                  </SereneReveal>
                </div>

                <div className="space-y-6">
                  <SereneReveal delay={2220} scrollDelay={440}>
                    <h2 className="heading-lg">Sicherheit &amp; Rahmen</h2>
                  </SereneReveal>

                  <SereneReveal delay={2340} scrollDelay={470}>
                    <div className="text-body paid-session-safety-block">
                      <p>
                        Mir ist wichtig, dass Sie sich bei mir richtig fühlen.
                      </p>
                      <p>
                        Wenn Sie sich in den ersten 15 Minuten der Sitzung unwohl fühlen und abbrechen möchten, entstehen für Sie keine Kosten außer der Anzahlung.
                      </p>
                    </div>
                  </SereneReveal>
                </div>

                <SereneReveal delay={2480} scrollDelay={500}>
                  <div className="cta-section">
                    <GradientButton
                      href={bookingUrl}
                      target="_blank"
                      onClick={handleBookingClick}
                    >
                      Kostenfreie Sitzung jetzt buchen
                    </GradientButton>
                  </div>
                </SereneReveal>
              </div>
            </GlassPanel>
          </div>
        </section>
      </div>

      <Footer />
    </Layout>
  );
}
