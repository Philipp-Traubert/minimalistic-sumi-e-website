import type { Review } from './types';

export const GOOGLE_BUSINESS_PROFILE_URL = 'https://www.google.com/maps/place/loslasszen+K%C3%B6rperarbeit/@52.8294855,13.7016767,12z/data=!3m1!4b1!4m6!3m5!1s0x65bc22e049d6f675:0xdce4e2f8eef8ffcc!8m2!3d52.8295141!4d13.7842476!16s%2Fg%2F11yqmkhv9t?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D';

export const STATIC_GOOGLE_REVIEWS: Review[] = [
  {
    id: 'google-static-1',
    platform: 'google',
    authorName: 'Feli Jaspert',
    authorPhoto: undefined,
    rating: 5,
    reviewText:
      'Ich hatte mehrere Sessions bei Philipp und habe jedes Mal viel Bewegung auf körperlicher als auch emotionaler Ebene erfahren dürfen. Eine Körperarbeit, die für mich viel Intensität mit sich bringt. Philipp habe ich dabei als sehr kompetenten, zugewandten und einfühligen Therapeuten kennengelernt. Ich kann ihn und seine Arbeit nur empfehlen. Vielen Dank!',
    relativeTime: 'vor 3 Wochen',
    timestamp: '2026-03-03T12:00:00.000Z',
    profileUrl: GOOGLE_BUSINESS_PROFILE_URL,
  },
  {
    id: 'google-static-2',
    platform: 'google',
    authorName: 'Penny Lu',
    authorPhoto: undefined,
    rating: 5,
    reviewText:
      'Ich kann Philipp sehr empfehlen. Nach seiner Behandlung bin ich schmerzfrei und fühle mich wieder verbunden. Danke dir Philipp :)',
    relativeTime: 'vor 3 Wochen',
    timestamp: '2026-03-03T12:05:00.000Z',
    profileUrl: GOOGLE_BUSINESS_PROFILE_URL,
  },
  {
    id: 'google-static-3',
    platform: 'google',
    authorName: 'dr.gutzeit',
    authorPhoto: undefined,
    rating: 5,
    reviewText:
      'Durch stechende ins Bein ziehende Rückenschmerzen suchte ich die Hilfe von Philipp auf. Durch seine präsente und ruhige Art fühlte ich mich gleich gut aufgehoben. Und schon während der therapeutischen Arbeit, war ich mir sicher an der richtigen Stelle zu sein.',
    relativeTime: 'vor einem Monat',
    timestamp: '2026-02-20T12:00:00.000Z',
    profileUrl: GOOGLE_BUSINESS_PROFILE_URL,
  },
  {
    id: 'google-static-4',
    platform: 'google',
    authorName: 'michael leberknight',
    authorPhoto: undefined,
    rating: 5,
    reviewText:
      'Philipp ist ein wunderbarer Heiler. Ich kam mit Rücken- und Nackenschmerzen zu ihm und verspürte bereits nach einer Behandlung durch seine einfühlsamen Berührungen eine deutliche Linderung. Seine aufrichtige und hingebungsvolle Hingabe, seinen Klienten das Beste zu geben, ist offensichtlich und spürbar. Ich kann seine Körperarbeit wärmstens empfehlen und freue mich schon auf weitere Behandlungen, wenn wir uns das nächste Mal am selben Ort sehen. Vielen Dank!',
    relativeTime: 'vor einem Monat',
    timestamp: '2026-02-18T12:00:00.000Z',
    profileUrl: GOOGLE_BUSINESS_PROFILE_URL,
  },
];

export const STATIC_AVERAGE_RATING = 5;
export const STATIC_TOTAL_REVIEWS = 4;
