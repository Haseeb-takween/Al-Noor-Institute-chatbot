/* ============================================================
   Al-Noor Institute — site content
   All facts sourced from the official Knowledge Base.
   ============================================================ */

export const institute = {
  name: "Al-Noor Institute",
  tagline: "Online Islamic education, taught with care",
  type: "UK-based online Islamic education provider",
  email: "info@alnoorinstitute.co.uk",
  phone: "0800 123 4567",
  phoneHours: "Mon–Fri, 9am–5pm UK time",
  website: "www.alnoorinstitute.co.uk",
  languages: "English (primary), with Urdu on some courses",
};

export type IconKey =
  | "quran"
  | "arabic"
  | "studies"
  | "seerah"
  | "hifz"
  | "trial"
  | "class-size"
  | "teacher"
  | "schedule"
  | "shield"
  | "family"
  | "device"
  | "refund"
  | "chat";

export interface Course {
  id: string;
  icon: IconKey;
  name: string;
  arabic?: string;
  blurb: string;
  duration: string;
  price: string;
  level: string;
  highlights: string[];
}

export const courses: Course[] = [
  {
    id: "quran",
    icon: "quran",
    name: "Quran Recitation & Tajweed",
    arabic: "التجويد",
    blurb:
      "Read the Quran beautifully and correctly. Rules of Tajweed taught step by step by Ijazah-holding teachers.",
    duration: "12 weeks",
    price: "£30 / month",
    level: "Beginner → Advanced",
    highlights: ["45-minute sessions", "Ijazah-qualified teachers", "Weekly materials included"],
  },
  {
    id: "arabic",
    icon: "arabic",
    name: "Arabic Language",
    arabic: "اللغة العربية",
    blurb:
      "Build real fluency — reading, writing and understanding — across structured levels from complete beginner upward.",
    duration: "6 months per level",
    price: "£40 / month",
    level: "Beginner → Advanced",
    highlights: ["Advanced classes run 60 mins", "Degree-qualified teachers", "Level assessment at start"],
  },
  {
    id: "islamic-studies",
    icon: "studies",
    name: "Islamic Studies",
    arabic: "الدراسات الإسلامية",
    blurb:
      "A rolling programme covering the essentials of the faith, delivered clearly and at a pace that suits you.",
    duration: "Ongoing rolling programme",
    price: "£25 / month",
    level: "All levels",
    highlights: ["Join any time", "45-minute sessions", "Adults & children welcome"],
  },
  {
    id: "seerah",
    icon: "seerah",
    name: "Seerah — Life of the Prophet ﷺ",
    arabic: "السيرة",
    blurb:
      "A focused ten-week journey through the life of the Prophet ﷺ, with fixed start dates through the year.",
    duration: "10-week course",
    price: "£60 full course",
    level: "All levels",
    highlights: ["Fixed start dates", "Structured curriculum", "45-minute sessions"],
  },
  {
    id: "hifz",
    icon: "hifz",
    name: "Hifz (Memorisation) Support",
    arabic: "الحفظ",
    blurb:
      "Personalised memorisation support that moves at your pace, with focused shorter sessions to build consistency.",
    duration: "Ongoing — by progress",
    price: "£50 / month",
    level: "Individual pace",
    highlights: ["30-minute focused sessions", "Progress-based plan", "One-to-one available"],
  },
];

export interface Feature {
  icon: IconKey;
  title: string;
  body: string;
}

export const features: Feature[] = [
  {
    icon: "trial",
    title: "One free trial class",
    body: "Every new student gets a free trial before enrolling — experience the teaching before you commit to anything.",
  },
  {
    icon: "class-size",
    title: "Small groups, max six",
    body: "Group classes are capped at six students so every learner is seen and heard. One-to-one is available too.",
  },
  {
    icon: "teacher",
    title: "Qualified teachers",
    body: "Quran & Tajweed teachers hold an Ijazah; Arabic teachers hold relevant degrees. All are background-checked.",
  },
  {
    icon: "schedule",
    title: "Flexible, seven days a week",
    body: "Morning, evening and weekend slots across UK time — fit your learning around work, school and family.",
  },
  {
    icon: "family",
    title: "Family & advance discounts",
    body: "Save 10% when two or more family members enrol together, or 15% by paying three months in advance.",
  },
  {
    icon: "device",
    title: "Learn from any device",
    body: "Classes run on Zoom — join from a laptop, tablet or phone with a camera, mic and a stable connection.",
  },
];

export interface Step {
  n: string;
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    n: "01",
    title: "Choose your course",
    body: "Pick a programme and a time slot on the website. Not sure of your level? Teachers assess it at the start.",
  },
  {
    n: "02",
    title: "Book a free trial",
    body: "Try one free class with no obligation — bookable online or by phone — to make sure it's the right fit.",
  },
  {
    n: "03",
    title: "Complete enrolment",
    body: "Register in about five minutes. A confirmation email arrives within 24 hours on working days.",
  },
  {
    n: "04",
    title: "Meet your teacher",
    body: "Your teacher arranges your first session and shares joining details before class. Then you begin.",
  },
];

export interface TeacherPoint {
  icon: IconKey;
  title: string;
  body: string;
}

export const qualityPoints: TeacherPoint[] = [
  {
    icon: "shield",
    title: "Vetted & qualified",
    body: "Every teacher holds formal qualifications and passes background checks before joining Al-Noor.",
  },
  {
    icon: "teacher",
    title: "Your preference matters",
    body: "State a preference for a male or female teacher at enrolment — we'll do our best to accommodate it.",
  },
  {
    icon: "chat",
    title: "Reviewed & accountable",
    body: "Teachers are assessed before joining and reviewed regularly, with a student feedback system in place.",
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "5", label: "Structured programmes" },
  { value: "7", label: "Days a week" },
  { value: "6", label: "Max students per class" },
  { value: "Free", label: "Trial class for all" },
];

export const discounts = [
  { label: "Family discount", value: "10%", note: "Two or more family members enrolling together" },
  { label: "Advance payment", value: "15%", note: "When you pay three months in advance" },
  { label: "Registration fee", value: "£0", note: "No sign-up fee — only the course fee itself" },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Is there a course for complete beginners?",
    a: "Yes. Every programme has beginner levels and no prior knowledge is needed. Teachers assess your level at the start and place you in the right group.",
  },
  {
    q: "Do you offer classes for children?",
    a: "Yes, for children aged 5 and above, taught by teachers experienced with young learners. A parent or guardian must be present for children under 10.",
  },
  {
    q: "How do the classes work?",
    a: "Classes are delivered online via Zoom. You'll need a device with a camera and microphone and a stable internet connection. Joining instructions are sent before your first class.",
  },
  {
    q: "What is your refund policy?",
    a: "A full refund is available if you cancel within 7 days of enrolment. After 7 days there's no refund for the current month, but you can cancel future months any time with no penalty.",
  },
  {
    q: "Can I have one-to-one classes?",
    a: "Yes, for all subjects, at double the group rate. Contact Al-Noor to arrange it.",
  },
  {
    q: "What happens if I miss a class?",
    a: "With 24 hours' notice, a makeup session is arranged at no extra charge. Without notice, a makeup isn't guaranteed but will be attempted where possible.",
  },
  {
    q: "Can I choose or change my teacher?",
    a: "You can state a preference for a male or female teacher at enrolment. If you're ever not happy with your teacher, contact Al-Noor and a change will be arranged.",
  },
  {
    q: "Do classes run during school holidays?",
    a: "Yes, throughout the year including UK school holidays. Some teachers may take limited time off during major holidays, with advance notice given.",
  },
];

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Fees", href: "/#fees" },
  { label: "Teachers", href: "/#teachers" },
  { label: "Contact", href: "/#contact" },
];

export const schedule = [
  { period: "Mornings", time: "7am – 12pm", note: "UK time, every day" },
  { period: "Evenings", time: "5pm – 9pm", note: "UK time, every day" },
  { period: "Weekends", time: "9am – 6pm", note: "UK time, Sat & Sun" },
];

/** Suggested prompts shown in the chat widget's empty state. */
export const chatSuggestions = [
  "What courses do you offer?",
  "How much is the Quran course?",
  "Do you have classes for children?",
  "How do I book a free trial?",
];
