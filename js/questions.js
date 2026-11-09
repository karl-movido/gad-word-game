import { MODES } from "./data.js";

const EASY_TABLE = [
  ["awareness"],
  ["dignity"],
  ["discrimination"],
  ["diversity"],
  ["empowerment"],
  ["fairness"],
  ["gender"],
  ["growth"],
  ["humanity"],
  ["identity"],
  ["inequality"],
  ["men"],
  ["peace"],
  ["policy"],
  ["power"],
  ["protection"],
  ["representation"],
  ["rights"],
  ["roles"],
  ["strength"],
  ["struggle"],
  ["voice"],
  ["women"],
];

const PROGRESSIVE_TABLE = [
  [
    "ally",
    "An ally actively uses their own privilege to advocate for and support marginalized groups, which is a crucial element in building inclusive and safe communities.",
  ],
  [
    "annulment",
    "Governed by the Family Code of the Philippines, this is the legal process of invalidating a marriage, frequently utilized by victims of psychological incapacity or domestic abuse."
  ],
  [
    "bias",
    "These are the hidden, automatic prejudices that quietly influence how we evaluate or treat people based on gender stereotypes."
  ],
  [
    "expression",
    "The \"E\" in the SOGIE acronym. Gender Expression refers to the physical manifestations of one's gender identity, typically expressed through clothing, haircut, voice, or behavior."
  ],
  [
    "harassment",
    "Strictly penalized under RA 11313 (Safe Spaces Act / Bawal Bastos Law), which criminalizes gender-based sexual harassment in streets, public spaces, educational institutions, workplaces, and online platforms."
  ],
  [
    "hormones",
    "In GAD and LGBTQIA+ advocacy, access to hormone therapy is a vital part of Gender-Affirming Healthcare, helping align a transgender individual's physical body with their gender identity."
  ],
];

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

const buildPool = (table, mode) =>
  table.map(([id, trivia = "", ext]) => makeQuestion({ id, mode, trivia, ext }));

export const EASY_QUESTIONS = buildPool(EASY_TABLE, MODES.NORMAL);
export const HARD_QUESTIONS = buildPool(PROGRESSIVE_TABLE, MODES.PROGRESSIVE);

export const QUESTIONS_POOL = {
  normal: EASY_QUESTIONS,
  progressive: HARD_QUESTIONS
};

export const ALL_QUESTIONS_IMAGES = [
  ...EASY_QUESTIONS,
  ...HARD_QUESTIONS
].flatMap(q => q.images);
