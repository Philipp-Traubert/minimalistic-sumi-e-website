import { OfferLandingPage } from './components/OfferLandingPage';
import { PaidSessionPage as PaidSessionDesignPage } from './components/PaidSessionPage';

export function PaidSessionPage() {
  return <PaidSessionDesignPage />;
}

export function FreeSessionPage() {
  return (
    <OfferLandingPage
      title="Kostenfreie Kennenlern-Sitzung gegen ein ehrliches Google-Review."
      intro="Diese Seite ist für Menschen gedacht, die Philipps Arbeit kennenlernen möchten. Wenn Sie offen dafür sind, nach der Sitzung ein ehrliches Google-Review zu hinterlassen, können Sie hier direkt eine kostenfreie Kennenlern-Sitzung buchen."
      bullets={[
        '60 Minuten kostenfreie Kennenlern-Sitzung.',
        'Im Austausch gegen ein ehrliches Google-Review.',
        'Ganzheitliche, nicht-medizinische Körperarbeit in Eberswalde.',
        'Direkte Online-Buchung ohne Umwege.',
      ]}
      detailTitle="Worum es bei diesem Angebot geht"
      detailText="Das Angebot schafft einen einfachen ersten Kontakt. Sie lernen die Körperarbeit direkt in einer vollen Sitzung kennen und helfen gleichzeitig mit einem ehrlichen Review dabei, dass mehr Menschen Vertrauen zu dieser Arbeit aufbauen können."
      ctaLabel="Kostenfreie Sitzung buchen"
      bookingUrl="https://cal.com/loslasszen/loslasszen-bei-philipp-kostenfreie-sitzung-60-min"
      trackingLabel="QR Landing Page – Kostenfreie Sitzung"
    />
  );
}
