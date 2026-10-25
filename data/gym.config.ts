/**
 * SINGLE SOURCE OF TRUTH for all business content.
 * Everything marked PLACEHOLDER must be replaced with real data before launch.
 */

export type ThemeName = "lime" | "red" | "grey";
export type Billing = "monthly" | "quarterly" | "halfYearly" | "yearly";

export const gym = {
  // ---- Theme: change this ONE line to switch the whole site ("lime" | "red" | "grey") ----
  theme: "lime" as ThemeName,

  // ---- Identity (PLACEHOLDER) ----
  name: "Prime Form",
  nameAccent: "Fitness", // second word shown in accent colour in the logo
  tagline: "Train hard. Stay consistent. See real progress.",
  description:
    "A premium strength and conditioning gym with expert coaches, modern equipment and programs for every goal.",
  // Origin only (no path). Default is the custom domain on GitHub Pages; change it if the domain changes.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://gym3d.skylinewebx.com",
  // Formspree form ID (formspree.io, free). Leave empty to use the WhatsApp + email fallback.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "",

  // ---- Contact (PLACEHOLDER) ----
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // digits only, with country code
  email: "hello@example-gym.com",
  address: {
    street: "Plot 12, Main Road",
    area: "Sample Nagar",
    city: "Pune",
    state: "Maharashtra",
    postalCode: "411001",
    country: "IN",
  },
  geo: { lat: 18.5204, lng: 73.8567 },
  // Replace with the embed URL from Google Maps > Share > Embed a map.
  mapEmbedUrl: "https://www.google.com/maps?q=18.5204,73.8567&z=15&output=embed",
  mapLink: "https://www.google.com/maps?q=18.5204,73.8567",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },

  // ---- Timings (PLACEHOLDER) ----
  timezone: "Asia/Kolkata",
  hours: {
    // 0 = Sunday ... 6 = Saturday. 24h "HH:MM".
    open: { 0: ["07:00", "12:00"], 1: ["05:30", "22:30"], 2: ["05:30", "22:30"], 3: ["05:30", "22:30"], 4: ["05:30", "22:30"], 5: ["05:30", "22:30"], 6: ["05:30", "22:30"] } as Record<number, [string, string]>,
    monSat: "5:30 AM – 10:30 PM",
    sunday: "7:00 AM – 12:00 PM",
  },
  batches: [
    { name: "Morning", time: "5:30 AM – 11:00 AM", note: "Quiet floor, best for early risers" },
    { name: "Afternoon", time: "11:00 AM – 4:00 PM", note: "Lowest crowd, full equipment access" },
    { name: "Evening", time: "4:00 PM – 10:30 PM", note: "Peak hours, group classes run here" },
    { name: "Women-only", time: "10:00 AM – 12:00 PM", note: "Female trainer on the floor" },
  ],
  classes: [
    { day: "Mon / Wed / Fri", name: "Zumba", time: "7:00 AM · 6:30 PM" },
    { day: "Tue / Thu / Sat", name: "Yoga", time: "6:30 AM · 6:00 PM" },
    { day: "Mon – Sat", name: "Functional Training", time: "7:30 AM · 7:30 PM" },
  ],

  // ---- Headline proof (PLACEHOLDER numbers; do not claim rankings unless verified) ----
  googleRating: null as number | null, // e.g. 4.8. Hidden while null.
  stats: [
    { value: 500, suffix: "+", label: "Active members" },
    { value: 8, suffix: "", label: "Certified trainers" },
    { value: 60, suffix: "+", label: "Machines & stations" },
    { value: 6, suffix: "", label: "Years of experience" },
  ],

  marquee: ["No shortcuts", "Just work", "Real progress", "Stronger together", "Show up daily"],

  // ---- Programs ----
  programs: [
    { title: "Cardio", text: "Treadmills, bikes and rowers to build stamina and burn fat.", image: "/images/programs/cardio.jpg" },
    { title: "Strength Training", text: "Free weights and racks for size, power and joint health.", image: "/images/programs/strength.jpg" },
    { title: "Cardio + Strength", text: "Hybrid plans that balance fat loss with muscle.", image: "/images/programs/hybrid.jpg" },
    { title: "Functional / Conditioning", text: "Movement-based circuits for everyday athleticism.", image: "/images/programs/functional.jpg" },
    { title: "Weight Loss", text: "Structured training and nutrition for steady fat loss.", image: "/images/programs/weight-loss.jpg" },
    { title: "Muscle Gain", text: "Progressive overload programs with diet guidance.", image: "/images/programs/muscle-gain.jpg" },
    { title: "Yoga & Zumba", text: "Group classes for mobility, rhythm and recovery.", image: "/images/programs/yoga-zumba.jpg" },
    { title: "Personal Training", text: "One-to-one coaching built around your goal.", image: "/images/programs/personal-training.jpg" },
  ],

  moreThanGym: {
    image: "/images/facilities/floor-wide.jpg",
    points: [
      { title: "Coaches who correct your form", text: "Trainers walk the floor and fix technique before habits set in." },
      { title: "Equipment that is maintained", text: "Machines are serviced on a schedule and the floor is cleaned daily." },
      { title: "Plans that fit your life", text: "Pick a batch, a goal and a plan. We adjust as you progress." },
    ],
  },

  // Captions and "fact" chips are PLACEHOLDERS: replace with your real equipment counts and specs.
  gallery: [
    { src: "/images/facilities/cardio.jpg", alt: "Cardio zone with treadmills and bikes", zone: "Cardio Zone", title: "Cardio Zone", desc: "Treadmills, cross-trainers and bikes with a clear view of the whole floor.", fact: "20+ cardio stations" },
    { src: "/images/facilities/strength.jpg", alt: "Strength zone with racks and benches", zone: "Strength Zone", title: "Strength Zone", desc: "Power racks, benches and platforms built for heavy, safe training.", fact: "6 power racks" },
    { src: "/images/facilities/dumbbells.jpg", alt: "Dumbbell and free weights rack", zone: "Dumbbells / Free Weights", title: "Free Weights", desc: "A full dumbbell rack with mirrors for clean form checks.", fact: "Dumbbells up to 50 kg" },
    { src: "/images/facilities/machines.jpg", alt: "Selectorised strength machines", zone: "Machines", title: "Machines", desc: "Selectorised machines covering every major muscle group.", fact: "30+ machines" },
    { src: "/images/facilities/functional.jpg", alt: "Functional training area", zone: "Functional Area", title: "Functional Area", desc: "Turf, sled, rig and plyo boxes for conditioning work.", fact: "Turf + sled lane" },
    { src: "/images/facilities/lockers.jpg", alt: "Locker and changing room", zone: "Locker/Changing", title: "Lockers & Changing", desc: "Clean, secure lockers and a comfortable changing area.", fact: "Secure lockers" },
    { src: "/images/facilities/reception.jpg", alt: "Reception desk", zone: "Reception", title: "Reception", desc: "A friendly front desk for memberships, trials and questions.", fact: "Open 7 days" },
  ],

  featureVisual: {
    image: "/images/brand/3d-render.jpg",
    title: "Train in a space built for results",
    text: "Open floor plan, honest lighting and equipment placed so you never wait for a rack.",
  },

  // ---- Trainers (PLACEHOLDER people; replace with real staff) ----
  trainers: [
    { name: "Arjun Mehta", role: "Head Strength Coach", experience: "9 years", certs: "Add certification", bio: "Builds strength and muscle programs for beginners through competitive lifters.", image: "/images/trainers/trainer-1.jpg" },
    { name: "Priya Nair", role: "Weight Loss & Nutrition", experience: "6 years", certs: "Add certification", bio: "Combines training and simple diet plans for lasting fat loss.", image: "/images/trainers/trainer-2.jpg" },
    { name: "Rohan Desai", role: "Functional Training", experience: "7 years", certs: "Add certification", bio: "Leads conditioning circuits focused on mobility and endurance.", image: "/images/trainers/trainer-3.jpg" },
    { name: "Sneha Kulkarni", role: "Yoga & Zumba", experience: "5 years", certs: "Add certification", bio: "Runs group classes that improve flexibility, rhythm and recovery.", image: "/images/trainers/trainer-4.jpg" },
  ],

  // ---- Pricing (PLACEHOLDER numbers, INR, excluding 5% GST). Verify against local competitors. ----
  billingLabels: { monthly: "Monthly", quarterly: "Quarterly", halfYearly: "Half-Yearly", yearly: "Yearly" } as Record<Billing, string>,
  plans: [
    {
      id: "basic", name: "Basic", blurb: "Cardio and strength floor access.", highlight: false,
      price: { monthly: 1500, quarterly: 4000, halfYearly: 7000, yearly: 12000 } as Record<Billing, number>,
      features: ["Cardio + strength floor", "Basic workout plan", "Open gym hours"],
    },
    {
      id: "standard", name: "Standard", blurb: "Everything in Basic plus classes and a locker.", highlight: true, badge: "Most Popular",
      price: { monthly: 2200, quarterly: 6000, halfYearly: 10500, yearly: 18000 } as Record<Billing, number>,
      features: ["Everything in Basic", "Group classes (Zumba, Yoga, Functional)", "Locker included"],
    },
    {
      id: "premium", name: "Premium", blurb: "Full access with recovery and coaching.", highlight: false,
      price: { monthly: 3500, quarterly: 9500, halfYearly: 17000, yearly: 30000 } as Record<Billing, number>,
      features: ["Everything in Standard", "Sauna / steam", "Personalised diet plan", "2 PT sessions per month"],
    },
  ],
  registrationFee: { amount: 1000, waivedOn: "yearly" as Billing },
  gstNote: "Prices exclude 5% GST.",
  personalTraining: [
    { name: "PT · 12 sessions", price: 9000, note: "Valid for 6 weeks" },
    { name: "PT · 24 sessions", price: 16000, note: "Valid for 12 weeks" },
  ],
  offers: [
    { name: "Couple", text: "Join together and save on both memberships." },
    { name: "Student", text: "Discounted rate with a valid student ID." },
    { name: "Family", text: "Three or more family members, one shared plan." },
    { name: "Corporate", text: "Group rates for teams. Contact us for a quote." },
  ],

  // ---- Form options ----
  batchOptions: ["Morning", "Afternoon", "Evening", "Women-only"],
  goals: ["Weight loss", "Muscle gain", "General fitness", "Sports", "Other"],

  // Set true ONLY after replacing the samples below with real, permitted member quotes. Until then the section is hidden in production.
  testimonialsVerified: false,
  testimonials: [
    // SAMPLE content: replace with real member quotes (with permission) before launch.
    { quote: "Sample testimonial. Replace this with a real member quote describing their experience and result.", name: "Member Name", result: "Result / duration", rating: 5 },
    { quote: "Sample testimonial. Replace with a real quote.", name: "Member Name", result: "Result / duration", rating: 5 },
    { quote: "Sample testimonial. Replace with a real quote.", name: "Member Name", result: "Result / duration", rating: 5 },
  ],

  faqs: [
    { q: "Can I try the gym before joining?", a: "Yes. Book a free trial using the form and we will confirm a time with you." },
    { q: "Do I need to bring anything?", a: "Bring a towel, water and training shoes. Lockers are available on Standard and Premium." },
    { q: "Are the prices final?", a: "Listed prices exclude 5% GST. A one-time registration fee applies and is waived on yearly plans." },
    { q: "Do you have a women-only batch?", a: "Yes, with a female trainer on the floor. See the timings section for the schedule." },
    { q: "Can I freeze or transfer my membership?", a: "Ask at the front desk. Policies depend on your plan length." },
    { q: "Do you offer personal training?", a: "Yes. 12 and 24 session packages are available, or add 2 sessions a month with Premium." },
  ],

  assets: {
    logo: "/images/brand/logo.svg",
    heroPoster: "/images/brand/hero-poster.jpg",
    og: "/images/brand/og.jpg",
  },
};

export type Gym = typeof gym;
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
