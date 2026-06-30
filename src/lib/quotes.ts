import type { Gender } from "./types";

// Bank quotes cinta original (ID). Mostly netral biar reusable; sebagian
// dibedakan halus untuk target cewe/cowo lewat panggilan & nuansa.
const NEUTRAL: string[] = [
  "Kamu bukan pelarian, kamu tujuan.",
  "Aku belajar arti pulang sejak mengenalmu.",
  "Hari tersulit pun terasa ringan kalau ujungnya kamu.",
  "Bukan sempurna, tapi denganmu segalanya pas.",
  "Pelukmu lebih hangat dari semua alasan untuk pergi.",
  "Aku tidak mencari yang lain, aku hanya memilihmu lagi tiap hari.",
  "Di antara semua keramaian, namamu yang paling kucari.",
  "Kalau bahagia punya wajah, mungkin itu kamu.",
  "Aku jatuh cinta bukan sekali, tapi setiap kali kamu tersenyum.",
  "Bersamamu, waktu jadi pelit; rasanya selalu kurang.",
  "Kamu bagian dari rencana yang tak pernah kususun, tapi paling kusyukuri.",
  "Genggam tanganku, sisa dunia bisa menunggu.",
  "Aku tak janji langit cerah, tapi aku janji tetap di sini saat hujan.",
  "Rumah ternyata bukan tempat, melainkan kamu.",
  "Setiap cerita baikku belakangan ini selalu ada kamu di dalamnya.",
  "Kamu candu yang tak ingin kusembuhkan.",
  "Cinta tak harus ramai, cukup kamu yang mengerti.",
  "Aku menua dengan tenang asal di sebelahmu.",
  "Dari semua hal yang kupunya, kamu yang paling kujaga.",
  "Kita tak sempurna, tapi kita saling memilih, dan itu cukup.",
];

const FOR_CEWE: string[] = [
  "Senyummu menyelesaikan hari yang berantakan, Sayang.",
  "Kamu cantik bukan karena rupa, tapi karena caramu mencintai.",
  "Mau kupeluk pelan-pelan sampai semua takutmu reda.",
];

const FOR_COWO: string[] = [
  "Di pundakmu, aku belajar arti tenang.",
  "Kamu kuat untuk dunia, lembut untukku, dan itu cukup membuatku jatuh.",
  "Pulanglah kapan pun lelah, aku selalu jadi tempatmu.",
];

// ~23 default quotes, dibumbui sesuai target penerima.
export function bankQuotes(gender: Gender): string[] {
  const extra = gender === "cowo" ? FOR_COWO : FOR_CEWE;
  return [...NEUTRAL, ...extra];
}
