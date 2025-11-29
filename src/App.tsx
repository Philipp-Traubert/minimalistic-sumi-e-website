import { InkSplashHeading } from './components/InkSplashHeading';
import { Layout } from './components/Layout';
import { SumiEImage } from './components/SumiEImage';
import { GlassPanel } from './components/GlassPanel';
import { TopNav } from './components/TopNav';
import { SereneReveal } from './components/SereneReveal';
import { GradientButton } from './components/GradientButton';
import { Footer } from './components/Footer';
import sumiBranch from './assets/branch-transparent.webp';

export default function App() {
  return (
    <Layout>
      <TopNav />
      <div className="app-container">
        {/* Left Side - Sticky Image */}
        <SumiEImage
          src={sumiBranch}
          alt="Cherry blossom branch in Sumi-e style"
        />

        {/* Right Side - Content area */}
        <div className="content-section">
          {/* Liquid Glass Panel */}
          <GlassPanel className="glass-panel-custom">
            <div className="space-y-12">
              {/* Main Heading with Ink Splash - always visible on mount */}
              <div>
                <InkSplashHeading delay={0.2} className="mb-4">
                  <h1 className="heading-xl">
                    Lassen Sie endlich los, was ihr Körper schon zu lange trägt.
                  </h1>
                </InkSplashHeading>
                <div className="separator" />
              </div>

              {/* Introduction - Uses SereneReveal with dual delays */}
              <div className="space-y-6">
                <SereneReveal delay={600} scrollDelay={100}>
                  <h2 className="heading-lg">Auf einen Blick
                  </h2>
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

              {/* Services Section - Staggered viewport delays, quick scroll reveals */}
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

              {/* Call to Action - Longer delay if in viewport, quick if scrolled */}
              <SereneReveal delay={500} scrollDelay={100}>
                <div className="cta-section">
                  <h3 className="heading-sm mb-6">
                    Fangen Sie jetzt an loszulasszen
                  </h3>
                  <p className="text-body mb-8">
                    <ul>
                      <li>Pro Woche biete ich 2 Kennenlern-Sitzungen im Austausch gegen ein Testimonial mit Foto für meine Webseite an.</li>
                      <li>Zur Gründung gibt es 30 Hausbesuche ohne Aufpreis.</li>
                      <li>Alle Angebote können Sie in 60 Sekunden direkt online buchen.</li>
                    </ul>
                  </p>
                  <GradientButton
                    href="https://cal.com/loslasszen"
                    target="_blank"
                  >
                    Jetzt Buchen
                  </GradientButton>
                </div>
              </SereneReveal>
            </div>
          </GlassPanel>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}