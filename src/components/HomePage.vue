<template>
  <div class="page">
    <button class="lang-toggle" @click="toggleLang">{{ lang === 'en' ? '中文' : 'EN' }}</button>

    <header class="hero">
      <img class="hero-logo" :src="require('@/assets/Web_TeamIcon.png')" alt="Wow Games" />
      <h1 class="hero-title">{{ t.heroTitle }}</h1>
      <p class="hero-tagline">{{ t.heroTagline }}</p>
    </header>

    <main>
      <section class="section" id="games">
        <h2 class="section-title">{{ t.gamesTitle }}</h2>
        <div class="game-grid">
          <game-card v-for="game in localizedGames" :key="game.name" :game="game" />
        </div>
      </section>

      <section class="section section-about" id="about">
        <h2 class="section-title">{{ t.aboutTitle }}</h2>
        <div class="about-body">
          <p v-for="(paragraph, i) in t.aboutParagraphs" :key="i">{{ paragraph }}</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span class="footer-brand">{{ company.legalName }}</span>
      <nav class="footer-links">
        <a :href="`mailto:${company.email}`">{{ t.footerEmail }}</a>
        <a :href="company.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a href="/privacy/wowgames.html" target="_blank">{{ t.footerPrivacy }}</a>
      </nav>
    </footer>
  </div>
</template>

<script>
import { company } from "../../package.json";
import GameCard from '@/components/GameCard.vue';

export default {
  name: 'HomePage',
  components: {
    GameCard
  },
  data() {
    return {
      company,
      lang: localStorage.getItem('lang') || 'en',
      ui: {
        en: {
          heroTitle: 'AMAZE THE WORLD',
          heroTagline: "We're here to create a fun and wonderful gaming experience that will make you say WOW!",
          gamesTitle: 'Our Games',
          aboutTitle: 'About Wow Games',
          aboutParagraphs: [
            "Wow Games is a one-person mobile game studio based in Minnesota, dedicated to casual and logic puzzle games that are easy to pick up and hard to put down. Since 2023, we've partnered with Voodoo on hypercasual game prototyping, and now self-publish our own titles on Google Play.",
            'The studio is run by Peter Long, a game designer with a decade of experience across the Chinese and Western mobile industries, who worked on a puzzle title that surpassed 500M downloads. Every game here is designed, built, and published by one person — made possible by an AI-assisted production pipeline that lets a solo studio ship at small-team speed.',
            'We believe that small games, carefully crafted and consistently shipped, still deserve a place on your phone.'
          ],
          footerEmail: 'Email',
          footerPrivacy: 'Privacy Policy'
        },
        zh: {
          heroTitle: '惊艳世界',
          heroTagline: '我们致力于创造有趣而美妙的游戏体验，让你忍不住说声 WOW！',
          gamesTitle: '我们的游戏',
          aboutTitle: '关于 Wow Games',
          aboutParagraphs: [
            'Wow Games 是一家位于美国明尼苏达州的一人手机游戏工作室，专注于易上手、耐回味的休闲与逻辑解谜游戏。自 2023 年起，我们与 Voodoo 合作进行超休闲游戏原型开发，目前在 Google Play 上自主发行自己的作品。',
            '工作室由 Peter Long 独立运营。他是一名拥有十年中西方手游行业经验的游戏设计师，曾参与一款下载量超过 5 亿的解谜游戏。这里的每一款游戏都由一个人完成设计、开发和发行——依托 AI 辅助的制作流程，让单人工作室拥有小团队的产出速度。',
            '我们相信，用心打磨、持续更新的小游戏，依然值得在你的手机上占有一席之地。'
          ],
          footerEmail: '邮箱',
          footerPrivacy: '隐私政策'
        }
      },
      games: [
        {
          coverUrl: require('@/assets/Web_GameIcon.png'),
          name: 'where-are-the-cats',
          title: 'Where are the cats: Puzzle',
          description: {
            en: 'A logic puzzle for puzzle lovers. Pure deduction, no guessing, no timers!',
            zh: '为解谜爱好者打造的逻辑游戏。纯推理，不靠猜，没有倒计时！'
          },
          androidUrl: 'https://play.google.com/store/apps/details?id=com.wowgames.wherearethecats'
        },
        {
          coverUrl: require('@/assets/BrickzIcon.png'),
          name: 'brickz',
          title: 'Brickz',
          description: {
            en: 'Smash all the bricks and beat every level—simple and addictive!',
            zh: '打碎所有砖块，通关每一关——简单又上瘾！'
          },
          androidUrl: 'https://play.google.com/store/apps/details?id=com.wowgames.brickz'
        },
        {
          coverUrl: require('@/assets/BubbleNumberMixIcon.png'),
          name: 'bubble-number-mix',
          title: 'Bubble Number Mix',
          description: {
            en: 'Merge all the numbers to win the game, try it now!',
            zh: '合并所有数字即可获胜，快来试试吧！'
          },
          androidUrl: 'https://play.google.com/store/apps/details?id=com.grumpydragonstudio.numbermix'
        },
        {
          coverUrl: require('@/assets/DotsBlastIcon.png'),
          name: 'dots-blast',
          title: 'Dots Blast',
          description: {
            en: "Blast the dots and help your friend restore her grandma's house.",
            zh: '消除圆点，帮助好友修复外婆的老宅。'
          },
          androidUrl: 'https://play.google.com/store/apps/details?id=us.alpacagames.dotpuzzle'
        },
        {
          coverUrl: require('@/assets/FlowerMatchIcon.png'),
          name: 'flower-match',
          title: 'FlowerMatch',
          description: {
            en: 'Match flowers in a line to win the game!',
            zh: '将花朵连成一线即可取得胜利！'
          },
          androidUrl: 'https://play.google.com/store/apps/details?id=us.wowgames.flowermatch'
        }
      ]
    }
  },
  computed: {
    t() {
      return this.ui[this.lang];
    },
    localizedGames() {
      return this.games.map(game => ({
        ...game,
        description: game.description[this.lang]
      }));
    }
  },
  methods: {
    toggleLang() {
      this.lang = this.lang === 'en' ? 'zh' : 'en';
      localStorage.setItem('lang', this.lang);
      document.documentElement.lang = this.lang === 'zh' ? 'zh-CN' : 'en';
    }
  },
  mounted() {
    document.documentElement.lang = this.lang === 'zh' ? 'zh-CN' : 'en';
  },
}
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #EFE7E0;
}

.lang-toggle {
  position: absolute;
  top: 20px;
  right: 24px;
  z-index: 10;
  padding: 8px 20px;
  border: 2px solid #2B2420;
  border-radius: 999px;
  background-color: #FFFFFF;
  color: #2B2420;
  font-family: 'Fredoka', sans-serif;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.lang-toggle:hover {
  background-color: #2B2420;
  color: #FFFFFF;
  transform: scale(1.05);
}

.hero {
  padding: 72px 24px 40px;
  text-align: center;
}
.hero-logo {
  width: 240px;
  max-width: 60vw;
  height: auto;
}
.hero-title {
  margin: 24px 0 12px;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 44px;
  letter-spacing: 2px;
  color: #2B2420;
}
.hero-tagline {
  margin: 0 auto;
  max-width: 520px;
  font-size: 19px;
  line-height: 1.6;
  color: #6B5F56;
}

.section {
  padding: 48px 24px;
  text-align: center;
}
.section-title {
  display: inline-block;
  position: relative;
  margin: 0 0 36px;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 32px;
  color: #2B2420;
}
.section-title::after {
  content: "";
  display: block;
  margin: 8px auto 0;
  width: 56px;
  height: 8px;
  border-radius: 4px;
  background-color: #F9B234;
}

.game-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
}

.section-about {
  padding-bottom: 72px;
}
.about-body {
  margin: 0 auto;
  max-width: 640px;
  text-align: left;
}
.about-body p {
  margin: 0 0 20px;
  font-size: 17px;
  line-height: 1.75;
  color: #4A4038;
}
.about-body p:last-child {
  margin-bottom: 0;
  font-family: 'Fredoka', sans-serif;
  font-weight: 500;
  color: #E85D4F;
}

.footer {
  margin-top: auto;
  padding: 28px 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px 24px;
  background-color: #2B2420;
  color: #EFE7E0;
  font-size: 15px;
}
.footer-brand {
  font-family: 'Fredoka', sans-serif;
  font-weight: 500;
}
.footer-links {
  display: flex;
  gap: 24px;
}
.footer-links a {
  color: #EFE7E0;
  text-decoration: none;
  opacity: 0.85;
  transition: opacity 0.2s;
}
.footer-links a:hover {
  opacity: 1;
  text-decoration: underline;
}

@media screen and (max-width: 600px) {
  .lang-toggle {
    top: 12px;
    right: 12px;
    padding: 6px 16px;
    font-size: 14px;
  }
  .hero {
    padding-top: 64px;
  }
  .hero-title {
    font-size: 30px;
  }
  .hero-tagline {
    font-size: 16px;
  }
  .section-title {
    font-size: 26px;
  }
}
</style>
