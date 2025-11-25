import { InkSplashHeading } from './components/InkSplashHeading';
import { Layout } from './components/Layout';
import { SumiEImage } from './components/SumiEImage';
import { GlassPanel } from './components/GlassPanel';
import { TopNav } from './components/TopNav';
import { ScrollReveal } from './components/ScrollReveal';
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
              {/* Main Heading with Ink Splash */}
              <div>
                <InkSplashHeading delay={0.2} className="mb-4">
                  <h1 className="heading-xl">
                    Lassen Sie endlich los, was ihr Körper schon zu lange trägt.
                  </h1>
                </InkSplashHeading>
                <div className="separator" />
              </div>

              {/* Introduction */}
              <div className="space-y-6">
                <InkSplashHeading delay={0.6}>
                  <h2 className="heading-lg">Auf einen Blick
                  </h2>
                </InkSplashHeading>
                <InkSplashHeading delay={1}>
                  <div className="text-body">
                    <ul className="pl-6 list-bullet">
                      <li>Ganzheitliche, nicht-medizinische Körperarbeit in Eberswalde.</li>
                      <li>Für Menschen, die bereit sind, ihre Schmerzen loszulassen.</li>
                      <li>Entspannung und Ausrichtung des Gewebes.</li>
                      <li>Sicherer und unterstützender Raum für alles was da ist.</li>
                      <li>Sitzungen dauern 60 Minuten.</li>
                    </ul>
                  </div>
                </InkSplashHeading>

              </div>

              {/* Services Section */}
              <div className="space-y-8 mt-16">
                <InkSplashHeading delay={1.4}>
                  <h2 className="heading-lg">
                    Was Sie in einer Sitzung erwartet
                  </h2>
                </InkSplashHeading>

                <div className="space-y-6 text-body">
                  <InkSplashHeading delay={1.4}>
                    <div>
                      <h3 className="heading-sm">Kurzes Ankommen und Einchecken</h3>
                      <p className="leading-relaxed">
                        Was beschäftigt Sie heute und wo soll meine Aufmerksamkeit hingehen?
                        Was sind länger anhaltende Themen und Muster Ihres Körpers?
                      </p>
                    </div>
                  </InkSplashHeading>

                  <ScrollReveal delay={100}>
                    <div>
                      <h3 className="heading-sm">Nackenarbeit zur Entspannung</h3>
                      <p className="leading-relaxed">
                        Jede Sitzung beginnt und endet mit Nackenarbeit. Ein entspannter Nacken entspannt den ganzen Körper.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={200}>
                    <div>
                      <h3 className="heading-sm">Ihre Individuell angepasste Sitzung</h3>
                      <p className="leading-relaxed">
                        Den Großteil der Sitzung arbeiten wir entsprechend Ihrer präsenten Beschwerden oder Schmerzen.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={300}>
                    <div>
                      <h3 className="heading-sm">Integration in Ihren Körper</h3>
                      <p className="leading-relaxed">
                        Zum Abschluss richten wir Ihren Körper neu aus, um die Arbeit nachhaltig in Ihr System zu integrieren.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              {/* Call to Action */}
              <ScrollReveal delay={400}>
                <div className="cta-section">
                  <InkSplashHeading delay={1} className="mb-6">
                    <h3 className="heading-sm">
                      Fangen Sie jetzt and loszulasszen
                    </h3>
                  </InkSplashHeading>
                  <p className="text-body mb-8">
                    <ul>
                      <li>Pro Woche gibt es 2 kennenlern Sitzungen im Austausch gegen ein Testimonial mit Foto für meine Webseite.</li>
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
              </ScrollReveal>
            </div>
          </GlassPanel>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}