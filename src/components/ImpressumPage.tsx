import { Layout } from './Layout';
import { TopNav } from './TopNav';
import { GlassPanel } from './GlassPanel';
import { SumiEImage } from './SumiEImage';
import { Footer } from './Footer';
import sumiBranch from '../assets/branch-transparent.webp';
import paperTexture from '../assets/b67594e9b3c439245fdadadaacf25076d0420eda Large.jpeg';

export function ImpressumPage() {
    return (
        <Layout fixedBackground={false} fixedBlossoms={false}>
            <TopNav />

            <div className="landing-page-flow" id="top">
                <section className="intro-shell impressum-shell">
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

                    <div className="content-section intro-content-section impressum-content-section">
                        <GlassPanel className="glass-panel-custom impressum-glass-panel">
                            <div className="space-y-8">
                                <div>
                                    <h1 className="heading-lg">Impressum</h1>
                                    <div className="separator" />
                                </div>

                                <div className="text-body impressum-page-body">
                                    <section className="impressum-section">
                                        <h3>Angaben gemäß § 5 DDG</h3>
                                        <p>
                                            Philipp Traubert<br />
                                            Schillerstr. 3<br />
                                            16225 Eberswalde
                                        </p>
                                    </section>

                                    <section className="impressum-section">
                                        <h3>Kontakt</h3>
                                        <p>
                                            Telefon: +49 152 56934647<br />
                                            E-Mail: jetzt@loslasszen.de
                                        </p>
                                    </section>

                                    <section className="impressum-section">
                                        <h3>Aufsichtsbehörde</h3>
                                        <p>
                                            Gewerbeamt Eberswalde<br />

                                        </p>
                                    </section>

                                    <section className="impressum-section">
                                        <h3>Kammerzugehörigkeit</h3>
                                        <p>Industrie- und Handelskammer (IHK)</p>
                                    </section>

                                    <section className="impressum-section">
                                        <h3>Umsatzsteuer-Identifikationsnummer</h3>
                                        <p>
                                            Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet und dementsprechend keine Umsatzsteuer-Identifikationsnummer ausgewiesen.
                                        </p>
                                    </section>

                                    <section className="impressum-section">
                                        <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
                                        <p>
                                            Philipp Traubert<br />
                                            Schillerstr. 3<br />
                                            16225 Eberswalde
                                        </p>
                                    </section>

                                    <section className="impressum-section">
                                        <h3>EU-Streitschlichtung</h3>
                                        <p>
                                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                                            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                                                https://ec.europa.eu/consumers/odr/
                                            </a>.
                                            <br />
                                            Unsere E-Mail-Adresse findest du oben im Impressum.
                                        </p>
                                    </section>

                                    <section className="impressum-section">
                                        <h3>Verbraucher­streit­beilegung / Universal­schlichtungs­stelle</h3>
                                        <p>
                                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </GlassPanel>
                    </div>
                </section>
            </div>

            <Footer />
        </Layout>
    );
}
