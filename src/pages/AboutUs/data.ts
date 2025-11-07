export type TeamData = {
  id: number;
  image: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  website?: string;
  location: string;
};
export const teamData: TeamData[] = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dbhv2ff2q/image/upload/v1744421989/just%20testing/llzjgqg2tqjmpt7dp0ra.jpg",
    name: "Tarik Gourich",
    role: "Responsable Maintenance et HSE - TENMAR",
    phone: "+212 5 24 33 65 82 / 84",
    email: "tgourich@ma.petitbateau.com",
    website: "www.petit-bateau.com",
    location: "Q.I Sidi Ghanem Lot 108 Route de Safi Marrakech Maroc",
  },
  {
    id: 2,
    name: "Fadwa BOUKACHABA",
    image:
      "https://res.cloudinary.com/dbhv2ff2q/image/upload/v1747292326/just%20testing/ssjsiyqpdqjsqtosdos0.jpg",
    role: "Ingénieure d’état Génie Industriel",
    phone: "+212 6 63 42 74 54",
    email: "fdiwaboukachaba@gmail.com",
    location: "Marrakech Maroc",
  },
];

/* 
Fadwa Boukachaba
Ingénieur Génie Industriel
Tél : +212 6 63 42 74 54
fdiwaboukachaba@gmail.com
Marrakech Maroc

Tarik Gourich
Responsable Maintenance et HSE - TENMAR
Tél : +212 5 24 33 65 82 / 84
tgourich@ma.petitbateau.com
www.petit-bateau.com
Q.I Sidi Ghanem Lot 108 Route de Safi Marrakech Maroc
*/
