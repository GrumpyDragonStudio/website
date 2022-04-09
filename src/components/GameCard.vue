<template>
  <a-card class="card" :bordered="false">
    <template #cover>
      <img :src="game.coverUrl" />
    </template>
    <a-card-meta :title="game.title">
      <template #description>
        <span v-if="showDescription(game)">{{ game.description }}</span>
        <a-button v-if="showAndroid(game)" shape="round" type="primary">
          <template #icon>
            <android-outlined />
          </template>
          Check
        </a-button>
        <a-button v-if="showIos(game)" shape="round" type="primary">
          <template #icon>
            <apple-outlined />
          </template>
          Check
        </a-button>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script>
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons-vue';

export default {
  name: "GameCard",
  components: { AndroidOutlined, AppleOutlined },
  props: {
    game: { type: Object, required: true },
  },
  methods: {
    showDescription(game) {
      return !!game.description;
    },
    showAndroid(game) {
      return !!game.androidUrl;
    },
    showIos(game) {
      return !!game.iosUrl;
    },
  }
};
</script>

<style scoped>
.card {
  background-color: #000000;
  color: #ffffff;
  width: 365px;
}
</style>
<style>
.ant-card-meta-title {
  color: #ffffff;
}
.ant-card-meta-description {
  color: #ffffff;
}
</style>