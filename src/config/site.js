// PUSAT PENGATURAN: ubah teks/kontak/fitur di sini, bukan di komponen.
export const site = {
  name: 'Raffa',
  fullName: 'M Raffa Izzel Hendro',
  handle: '@RaffaHmii',
  url: 'https://mraffaizzelh.vercel.app',
  tagline: 'Student by title, builder by habit.',
  statement: 'Turning raw logic into clean web apps and sharp data insights.',
  location: 'Banjar, West Java, ID',
  school: 'SMKN 1 Banjar · Software Engineering',
  timezone: 'Asia/Jakarta',
  availability: { show: true, text: 'Available for internship 2027' },
  heroStats: [
    { value: '20+', label: 'Repositories on GitHub' },
    { value: '3+', label: 'Core tech stacks' },
    { value: '99%', label: 'Hands-on driven' },
  ],
  contact: {
    email: '1mraffaizzelh@gmail.com',
    whatsapp: '6289530046420',
    linkedin: 'https://www.linkedin.com/in/m-raffa-izzel-hendro/', // tempel URL profil LinkedIn lengkap
    github: 'https://github.com/Raffahmii',
    freelance: 'https://raffaportfolio.vercel.app/',
    cv: '/cv-raffa.pdf',
  },
  nav: [
    ['01', 'Work', '#work'],
    ['02', 'Story', '#story'],
    ['03', 'Skills', '#skills'],
    ['04', 'Contact', '#contact'],
  ],
}
export const isFilled = (v) => typeof v === 'string' && v !== '' && !v.includes('[ISI]')
