// PUSAT PENGATURAN: ubah teks/kontak/fitur di sini, bukan di komponen.
export const site = {
  name: 'Raffa',
  fullName: 'M Raffa Izzel Hendro', // cek ejaan resmi
  handle: '@[ISI]',
  url: 'https://mraffaizzelh.vercel.app',
  tagline: 'Student by title, builder by habit.',
  location: '[ISI kota], ID',
  timezone: 'Asia/Jakarta',
  availability: { show: true, text: 'Available for internship 2027' },
  heroStats: [
    { value: '5', label: 'Projects' },
    { value: '[ISI]', label: 'Certificates' },
    { value: '2024', label: 'Since' },
  ],
  contact: {
    email: '[ISI]@email.com',
    whatsapp: '[ISI]', // format: 62812xxxx
    linkedin: '[ISI]', // URL lengkap
    github: '[ISI]', // URL lengkap
    cv: '/cv-raffa.pdf',
  },
  // Menu: tambah item saat scene-nya sudah dibuat (Story, Skills, ...)
  nav: [
    ['01', 'Work', '#work'],
    ['02', 'Story', '#story'],
    ['03', 'Skills', '#skills'],
    ['04', 'Contact', '#contact'],
  ],
}
export const isFilled = (v) => typeof v === 'string' && !v.includes('[ISI]')
