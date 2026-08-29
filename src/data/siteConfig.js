/**
 * ═══════════════════════════════════════════════════════════════
 *  OUR SPACE — SITE CONFIGURATION
 *  Single source of truth. Edit this file to customize everything.
 *  You should never need to touch HTML or JS to change content.
 * ═══════════════════════════════════════════════════════════════
 */

const CONFIG = {

  // ─── Names ───────────────────────────────────────────────────
  myName: "Yasir",
  herName: "Janhavi",
  myNickname: "Yasir",
  herNickname: "Janu",

  // ─── Relationship ────────────────────────────────────────────
  // Format: "YYYY-MM-DDTHH:mm:ss" — the counter starts from this moment
  relationshipStart: "2026-01-14T00:00:00",

  // ─── SEO & Meta (keep vague for privacy — no real names by default) ──
  siteTitle: "Our Little Universe",
  siteDescription: "A private corner of the internet, built with love.",
  ogImage: "", // path to an OG image if you want link previews

  // ─── Ambient Audio ───────────────────────────────────────────
  // Drop a soft instrumental or ambient track here (muted by default)
  ambientTrack: "assets/audio/ambient.mp3",

  // ─── Hero Section ────────────────────────────────────────────
  hero: {
    line1: "To the girl who became my favorite part of life.",
    line2: "Welcome to our little universe.",
    cta: "Enter our story ↓",
  },

  // ─── Our Universe (Home) ─────────────────────────────────────
  universe: {
    photo: "assets/images/pic1.jpeg",
    message: `Some people search their whole lives for what I found the day 
I met you. This little corner of the internet exists because you deserve 
a world — even a small, digital one — that's entirely about you.`,
  },

  // ─── Our Story (Timeline) ───────────────────────────────────
  timeline: [
    {
      date: "Jan 14, 2026",
      title: "The day we started dating",
      description: "There are ordinary days, and then there are the ones that quietly rewrite your story. The day we started dating was one of the latter.",
      photo: "assets/images/pic1.jpeg",
      location: "",
      song: "",
    },
    {
      date: "April 2025",
      title: "The Moment I Knew",
      description: "It wasn't a grand gesture or a dramatic scene. It was a small, quiet moment when I realised — you're different. You're someone I want to know better, always.",
      photo: "assets/images/image-3.jpeg",
      location: "",
      song: "",
    },
    {
      date: "2025",
      title: "Memories That Stay Forever",
      description: "Not every memory needs a photograph. Some are pressed gently into the heart — the laugh, the conversation, the comfortable silences. Those moments live with me.",
      photo: "assets/images/image-5.jpeg",
      location: "",
      song: "",
    },
    {
      date: "Always",
      title: "The Little Things About You",
      description: "The way your eyes light up when you talk about things you love. The warmth in your voice. The kindness you carry effortlessly. It's always the little things that say the most.",
      photo: "assets/images/image-7.jpeg",
      location: "",
      song: "",
    },
  ],

  // ─── Memories (Gallery) ─────────────────────────────────────
  // Extended format: each memory can have tags, a longer story,
  // a location with coordinates (for the map), and extra media.
  memories: [
    {
      src: "assets/images/image-2.jpeg",
      caption: "Those eyes that hold a whole universe.",
      story: "",
      date: "",
      tags: ["favorites"],
      location: null, // { name: "City", lat: 0, lng: 0 }
      media: [],
    },
    {
      src: "assets/images/image-3.jpeg",
      caption: "A smile that lights up my whole world.",
      story: "",
      date: "",
      tags: ["favorites"],
      location: null,
      media: [],
    },
    {
      src: "assets/images/image-4.jpeg",
      caption: "Cool without even trying — always.",
      story: "",
      date: "",
      tags: ["everyday"],
      location: null,
      media: [],
    },
    {
      src: "assets/images/image-5.jpeg",
      caption: "Effortlessly elegant, always.",
      story: "",
      date: "",
      tags: ["everyday"],
      location: null,
      media: [],
    },
    {
      src: "assets/images/image-7.jpeg",
      caption: "That energy that fills the room.",
      story: "",
      date: "",
      tags: ["favorites"],
      location: null,
      media: [],
    },
    {
      src: "assets/images/image-8.jpeg",
      caption: "Home feels wherever she is.",
      story: "",
      date: "",
      tags: ["everyday"],
      location: null,
      media: [],
    },
    {
      src: "assets/images/image-9.jpeg",
      caption: "Just being herself — and that's everything.",
      story: "",
      date: "",
      tags: ["everyday"],
      location: null,
      media: [],
    },
    {
      src: "assets/images/image-10.jpeg",
      caption: "Dark and beautiful, just like the night sky.",
      story: "",
      date: "",
      tags: ["favorites"],
      location: null,
      media: [],
    },
  ],

  // ─── Memory Tags (define available filter categories) ───────
  memoryTags: [
    { id: "all", label: "All" },
    { id: "favorites", label: "♡ Favorites" },
    { id: "trips", label: "Trips" },
    { id: "anniversaries", label: "Anniversaries" },
    { id: "everyday", label: "Everyday" },
  ],

  // ─── Reasons I Love You ─────────────────────────────────────
  reasons: [
    "Your smile — the kind that brightens even my darkest days.",
    "Your kindness — so pure, it makes the world feel softer.",
    "Your eyes — where I find comfort, peace, and a home.",
    "Your laugh — a melody my heart never gets tired of hearing.",
    "The way you understand me — even the things I never say.",
    "The light you carry — you make everything around you shine.",
    "The way you exist — effortlessly beautiful, inside and out.",
    "The love you bring — turning my life into something magical.",
    "Your voice — a calm I never knew I needed.",
    "The courage you carry so quietly, it looks like grace.",
    "How you make ordinary moments feel like something worth remembering.",
    "Because you chose to stay — and that means everything.",
  ],

  // ─── Our Songs ──────────────────────────────────────────────
  songs: [
    {
      title: "Dildaara",
      artist: "Shafqat Amanat Ali",
      cover: "", // path to album art
      note: "The first song that made me think of you.",
      audioSrc: "", // path to a legally provided audio preview
    },
    // Add more songs here:
    // {
    //   title: "Song Name",
    //   artist: "Artist",
    //   cover: "assets/images/album-cover.jpg",
    //   note: "Why this song matters.",
    //   audioSrc: "assets/audio/preview.mp3",
    // },
  ],

  // ─── Letters ────────────────────────────────────────────────
  letters: [
    {
      label: "For when you doubt yourself",
      salutation: "My dearest Janhavi,",
      lines: [
        "I know there are days when the world feels too heavy,",
        "when you wonder if you're doing enough, being enough.",
        "",
        "But let me tell you something —",
        "you are more than enough. You always have been.",
        "",
        "The strength you carry so quietly,",
        "the way you keep going even when it's hard,",
        "that's not ordinary. That's extraordinary.",
        "",
        "So on the days you forget your own magic,",
        "come back here.",
        "I'll remind you.",
        "",
        "— Forever in your corner ❤️",
      ],
    },
    {
      label: "For sad days",
      salutation: "Hey, beautiful,",
      lines: [
        "I know today is hard.",
        "I can't always be there to hold your hand,",
        "but I need you to know —",
        "",
        "You are never alone.",
        "",
        "Even on the heaviest days,",
        "someone out here thinks you're the most incredible person",
        "to ever exist.",
        "",
        "Let yourself feel what you need to feel.",
        "Then take a breath.",
        "And know that tomorrow will be a little lighter.",
        "",
        "I love you. Today, tomorrow, always.",
        "",
        "— Yours ❤️",
      ],
    },
    {
      label: "For when you miss me",
      salutation: "My love,",
      lines: [
        "If you're reading this, maybe the distance feels heavy right now.",
        "",
        "Close your eyes for a moment.",
        "Think of the last time we laughed together,",
        "the last time everything felt perfectly right.",
        "",
        "That feeling? It never goes away.",
        "It lives in every message, every memory,",
        "every quiet thought of you before I fall asleep.",
        "",
        "Until we're together again —",
        "carry this letter like a little piece of me.",
        "",
        "— Counting the moments ❤️",
      ],
    },
  ],

  // ─── Our Future ─────────────────────────────────────────────
  future: {
    places: [
      { title: "Watch the Northern Lights", description: "Under the Arctic sky, wrapped in blankets and wonder." },
      { title: "A Quiet Beach Somewhere", description: "No plans, no clocks — just waves and each other." },
      { title: "Paris at Night", description: "Because some clichés exist for a reason." },
    ],
    dreams: [
      { title: "Build Our Home", description: "A place that smells like coffee and feels like us." },
      { title: "Grow Old Together", description: "Still making each other laugh at 80." },
    ],
    promises: [
      { title: "I'll Always Listen", description: "Even when the words are hard to find." },
      { title: "I'll Choose You", description: "Every morning. Every argument. Every quiet evening." },
      { title: "I'll Never Stop Trying", description: "To be the person you deserve." },
    ],
    goals: [
      { title: "Travel the World Together", description: "One stamp at a time, one story at a time." },
      { title: "Learn to Cook Your Favorite Meal", description: "And eventually get it right." },
    ],
  },

  // ─── Bucket List (checkable, persisted in localStorage) ─────
  bucketList: [
    { id: "bl-1", title: "Watch the sunset in Santorini", category: "travel" },
    { id: "bl-2", title: "Take a road trip with no destination", category: "adventure" },
    { id: "bl-3", title: "Cook a full dinner together", category: "together" },
    { id: "bl-4", title: "Watch the Northern Lights", category: "travel" },
    { id: "bl-5", title: "Write each other a handwritten letter", category: "together" },
    { id: "bl-6", title: "Stargaze on a quiet hill", category: "adventure" },
    { id: "bl-7", title: "Visit Paris at night", category: "travel" },
    { id: "bl-8", title: "Build a blanket fort and watch movies all night", category: "together" },
  ],

  // ─── Countdown ──────────────────────────────────────────────
  countdown: {
    label: "Until our next anniversary",
    date: "2027-03-15T00:00:00",
    emoji: "💕",
  },

  // ─── Future Letters (locked until unlock date) ──────────────
  futureLetters: [
    {
      label: "Open on our 2nd anniversary",
      unlockDate: "2027-03-15",
      salutation: "To us, two years later,",
      lines: [
        "If you're reading this, we made it another year.",
        "And I already know it was beautiful.",
        "",
        "Whatever happened between when I wrote this",
        "and when you opened it —",
        "I hope it made us stronger.",
        "",
        "Here's to many more. 💛",
      ],
    },
    {
      label: "Open on our 3rd anniversary",
      unlockDate: "2028-03-15",
      salutation: "My love, three years in,",
      lines: [
        "Three years.",
        "I wonder what we've built by now.",
        "",
        "I wrote this long before this day,",
        "but I know one thing hasn't changed —",
        "how much I love you.",
        "",
        "Some things are timeless. We're one of them. ❤️",
      ],
    },
  ],

  // ─── Map Settings ───────────────────────────────────────────
  mapCenter: { lat: 20.5937, lng: 78.9629 }, // Default center (India)
  mapZoom: 5,

  // ─── Little Secrets (hidden interactions) ───────────────────
  secrets: {
    // The Konami-style key sequence
    konamiSequence: ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight"],
    konamiMessage: "You found the secret code. Just like you found your way into my heart. 💜",

    // Click-count easter egg — click the footer heart N times
    clickCountTarget: 7,
    clickCountMessage: "7 clicks — one for every day of the week I think about you. So… every day. 💫",

    // Hidden star message — a special star in the particle field
    starMessage: "You're my favorite star in any universe. ✨",
  },

  // ─── Final Section ──────────────────────────────────────────
  closing: {
    line1: "If I had to choose again, I'd still choose you. Every time.",
    names: null, // auto-generated from myName × herName
    line2: "Thank you for being my favorite chapter.",
  },

  // ─── Birthday Section ───────────────────────────────────────
  birthday: {
    intro: "One day wasn't enough to celebrate you.",
    cta: "Open Your Birthday World →",
    href: "birthday/index.html", // relative path to the birthday page
  },
};

// Make CONFIG globally available
if (typeof window !== 'undefined') {
  window.SITE_CONFIG = CONFIG;
}

export default CONFIG;
