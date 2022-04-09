<template>
  <a-row>
    <a-col :md="1" :lg="1" :xl="3" :xxl="3" :xxxl="5"></a-col>
    <a-col :md="22" :lg="22" :xl="18" :xxl="18" :xxxl="14">
      <a-layout>
        <a-layout-header class="header">
          <img :src="require('@/assets/icon.webp')" />
          <div class="description">A STUDIO FOCUSED ON CASUAL, HYBRID CASUAL GAMES</div>
          <div class="feature">Creative, High-Quality, and Fun</div>
        </a-layout-header>
        <a-layout-content class="content">
          <span class="divider-title">OUR GAMES</span>
          <a-divider class="divider" />
          <a-row justify="center">
            <a-col
              :md="24"
              :lg="12"
              :xl="12"
              :xxl="8"
              :xxxl="8"
              v-for="(game) in games"
              :key="game.name"
            >
              <a-row justify="center">
                <a-col>
                  <game-card :game="game" />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-layout-content>
        <a-layout-footer class="footer">
          <a-row justify="center">
            <a-col>
              <span>Alpaca Games L.L.C.</span>
              <a :href="`mailto:${company.email}`" class="email">Email</a>
              <a :href="company.linkedin" target="_blank" class="linkedin">Linkedin</a>
            </a-col>
          </a-row>
        </a-layout-footer>
      </a-layout>
    </a-col>
    <a-col :md="1" :lg="1" :xl="3" :xxl="3" :xxxl="5"></a-col>
  </a-row>
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
        { coverUrl: require('@/assets/number.webp'), name: 'number', title: 'Bubble Number Mix', description: 'Testing...' },
        { coverUrl: require('@/assets/jumpy.webp'), name: 'jumpy', title: 'Jumpy Bird', description: '', androidUrl: 'https://play.google.com/store/apps/details?id=com.grumpydragonstudio.jumpingbird' },
        { coverUrl: require('@/assets/car.webp'), name: 'car', title: 'Pull Back Car 3D', description: '', androidUrl: 'https://play.google.com/store/apps/details?id=com.grumpydragonstudio.pullbackcar' }
      ]
    }
  },
}
</script>

<style scoped>
.divider-title {
  color: #ffffff;
  font-size: 30px;
  margin-top: 20px;
  display: block;
  padding-left: 5px;
}
.divider {
  background-color: #ffffff;
}
.header {
  background-image: url("../assets/header.webp");
  background-size: 100%;
  height: 400px;
}
.content {
  background-color: #000000;
}
.footer {
  background-color: #000000;
  color: #ffffff;
}
.description {
  width: 80%;
  font-size: 40px;
  color: #ffffff;
}
.feature {
  font-size: 20px;
  color: #ffffff;
}
@media screen and (max-width: 790px) {
  .header {
    background-size: auto 100%;
  }
  .description {
    width: 100%;
    font-size: 20px;
  }
  .feature {
    font-size: 15px;
  }
}
.email {
  margin-left: 10px;
}
.linkedin {
  margin-left: 10px;
  white-space: nowrap;
}
</style>
