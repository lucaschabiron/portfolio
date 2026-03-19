import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.homepageItem.deleteMany();
  await prisma.project.deleteMany();
  await prisma.post.deleteMany();

  // Homepage items
  const homepageItems = [
    { section: "currently", text: "learning japanese (to live in \u{1F1EF}\u{1F1F5})", sortOrder: 0 },
    { section: "currently", text: "looking for new opportunities", sortOrder: 1 },
    { section: "currently", text: "building @sifter", linkKey: "@sifter", linkUrl: "https://sifter-app.com", sortOrder: 2 },
    { section: "past", text: "graduated from \u{1F1EB}\u{1F1F7} engineering school", sortOrder: 0 },
    { section: "past", text: "interned @aprr in france", linkKey: "@aprr", linkUrl: "https://aprr.com", sortOrder: 1 },
    { section: "past", text: "interned @sagau in japan", linkKey: "@sagau", linkUrl: "https://www.saga-u.ac.jp/en/", sortOrder: 2 },
    { section: "random", text: "The Last Day of High School", link: "https://www.youtube.com/watch?v=OZ_Bu4dfeMs", sortOrder: 0 },
    { section: "random", text: "Ghibli 25 Years Concert", link: "https://youtu.be/L4XTJao2iLA?si=Nt4Gatb0jBI_TNAH&t=4928", sortOrder: 1 },
    { section: "random", text: "Frieren: Beyond Journey's End", link: "https://www.youtube.com/watch?v=Iwr1aLEDpe4", sortOrder: 2 },
  ];
  await prisma.homepageItem.createMany({ data: homepageItems });

  // Projects
  const projects = [
    { title: "Sifter", description: "An AI curated newsletter generator", status: "Active", tags: ["Typescript", "AI", "SaaS"], link: "https://sifter-app.com", sortOrder: 0 },
    { title: "LEL text correction", description: "OCR text correction using LLMs (made during my internship at CNRS)", status: "Finished", tags: ["Python", "LLM", "open-source"], link: "https://github.com/lucaschabiron/lel_llm", sortOrder: 1 },
    { title: "speakinjapanese.me", description: "A small web app to practice building Japanese sentences", status: "Active", tags: ["Next.js", "AI", "Language Learning"], link: "https://speakinjapanese.me", sortOrder: 2 },
  ];
  await prisma.project.createMany({ data: projects });

  // Posts
  await prisma.post.create({
    data: {
      slug: "learn-japanese-tool",
      title: "How I built a tool to improve my Japanese writing",
      description: "A small web app to practice building Japanese sentences",
      date: new Date("2025-04-03"),
      content: `I've been studying Japanese for a while, and one thing always slowed me down: I could understand words on the page, but when I tried to actually produce Japanese, everything fell apart. Most apps are great for recognition, not expression. I needed something that forced me to build real sentences, at my level, without pressure.

So I built speakinjapanese.me — a tiny site for myself where I can practice writing Japanese in a way that actually sticks. The idea is simple: the site gives me an English sentence, I translate it, and it returns instant AI feedback with the correct version. A bit of gamification with levels and that's it.

This ended up being way more effective than I expected. It makes me think in Japanese. I've gotten faster at conjugations and particles feel more natural. It's the first tool that genuinely improves my output, not just my memory.

I keep it small on purpose, but I'm planning a few features I'd love to add like difficulty levels, more grammar patterns, maybe voice input for speaking practice. My goal is to turn it into my own personal Japanese coach.

It's not a magic solution, but it removes friction and lets me practice in 30 seconds. And honestly, that tiny habit changed the way I learn Japanese.`,
    },
  });

  await prisma.post.create({
    data: {
      slug: "research-experience",
      title: "Thoughts on my first research experience",
      description: "My thoughts on my first research experience in a lab",
      date: new Date("2024-04-17"),
      content: `I am currently in Japan conducting research in the Saga University.
I am very grateful for the opportunity I got to go abroad and work on a research project in the context of my master's degree. I'm embarking on what can be only be described as a journey. For the first time I get to experience what lab work is, and I want to describe my thoughts on the experience so far.
For context, I am working on the following subject: _'Predict osteoarthritis through acoustic emissions of the knee joint using machine learning'_. I focus on the data extraction and machine learning part. The data is collected by my lab colleagues.
Let me share my first impressions:

### The nature of lab work

I have always been fascinated by the idea of lab work. The idea of people working together to discover the new leaps in science is something that has always intrigued me. But, from what I have seen so far, lab work is not as glamorous as it seems. It is often slow, requiring painstaking attention to detail and long periods of data collection and analysis. The repetition can be meditative but sometimes crosses into monotony. Moreover, labs are inherently collaborative and sometimes chaotic environments, which contrasts sharply with the more structured project timelines found in corporate environments.

### Adjusting to Lab Dynamics

Adjusting to the pace and environment of a research lab has been one of my biggest challenges. In a lab, the immediacy of corporate deadlines is replaced by a focus on long-term outcomes. My professor wants us to report what we're working on twice a week. This shift can impact motivation but also allows for deeper exploration of complex problems. This deep exploration can sometimes lead to deadends and I have to learn to be comfortable with failure and uncertainty. The collaborative part is making the work sometimes more enjoyable but I feel like it is also slowing us all down.

### Reflections on Motivation and Incentives

Reflecting on my current experience, I've come to realize that the incentives are mostly self-driven. Unlike in a corporate environment where promotions and bonuses are tangible rewards, in research, the rewards are more abstract. The satisfaction of discovery, the joy of learning, and the potential to contribute to the scientific community are the primary motivators. This intrinsic motivation is both liberating and challenging. It requires a different mindset and a willingness to embrace uncertainty and ambiguity. (I feel like I am not made for this kind of work, but I am trying to adapt)

### The importance of Communication

This part is crucial. In a lab you gotta be able to communicate your advancements, your problems, your doubts, your ideas. I have to learn to communicate my work effectively to my professor and colleagues. I feel like this takes as much time as the actual work. But it is essential to keep everyone on the same page and to get feedback on my work. The fact that I am used to working alone makes this part even harder.

### Conclusion

Navigating through this experience is still a work in progress. I am learning to embrace the uncertainty and the slow pace of lab work. I am learning to communicate more effectively and to find motivation in the intrinsic rewards of research. The fact that I am in a foreign country makes this a wonderful journey too: I am learning about a new culture, a new language, and new ways of working. I am grateful for this opportunity and I am excited to see where this will take me.`,
    },
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
