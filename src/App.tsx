import { InkSplashHeading } from './components/InkSplashHeading';
import { Layout } from './components/Layout';
import { SumiEImage } from './components/SumiEImage';
import { GlassPanel } from './components/GlassPanel';
import { TopNav } from './components/TopNav';
import sumiBranch from './assets/branch-transparent.png';

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
                <p className="text-body">
                  loslasszen ist Körperarbeit für den ganzen Menschen. Ganzheitliche,
                  nicht-medizinische Begleitung für Menschen, die ihrem Körper bewusst begegnen
                  und sich Zeit für echte Regeneration nehmen wollen.
                </p>
                <p className="text-body">
                  Ich arbeite achtsam, fein und präsent über Berührung, Faszienarbeit und Atem.
                  Jede Sitzung entsteht im Dialog mit dir – wir folgen dem, was dein Nervensystem
                  gerade braucht, statt einem starren Ablauf.
                </p>
              </div>

              {/* Services Section */}
              <div className="space-y-8 mt-16">
                <InkSplashHeading delay={0.6}>
                  <h2 className="heading-lg">
                    Was dich in einer Sitzung erwartet
                  </h2>
                </InkSplashHeading>

                <div className="space-y-6 text-body">
                  <div>
                    <h3 className="heading-sm">Berührung mit Präsenz</h3>
                    <p className="leading-relaxed">
                      Langsame Sequenzen, die tonisieren, entwirren und dir helfen, Spannung loszulassen.
                      Du bleibst jederzeit handlungsfähig und darfst Grenzen klar benennen.
                    </p>
                  </div>

                  <div>
                    <h3 className="heading-sm">Regulation über Atem & Faszien</h3>
                    <p className="leading-relaxed">
                      Wir nutzen Atemräume, fasziale Dehnungen und feine Impulse, damit dein Nervensystem
                      neue Referenzen für Ruhe und Lebendigkeit speichern kann.
                    </p>
                  </div>

                  <div>
                    <h3 className="heading-sm">Integration in deinen Alltag</h3>
                    <p className="leading-relaxed">
                      Zum Abschluss findest du konkrete Mikro-Rituale für Zuhause, damit sich dein Körper
                      auch zwischen den Sessions erinnern kann, wie Loslassen sich anfühlt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="cta-section">
                <InkSplashHeading delay={1} className="mb-6">
                  <h2 className="heading-md">
                    Lass uns ins Gespräch kommen
                  </h2>
                </InkSplashHeading>
                <p className="text-body mb-8">
                  Schreibe mir eine kurze Nachricht mit deinem Anliegen und zwei Terminvorschlägen.
                  Ich melde mich zeitnah zurück und wir finden einen Raum, der für dich passt.
                </p>
                <button className="btn-primary">
                  Termin anfragen
                </button>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </Layout>
  );
}