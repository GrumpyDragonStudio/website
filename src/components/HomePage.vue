<template>
  <div class="page">
    <header class="hero">
      <img class="hero-logo" :src="require('@/assets/Web_TeamIcon.png')" alt="Wow Games" />
      <h1 class="hero-title">AMAZE THE WORLD</h1>
      <p class="hero-tagline">We're here to create a fun and wonderful gaming experience that will make you say WOW!</p>
    </header>

    <main>
      <section class="section" id="games">
        <h2 class="section-title">Our Games</h2>
        <div class="game-grid">
          <game-card v-for="game in games" :key="game.name" :game="game" />
        </div>
      </section>

      <section class="section section-about" id="about">
        <h2 class="section-title">About Wow Games</h2>
        <div class="about-body">
          <p>Wow Games is a one-person mobile game studio based in Minnesota, dedicated to casual and logic puzzle games that are easy to pick up and hard to put down. Since 2022, we've partnered with Voodoo on hypercasual game prototyping, and now self-publish our own titles on Google Play.</p>
          <p>The studio is run by Peter Long, a game designer with a decade of experience across the Chinese and Western mobile industries, who worked on a puzzle title that surpassed 500M downloads. Every game here is designed, built, and published by one person — made possible by an AI-assisted production pipeline that lets a solo studio ship at small-team speed.</p>
          <p>We believe that small games, carefully crafted and consistently shipped, still deserve a place on your phone.</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span class="footer-brand">{{ company.legalName }}</span>
      <nav class="footer-links">
        <a :href="`mailto:${company.email}`">Email</a>
        <a :href="company.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a href="/privacy/wowgames.html" target="_blank">Privacy Policy</a>
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
      games: [
        {
          coverUrl: require('@/assets/Web_GameIcon.png'),
          name: 'where-are-the-cats',
          title: 'Where are the cats: Puzzle',
          description: 'A logic puzzle for puzzle lovers. Pure deduction, no guessing, no timers!',
          androidUrl: 'https://play.google.com/store/apps/details?id=com.wowgames.wherearethecats'
        },
        {
          coverUrl: require('@/assets/BrickzIcon.png'),
          name: 'brickz',
          title: 'Brickz',
          description: 'Smash all the bricks and beat every level—simple and addictive!',
          androidUrl: 'https://play.google.com/store/apps/details?id=com.wowgames.brickz'
        },
        {
          coverUrl: require('@/assets/BubbleNumberMixIcon.png'),
          name: 'bubble-number-mix',
          title: 'Bubble Number Mix',
          description: 'Merge all the numbers to win the game, try it now!',
          androidUrl: 'https://play.google.com/store/apps/details?id=com.grumpydragonstudio.numbermix'
        },
        {
          coverUrl: require('@/assets/DotsBlastIcon.png'),
          name: 'dots-blast',
          title: 'Dots Blast',
          description: "Blast the dots and help your friend restore her grandma's house.",
          androidUrl: 'https://play.google.com/store/apps/details?id=us.alpacagames.dotpuzzle'
        },
        {
          coverUrl: require('@/assets/FlowerMatchIcon.png'),
          name: 'flower-match',
          title: 'FlowerMatch',
          description: 'Match flowers in a line to win the game!',
          androidUrl: 'https://play.google.com/store/apps/details?id=us.wowgames.flowermatch'
        }
      ]
    }
  },
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #EFE7E0;
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
  .hero {
    padding-top: 48px;
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
