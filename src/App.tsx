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
                    Body Work & Healing Arts
                  </h1>
                </InkSplashHeading>
                <div className="separator" />
              </div>

              {/* Introduction */}
              <div className="space-y-6">
                <p className="text-body">
                  Welcome to a sanctuary of tranquility and restoration. Our practice draws
                  inspiration from ancient Eastern healing traditions, blending time-honored
                  techniques with modern understanding of the body's innate wisdom.
                </p>
              </div>

              {/* Services Section */}
              <div className="space-y-8 mt-16">
                <InkSplashHeading delay={0.6}>
                  <h2 className="heading-lg">
                    Our Approach
                  </h2>
                </InkSplashHeading>

                <div className="space-y-6 text-body">
                  <div>
                    <h3 className="heading-sm">Mindful Touch</h3>
                    <p className="leading-relaxed">
                      Each session is tailored to your unique needs, honoring the connection
                      between body, mind, and spirit. We create a space where healing can
                      naturally unfold.
                    </p>
                  </div>

                  <div>
                    <h3 className="heading-sm">Restorative Balance</h3>
                    <p className="leading-relaxed">
                      Through gentle manipulation and energy work, we help release tension,
                      improve circulation, and restore your body's natural balance and vitality.
                    </p>
                  </div>

                  <div>
                    <h3 className="heading-sm">Sacred Space</h3>
                    <p className="leading-relaxed">
                      Our practice environment embodies serenity and simplicity, allowing you
                      to fully surrender to the healing experience and reconnect with your
                      inner peace.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="cta-section">
                <InkSplashHeading delay={1} className="mb-6">
                  <h2 className="heading-md">
                    Begin Your Journey
                  </h2>
                </InkSplashHeading>
                <p className="text-body mb-8">
                  Experience the transformative power of intentional bodywork. Schedule a
                  consultation to discover how we can support your path to wellness.
                </p>
                <button className="btn-primary">
                  Book a Session
                </button>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </Layout>
  );
}