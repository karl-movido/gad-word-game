
/**
 * QUESTION TABLES
 *
 * Each row is: [ id, trivia, ext? ]
 *
 * - `id`     folder name under assets/images/<mode>/<id>/  (use hyphens for multi-word answers)
 * - `trivia` shown on the victory modal (source: assets/images/normal/meaning.txt)
 * - `ext`    optional, only when the images are not .jpg (e.g. "png")
 *
 * The answer, display text and the four image paths are all derived from `id`,
 * so adding a question = add the folder with 4 images + one row here.
 */

const EASY_TABLE = [
  ["acceptance", "The quality or state of being accepted or acceptable — receiving someone as they are, without conditions."],
  ["accountability", "An obligation, willingness, or readiness to accept responsibility, give an honest explanation, and face the consequences of one's decisions, actions, or policies."],
  ["advocacy", "The active support, plea, or promotion of a cause, policy, idea, or person to influence social, economic, or political decisions."],
  ["androgyny", "The blending or combination of masculine and feminine characteristics in appearance or behavior, without fitting neatly into either category."],
  ["awareness", "The quality or state of being conscious, knowledgeable, or understanding that something exists or is happening around you or inside your mind."],
  ["bias", "A hidden, automatic prejudice that quietly influences how we evaluate or treat people based on gender stereotypes."],
  ["breadwinner", "The person in a household who earns the income that supports the family — a role still widely assumed to belong to men, which is why GAD pushes back on it."],
  ["catcalling", "Unwanted comments, whistles, or gestures of a sexual nature directed at someone in public — a form of street harassment penalized by RA 11313."],
  ["chromosomes", "The structures that carry genetic material. Along with hormones and reproductive organs, they are part of the biological basis of Sex, as distinct from Gender."],
  ["consent", "Freely and knowingly given permission for something to happen. An act without consent is not affection or courtship — it is harassment or violence."],
  ["development", "The process of growing, changing, or advancing to a more mature, complex, or useful state — the \"D\" in Gender and Development."],
  ["dignity", "The quality of being worthy of esteem, respect, and intrinsic human value — a right that belongs to every person regardless of gender."],
  ["discrimination", "The unequal treatment of a person or group based on categorical traits such as race, gender, or age."],
  ["diversity", "The condition, fact, or presence of a wide range of different elements, characteristics, or people within a group, organization, or system."],
  ["empowerment", "The process of gaining autonomy, self-determination, confidence, and the authority or means to control one's own life and represent one's interests."],
  ["equality", "The state or quality of being equal — everyone receiving the same treatment, access, and rights."],
  ["equity", "Fairness in outcomes rather than in rules alone: giving each person what they need to reach the same starting line, which may mean different support for different people."],
  ["fairness", "The quality or state of being fair — acting without favoritism or bias toward anyone."],
  ["freedom", "The power or right to speak, act, and make choices without external hindrance, coercion, or restraint."],
  ["gender", "The socially, culturally, and psychologically constructed roles, behaviors, expressions, and norms that a given society considers appropriate for men, women, and other gender identities."],
  ["growth", "The act, process, or manner of increasing in size, number, complexity, value, or stage of development."],
  ["harassment", "Repeated, unwanted behavior that threatens, intimidates, or humiliates someone. Under RA 11313 (Bawal Bastos Law) it is penalized in streets, workplaces, schools, and online."],
  ["heterosexual", "A sexual orientation in which a person is attracted to people of a different gender — one of the orientations represented in SOGIE."],
  ["hope", "The feeling of expectation and desire for something positive to happen — the driving force behind most advocacy for change."],
  ["humanity", "Compassionate, sympathetic, or generous behavior or disposition; the quality or state of being humane."],
  ["identity", "Who a person or thing is, including the unique traits, beliefs, name, and background that make them distinct from everyone else."],
  ["inclusion", "The practice of actively ensuring that all individuals — regardless of their background, race, gender, religion, ability, or age — are treated fairly, respected, and given equal access to opportunities and resources."],
  ["inequality", "The uneven distribution of resources, opportunities, power, and privileges among individuals or groups in a society."],
  ["justice", "The quality of being fair, impartial, and morally right."],
  ["leader", "A person who guides, directs, or influences a group, organization, country, or team toward a shared goal."],
  ["marriage", "The legally or socially recognized union between people — in Philippine law currently limited to a man and a woman, which is why equality advocates push for change."],
  ["men", "The plural noun for adult human males — included in GAD because gender equality requires working with everyone, not only women."],
  ["misogyny", "The hatred of, contempt for, or prejudice against women or girls — the extreme end of the spectrum that begins with stereotypes and bias."],
  ["modelling", "Demonstrating a behavior so that others learn by observing it. Children model the gender roles they see at home, which is why role models matter in GAD."],
  ["opportunity", "A favorable time, occasion, or combination of circumstances that makes it possible to achieve a goal, do something desired, or advance oneself."],
  ["oppression", "Prolonged, unjust treatment or control of a group, carried out through power and systems rather than a single act."],
  ["pansexual", "A sexual orientation in which a person is attracted to others regardless of gender identity or biological sex."],
  ["peace", "The state of harmony, tranquility, and freedom from hostility, violence, or disturbance."],
  ["policy", "A deliberate plan, set of principles, or official guide chosen by a government, business, or organization to direct decisions and achieve specific goals."],
  ["power", "The capacity or ability to influence, shape, or control the behavior of individuals, groups, or institutions."],
  ["privilege", "A special right, advantage, immunity, or benefit granted to a specific person or group while excluded from others."],
  ["protection", "The act of keeping someone or something safe from harm, damage, loss, or danger, or the state of being kept safe."],
  ["psychosocial", "The interplay between a person's mind and their social surroundings. Psychosocial support addresses both, which matters for survivors of abuse and violence."],
  ["recognition", "Identifying something or someone you have seen before, or giving official credit, approval, or status to a person, group, or nation."],
  ["representation", "The act of standing for, portraying, or acting on behalf of someone or something else — and the presence of a group's voice in decision-making."],
  ["respect", "A positive feeling, high regard, or deferential action shown toward a person, animal, rule, or environment."],
  ["responsibility", "The duty or obligation to deal with tasks, make independent decisions, and accept accountability for the consequences of one's actions."],
  ["rights", "The fundamental normative rules, entitlements, or freedoms that are allowed or owed to people within legal systems."],
  ["roles", "A part you play, a job you do, or a set of expected behaviors in a specific situation — the \"roles\" in gender roles are learned, not inborn."],
  ["safety", "The state of being protected from harm, danger, or injury — the promise behind the Safe Spaces Act."],
  ["security", "The protection of persons, property, systems, and data from harm, threat, or unauthorized change."],
  ["sex", "The biological characteristics present at birth — reproductive organs, hormones, and chromosomes — as distinguished from Gender, which is socially learned."],
  ["sexes", "The biological differences between individuals, commonly classified as male and female, based on characteristics such as reproductive organs, hormones, and chromosomes."],
  ["stereotype", "An oversimplified, widely held idea about what a group of people is like — such as \"women are nurturing\" or \"men don't cry\"."],
  ["strength", "The collective power that a group possesses to withstand internal and external pressures."],
  ["struggle", "A strong, difficult effort to do, achieve, or deal with something hard, or fighting against an obstacle or opponent."],
  ["support", "Assistance given to someone so they can cope, recover, or move forward — practical, emotional, or legal."],
  ["violence", "Behavior involving force or intimidation intended to hurt someone. Under RA 9262, violence against women and children includes physical, sexual, psychological, and economic abuse."],
  ["voice", "An expression of opinion, or the right to express your opinion."],
  ["wellbeing", "A multi-dimensional state of being healthy, happy, and balanced, extending far beyond the mere absence of disease or illness."],
  ["women", "Woman — an adult female human being. Often the focus of GAD programs because of documented historical disadvantage."],
];

const PROGRESSIVE_TABLE = [
  ["allocated", "Set aside for a specific purpose. GAD budgeting requires that a portion of every agency's funds be allocated to gender and development programs.", "", ["allocated_1.jpg", "allocated_2.png", "allocated_3.jpg", "allocated_4.jpg"]],
  ["behavior", "How a person acts. Gender is not a set of fixed behaviors but a learned pattern of behavior that society attaches to sex."],
  ["biological", "Relating to the body and its physical processes. Biological sex differs from gender, which is social rather than biological.", "", ["biological_1.png", "biological_2.jpg", "biological_3.jpg", "biological_4.jpg"]],
  ["disparity", "A noticeable and often unfair difference. Gender disparity describes the gap between men and women in pay, opportunity, and power.", "", ["disparity_1.jpg", "disparity_2.jpg", "disparity_3.jpg", "disparity_4.avif"]],
  ["domestic", "Relating to the home and household. Domestic work is unpaid labor, disproportionately done by women and often left out of economic measures.", "", ["domestic_1.jpg", "domestic_2.png", "domestic_3.png", "domestic_4.webp"]],
  ["expectation", "A belief about how someone should behave. Gender expectations are placed on people from birth and can limit what they feel allowed to do.", "", ["expectation_1.webp", "expectation_2.jpg", "expectation_3.png", "expectation_4.jpg"]],
  ["governance", "The way decisions are made and authority is exercised. Gender-responsive governance means women take part in the decisions that affect them.", "", ["governance_1.png", "governance_2.png", "governance_3.jpg", "governance_4.jpg"]],
  ["institution", "An established organization or system — a school, a church, a company. Institutions are where gender norms are often formalized and enforced.", "", ["institution_1.jpg", "institution_2.jpg", "institution_3.jpg", "institution_4.png"]],
  ["intersectionality", "The idea that overlapping identities — gender, class, race, disability — combine to create distinct experiences of disadvantage that a single lens misses.", "", ["intersectionality_1.webp", "intersectionality_2.jpg", "intersectionality_3.png", "intersectionality_4.webp"]],
  ["language", "The words and expressions a society uses. Language shapes perception, which is why sexist language is treated as part of gender discrimination."],
  ["mainstreaming", "Gender and Development mainstreaming: building a gender perspective into every policy, program, and budget rather than adding a separate women's project.", "", ["mainstreaming_1.webp", "mainstreaming_2.png", "mainstreaming_3.jpg", "mainstreaming_4.png"]],
  ["marginalized", "Pushed to the edges of society and denied equal access to resources, voice, or opportunity."],
  ["orientation", "Sexual orientation — the pattern of emotional, romantic, or sexual attraction a person feels, such as heterosexual, homosexual, or bisexual.", "", ["orientation_1.jpg", "orientation_2.webp", "orientation_3.webp", "orientation_4.jpg"]],
  ["perspective", "A particular way of looking at things. A gender perspective asks whose experience is being counted and whose is being left out.", "", ["perspective_1.jpg", "perspective_2.jpg", "perspective_3.webp", "perspective_4.jpg"]],
  ["provisions", "The specific clauses of a law. GAD provisions spell out what government agencies must actually do, not merely what they must value.", "", ["provisions_1.jpg", "provisions_2.jpg", "provisions_3.webp", "provisions_4.png"]],
  ["reproductive", "Relating to reproduction. Reproductive health rights cover a person's ability to decide whether, when, and how many children to have."],
  ["responsiveness", "Being attentive and answerable to needs. Gender responsiveness means policies are designed around the actual needs of both women and men.", "", ["responsiveness_1.jpg", "responsiveness_2.webp", "responsiveness_3.jpg", "responsiveness_4.avif"]],
  ["segregation", "The enforced separation of groups. Occupational segregation — men in construction, women in care work — is a major cause of the wage gap.", "", ["segregation_1.webp", "segregation_2.webp", "segregation_3.jpg", "segregation_4.jpg"]],
  ["sensitivity", "Awareness of and attention to the needs of others. Gender sensitivity training is the starting point of most GAD programs.", "", ["sensitivity_1.jpg", "sensitivity_2.webp", "sensitivity_3.jpg", "sensitivity_4.webp"]],
  ["socialization", "The lifelong process of learning the norms of a society. Gender roles are not inborn — they are learned through socialization.", "", ["socialization_1.jpg", "socialization_2.jpg", "socialization_3.jpg", "socialization_4.webp"]],
  ["stereotype", "An oversimplified, widely held idea about what a group of people is like — such as \"women are nurturing\" or \"men don't cry\".", "", ["stereotype_1.jpg", "stereotype_2.webp", "stereotype_3.webp", "stereotype_4.jpg"]],
  ["stigma", "A mark of social disgrace. Stigma silences survivors of abuse and keeps people from seeking help, which is why it is a barrier to protection.", "", ["stigma_1.webp", "stigma_2.jpg", "stigma_3.webp", "stigma_4.jpg"]],
  ["strategic", "Planned to reach a long-term goal. Strategic gender interests target the structures of inequality themselves, not just their symptoms.", "", ["strategic_1.jpg", "strategic_2.jpg", "strategic_3.jpg", "strategic_4.webp"]],
  ["structural", "Relating to the underlying system rather than individual acts. Structural discrimination is built into institutions, so it persists even when no one intends it.", "", ["structural_1.jpg", "structural_2.webp", "structural_3.webp", "structural_4.jpg"]],
  ["systemic", "Spreading throughout a whole system. Systemic bias means the problem is not a few bad actors but how the entire system is arranged."],
];

/**
 * Where a question's images do not follow <id>_<n>.jpg, list the files exactly:
 *   ["magnacarta_1.jpg", "magnacarta_2.jpg", ...]
 * Paths are built relative to the question's folder, so a folder whose name and
 * file names differ (magnacarta_* inside magna-carta/) still resolves.
 */
function pics(id, { mode = "normal", ext = "jpg", files } = {}) {
  if (files) return files.map(file => `assets/images/${mode}/${id}/${file}`);

  return Array.from({ length: 4 }, (_, i) => {
    const pictureNumber = i + 1;
    return `assets/images/${mode}/${id}/${id}_${pictureNumber}.${ext}`;
  });
}

function makeQuestion({ id, mode = "normal", answer = id.replaceAll("-", "").toUpperCase(), display = id.replaceAll("-", " ").toUpperCase(), ext, files, trivia = "" }) {
  return {
    id,
    mode,
    answer,
    display,
    trivia,
    images: pics(id, { mode, ext, files })
  };
}

// literal mode strings: questions.js is imported by data.js, so reading MODES
// here would hit a temporal-dead-zone cycle error
const buildPool = (table, mode) =>
  table.map(([id, trivia = "", ext, files]) => makeQuestion({ id, mode, trivia, ext, files }));

export const EASY_QUESTIONS = buildPool(EASY_TABLE, "normal");
export const HARD_QUESTIONS = buildPool(PROGRESSIVE_TABLE, "progressive");

export const QUESTIONS_POOL = {
  normal: EASY_QUESTIONS,
  progressive: HARD_QUESTIONS
};

export const ALL_QUESTIONS_IMAGES = [
  ...EASY_QUESTIONS,
  ...HARD_QUESTIONS
].flatMap(q => q.images);
