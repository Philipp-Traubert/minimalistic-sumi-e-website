import { OfferLandingPage } from './components/OfferLandingPage';

export function PaidSessionPage() {
  return (
    <OfferLandingPage
      title="60 Minuten Körperarbeit für Menschen, die bereit sind loszulassen."
      intro="Diese Seite ist für Menschen gedacht, die über den Flyer zu mir gefunden haben und direkt eine reguläre Sitzung buchen möchten. Wenn Sie spüren, dass Ihr Körper nach Aufmerksamkeit, Entlastung und neuer Ausrichtung ruft, können Sie hier direkt Ihren Termin wählen."
      bullets={[
        '60 Minuten Körperarbeit in Eberswalde.',
        'Preis: 60 € pro Sitzung.',
        'Ganzheitliche, nicht-medizinische Begleitung.',
        'Direkte Online-Buchung in unter einer Minute.',
      ]}
      detailTitle="Was Sie erwartet"
      detailText="Sie erhalten eine ruhige, präsente und individuell angepasste Sitzung. Im Mittelpunkt steht, Spannungen zu lösen, den Körper neu auszurichten und ihm einen sicheren Raum zu geben, das loszulassen, was er schon länger trägt."
      ctaLabel="Bezahlte Sitzung buchen"
      bookingUrl="https://cal.com/loslasszen/loslasszen-60-minuten-bei-mir"
      trackingLabel="QR Landing Page – Bezahlte Sitzung"
    />
  );
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
