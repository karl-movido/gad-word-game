const QUESTIONS = [
  makeQuestion({
    id: "ally", hint: "A supportive friend from the outside",
    trivia: "An ally actively uses their own privilege to advocate for and support marginalized groups, which is a crucial element in building inclusive and safe communities.",
  }),
  makeQuestion({
    id: "annulment", hint: "A legal cancellation of a union",
    trivia: "Governed by the Family Code of the Philippines, this is the legal process of invalidating a marriage, frequently utilized by victims of psychological incapacity or domestic abuse."
  }),
  makeQuestion({
    id: "bias", hint: "An unfair, often hidden preference",
    trivia: "These are the hidden, automatic prejudices that quietly influence how we evaluate or treat people based on gender stereotypes."
  }),
  makeQuestion({
    id: "expression", hint: "Outward presentation to the world",
    trivia: "The \"E\" in the SOGIE acronym. Gender Expression refers to the physical manifestations of one's gender identity, typically expressed through clothing, haircut, voice, or behavior."
  }),
  makeQuestion({
    id: "harassment", hint: "Unwelcome and threatening behavior",
    trivia: "Strictly penalized under RA 11313 (Safe Spaces Act / Bawal Bastos Law), which criminalizes gender-based sexual harassment in streets, public spaces, educational institutions, workplaces, and online platforms."
  }),
  makeQuestion({
    id: "hormones", hint: "The body's natural chemical messengers",
    trivia: "In GAD and LGBTQIA+ advocacy, access to hormone therapy is a vital part of Gender-Affirming Healthcare, helping align a transgender individual's physical body with their gender identity."
  }),
  makeQuestion({
  id: "safe-space", 
  hint: "An environment free from harassment and discrimination",
  trivia: "The core concept behind RA 11313 (Bawal Bastos Law), which mandates that streets, workplaces, and schools must be free from gender-based sexual harassment."
})
];

function pics(id, ext = "jpg", overrides = {}) {
  return Array.from({ length: STAGE_TIMES.length }, (_, i) => {
    const pictureNumber = i + 1;
    const thisExt = overrides[pictureNumber] || ext;
    return `${id}/${id}_${pictureNumber}.${thisExt}`;
  });
}

function makeQuestion({ id, answer = id.replaceAll("-", "").toUpperCase(), display = id.replaceAll("-", " ").toUpperCase() , ext, overrides, hint = "", trivia = "" }) {
  return {
    id,
    answer,
    display,
    hint,
    trivia,
    images: pics(id, ext, overrides)
  };
}
