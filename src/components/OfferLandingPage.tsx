import { useEffect, useRef, useState } from 'react';
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

interface OfferLandingPageProps {
  title: string;
  intro: string;
  bullets: string[];
  detailTitle: string;
  detailText: string;
  ctaLabel: string;
  bookingUrl: string;
  trackingLabel: string;
}

export function OfferLandingPage({
  title,
  intro,
  bullets,
  detailTitle,
  detailText,
  ctaLabel,
  bookingUrl,
  trackingLabel,
}: OfferLandingPageProps) {
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

  const handleBookingClick = () => {
    trackExternalLink(bookingUrl, trackingLabel);
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
            <GlassPanel className="glass-panel-custom">
              <div className="space-y-10">
                <div>
                  <InkSplashHeading delay={0.2} className="mb-4">
                    <h1 className="heading-xl">{title}</h1>
                  </InkSplashHeading>
                  <div className="separator" />
                </div>

                <SereneReveal delay={600} scrollDelay={100}>
                  <p className="text-body leading-relaxed">{intro}</p>
                </SereneReveal>

                <SereneReveal delay={740} scrollDelay={120}>
                  <BabyNotice />
                </SereneReveal>

                <div className="space-y-6">
                  <SereneReveal delay={900} scrollDelay={150}>
                    <h2 className="heading-lg">Auf einen Blick</h2>
                  </SereneReveal>

                  <SereneReveal delay={1100} scrollDelay={200}>
                    <div className="text-body">
                      <ul className="pl-6 list-bullet">
                        {bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </SereneReveal>
                </div>

                <div className="space-y-4">
                  <SereneReveal delay={1300} scrollDelay={220}>
                    <h3 className="heading-sm">{detailTitle}</h3>
                  </SereneReveal>

                  <SereneReveal delay={1450} scrollDelay={260}>
                    <p className="text-body leading-relaxed">{detailText}</p>
                  </SereneReveal>
                </div>

                <SereneReveal delay={1600} scrollDelay={300}>
                  <div className="cta-section">
                    <GradientButton
                      href={bookingUrl}
                      target="_blank"
                      onClick={handleBookingClick}
                    >
                      {ctaLabel}
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
