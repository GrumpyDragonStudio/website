<template>
  <a-row>
    <a-col :md="1" :lg="1" :xl="3" :xxl="3" :xxxl="5"></a-col>
    <a-col :md="22" :lg="22" :xl="18" :xxl="18" :xxxl="14">
      <a-layout>
        <a-layout-header class="header">
          <img :src="require('@/assets/icon.webp')" />
          <div class="description">A STUDIO FOCUSED ON CASUAL, HYBRID CASUAL GAMES</div>
        </a-layout-header>
        <a-layout-content class="content">
          <span class="divider-title">OUR GAMES</span>
          <a-divider class="divider" />
          <a-row>
            <a-col
              :md="24"
              :lg="12"
              :xl="12"
              :xxl="8"
              :xxxl="8"
              v-for="(game) in games"
              :key="game.name"
            >
              <game-card :game="game" />
            </a-col>
          </a-row>
        </a-layout-content>
        <a-layout-footer class="footer">
          <span>Alpaca Games L.L.C.</span>
        </a-layout-footer>
      </a-layout>
    </a-col>
    <a-col :md="1" :lg="1" :xl="3" :xxl="3" :xxxl="5"></a-col>
  </a-row>
</template>

<script>
import GameCard from '@/components/GameCard.vue';

export default {
  name: 'HomePage',
  components: {
    GameCard
  },
  data() {
    return {
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
  margin-top: 30px;
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
  font-size: 60px;
  color: #ffffff;
}
</style>
