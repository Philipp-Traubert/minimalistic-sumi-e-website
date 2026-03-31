import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { InkSplashHeading } from './components/InkSplashHeading';
import { Layout } from './components/Layout';
import { SumiEImage } from './components/SumiEImage';
import { GlassPanel } from './components/GlassPanel';
import { TopNav } from './components/TopNav';
import { SereneReveal } from './components/SereneReveal';
import { GradientButton } from './components/GradientButton';
import { Footer } from './components/Footer';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { FallingBlossoms } from './components/FallingBlossoms';
import { trackExternalLink } from './utils/matomo';
import sumiBranch from './assets/branch-transparent.webp';
import paperTexture from './assets/b67594e9b3c439245fdadadaacf25076d0420eda Large.jpeg';

export default function App() {
  const handleBookingClick = () => {
    trackExternalLink('https://cal.com/loslasszen', 'Jetzt Buchen Button');
  };

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
            <GlassPanel className="glass-panel-custom">
              <div className="space-y-12">
                <div>
                  <InkSplashHeading delay={0.2} className="mb-4">
                    <h1 className="heading-xl">
                      Lassen Sie endlich los, was ihr Körper schon zu lange trägt.
                    </h1>
                  </InkSplashHeading>
                  <div className="separator" />
                </div>

                <div className="space-y-6">
                  <SereneReveal delay={600} scrollDelay={100}>
                    <h2 className="heading-lg">Auf einen Blick</h2>
                  </SereneReveal>
                  <SereneReveal delay={1000} scrollDelay={200}>
                    <div className="text-body">
                      <ul className="pl-6 list-bullet">
                        <li>Ganzheitliche, nicht-medizinische Körperarbeit in Eberswalde.</li>
                        <li>Für Menschen, die bereit sind, ihre Schmerzen loszulassen.</li>
                        <li>Entspannung und Ausrichtung des Gewebes.</li>
                        <li>Sicherer und unterstützender Raum für alles was da ist.</li>
                        <li>Sitzungen dauern 60 Minuten.</li>
                      </ul>
                    </div>
                  </SereneReveal>
                </div>

                <div className="space-y-8 mt-16">
                  <SereneReveal delay={1400} scrollDelay={100}>
                    <h2 className="heading-lg">
                      Was Sie in einer Sitzung erwartet
                    </h2>
                  </SereneReveal>

                  <div className="space-y-6 text-body">
                    <SereneReveal delay={100} scrollDelay={50}>
                      <div>
                        <h3 className="heading-sm">Kurzes Ankommen und Einchecken</h3>
                        <p className="leading-relaxed">
                          Was beschäftigt Sie heute und wo soll meine Aufmerksamkeit hingehen?
                          Was sind länger anhaltende Themen und Muster Ihres Körpers?
                        </p>
                      </div>
                    </SereneReveal>

                    <SereneReveal delay={200} scrollDelay={100}>
                      <div>
                        <h3 className="heading-sm">Nackenarbeit zur Entspannung</h3>
                        <p className="leading-relaxed">
                          Jede Sitzung beginnt und endet mit Nackenarbeit. Ein entspannter Nacken entspannt den ganzen Körper.
                        </p>
                      </div>
                    </SereneReveal>

                    <SereneReveal delay={300} scrollDelay={150}>
                      <div>
                        <h3 className="heading-sm">Ihre Individuell angepasste Sitzung</h3>
                        <p className="leading-relaxed">
                          Den Großteil der Sitzung arbeiten wir entsprechend Ihrer präsenten Beschwerden oder Schmerzen.
                        </p>
                      </div>
                    </SereneReveal>

                    <SereneReveal delay={400} scrollDelay={200}>
                      <div>
                        <h3 className="heading-sm">Integration in Ihren Körper</h3>
                        <p className="leading-relaxed">
                          Zum Abschluss richten wir Ihren Körper neu aus, um die Arbeit nachhaltig in Ihr System zu integrieren.
                        </p>
                      </div>
                    </SereneReveal>
                  </div>
                </div>

                <SereneReveal delay={560} scrollDelay={130}>
                  <div className="cta-section cta-section-secondary cta-section-no-divider">
                    <GradientButton href="/sitzung">
                      Neugierig? Hier erfahren Sie mehr
                    </GradientButton>
                  </div>
                </SereneReveal>

                <SereneReveal delay={500} scrollDelay={100}>
                  <div className="cta-section">
                    <h3 className="heading-sm mb-6">
                      Fangen Sie jetzt an loszulasszen
                    </h3>
                    <div className="text-body mb-8">
                      <ul className="pl-6 list-bullet">
                        <li>Jede Woche biete ich 2 Kennenlern-Sitzungen im Austausch gegen ein Testimonial mit Foto für meine Webseite und Flyer an.</li>
                        <li>Zur Gründung gibt es 30 Hausbesuche ohne Aufpreis.</li>
                        <li>Alle Angebote können Sie in 60 Sekunden direkt online buchen.</li>
                      </ul>
                    </div>
                    <GradientButton
                      href="https://cal.com/loslasszen"
                      target="_blank"
                      onClick={handleBookingClick}
                    >
                      Jetzt Buchen
                    </GradientButton>
                  </div>
                </SereneReveal>
              </div>
            </GlassPanel>
          </div>
        </section>

        <section className="full-width-section testimonials-section" aria-labelledby="bewertungen">
          <GlassPanel className="full-width-glass-panel">
            <ReviewsSection />
          </GlassPanel>
        </section>

        <section className="full-width-section about-section" aria-labelledby="about-me-heading">
          <GlassPanel className="full-width-glass-panel">
            <div className="about-section-copy space-y-8">
              <div>
                <h2 className="heading-lg" id="about-me-heading">Über Mich</h2>
                <div className="separator" />
              </div>

              <div className="text-body space-y-4">
                <p>
                  Schon seit 2013 bewegt mich der Wunsch Körperarbeit zu erlernen und zu praktizieren. In Chiang Mai, Thailand, absolvierte ich mein erstes Training und erlernte die Grundlagen der Nuad Bo Ran Thaimassage.
                  In den folgenden Jahren beschäftigte ich mich primär mit dem Mensch-Sein, Leben in Gemeinschaft und unserem Verstand. 2021 absolvierte ich im Rahmen dessen u.a. meine Yoga- und Meditationslehrerausbildung bei Hridaya Yoga in Frankreich.
                  Innerhalb von zwei Jahren verbrachte ich ca. 150 Tage in kompletter Stille und Meditation, 49 davon alleine in den Bergen in Mexiko. Darüber hinaus begleite ich seit einigen Jahren Männer und Paare in transformativen Kursen.
                  Aufkommende Emotionen zu halten, zu begleiten und bei der Integration zu helfen, verstehe ich als essentiellen Teil meiner Arbeit.
                </p><br></br>
                <p>
                  In einer Phase großen Wandels und starker therapieresistenter Schmerzen, fing ich wieder an mich intensiv mit Körperarbeit zu beschäftigen.
                  Was bei mir nach vielen Monaten und verschiedenen Therapieansätzen endlich Linderung brachte, ist eine Modalität, die ihre Basis in der Kultivierung des Practicioners durch Meditation versteht.
                  Sie kombiniert Elemente der Arbeit von Ida Rolf, die den Körper wieder ausrichtet,
                  der bewussten Rekalibrierung des Nervensystems und der Selbsterfahrung des Körpers nach Moshe Feldenkrais, sowie intensive Triggerpunktarbeit.
                  Das ist die Art der Körperarbeit, die Sie bei mir erfahren.<br></br><br></br>
                  Für die verbundene und liebevolle Art, mit der mir mein Körpertherapeut Martin damals begegnete und mich behandelte, werde ich für immer dankbar sein und wende sie als Maßstab für meine Begegnungen mit Klient:innen an.
                </p><br></br>
                <p>
                  Stets strebend nach tieferem Verständnis darüber wie der Körper optimal funktionieren kann und welche Methoden mir am besten dabei helfen, Menschen beim Loslassen zu unterstützen,
                  beschäftige ich mich aktuell viel mit faszienlösenden Übungen und habe schon ein nächstes Training auf der Wunschliste.
                  <br></br><br>
                  </br>
                  Der Lernweg und das kultivieren meiner Selbst hört nie auf.
                  Die zugrundeliegende Annahme meiner Arbeit ist, dass Sie die einzige Person auf der Welt sind, die Ihren Körper heilen können. Meine Rolle dabei ist, Sie nach bestem Wissen und Gewissen zu unterstützen.
                </p><br></br>
                <p>
                  Ich freue mich darauf, mit Ihnen zu arbeiten und sie auf Ihrem Weg begleiten zu dürfen.
                </p>
                <br></br>

              </div>

              <div className="cta-section cta-section-secondary cta-section-no-divider">
                <GradientButton
                  href="https://cal.com/loslasszen"
                  target="_blank"
                  onClick={handleBookingClick}
                >
                  Buchen Sie jetzt Ihre Sitzung
                </GradientButton>
              </div>
            </div>
          </GlassPanel>
        </section>
      </div>

      <Footer />
    </Layout>
  );
}
