import { MODE_CONFIG, MODES } from "./data.js";

export const EASY_QUESTIONS = [
  makeQuestion({
    id: "development", mode: "normal",
    trivia: "The core concept behind RA 11313 (Bawal Bastos ), which mandates that streets, workplaces, and schools must be free from gender-based sexual harassment."
  }),
  makeQuestion({
    id: "sex", mode: "normal", trivia: "GAD distinguishes Sex (biological characteristics at birth) from Gender (socially learned roles). Because gender roles are learned, society can change them for the better!"
  }),
  makeQuestion({
    id: "leader", mode: "normal",
    trivia: "When more women hold leadership roles, nations pass stronger laws on health, education, and social protection. Inclusive leadership creates better results for entire communities!"
  }),
  makeQuestion({
    id: "freedom", mode: "normal",
    trivia: "True freedom in GAD means having equal opportunities to choose your education, career, and future without being limited by rigid gender stereotypes."
  })
];
export const HARD_QUESTIONS = [
  makeQuestion({
    id: "ally", mode: "progressive",
    trivia: "An ally actively uses their own privilege to advocate for and support marginalized groups, which is a crucial element in building inclusive and safe communities.",
  }),
  makeQuestion({
    id: "annulment", mode: "progressive",
    trivia: "Governed by the Family Code of the Philippines, this is the legal process of invalidating a marriage, frequently utilized by victims of psychological incapacity or domestic abuse."
  }),
  makeQuestion({
    id: "bias", mode: "progressive",
    trivia: "These are the hidden, automatic prejudices that quietly influence how we evaluate or treat people based on gender stereotypes."
  }),
  makeQuestion({
    id: "expression", mode: "progressive",
    trivia: "The \"E\" in the SOGIE acronym. Gender Expression refers to the physical manifestations of one's gender identity, typically expressed through clothing, haircut, voice, or behavior."
  }),
  makeQuestion({
    id: "harassment", mode: "progressive",
    trivia: "Strictly penalized under RA 11313 (Safe Spaces Act / Bawal Bastos Law), which criminalizes gender-based sexual harassment in streets, public spaces, educational institutions, workplaces, and online platforms."
  }),
  makeQuestion({
    id: "hormones", mode: "progressive",
    trivia: "In GAD and LGBTQIA+ advocacy, access to hormone therapy is a vital part of Gender-Affirming Healthcare, helping align a transgender individual's physical body with their gender identity."
  }),
];

export const QUESTIONS_POOL = {
  normal: EASY_QUESTIONS,
  progressive: HARD_QUESTIONS
};

function pics(id, { mode = "normal", ext = "jpg", overrides = {} } = {}) {
  return Array.from({ length: 4 }, (_, i) => {
    const pictureNumber = i + 1;
    const thisExt = overrides[pictureNumber] || ext;
    return `assets/images/${mode}/${id}/${id}_${pictureNumber}.${thisExt}`;
  });
}

function makeQuestion({ id, mode = "normal", answer = id.replaceAll("-", "").toUpperCase(), display = id.replaceAll("-", " ").toUpperCase(), ext, overrides, trivia = "" }) {
  return {
    id,
    mode,
    answer,
    display,
    trivia,
    images: pics(id, { mode, ext, overrides })
  };
}

export const ALL_QUESTIONS_IMAGES = [
  ...QUESTIONS_POOL.normal,
  ...QUESTIONS_POOL.progressive
].flatMap(q => q.images);
