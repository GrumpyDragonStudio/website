<template>
  <article class="card">
    <img class="card-cover" :src="game.coverUrl" :alt="game.title" />
    <h3 class="card-title">{{ game.title }}</h3>
    <p v-if="game.description" class="card-description">{{ game.description }}</p>
    <div class="card-actions">
      <a
        v-if="game.androidUrl"
        class="store-button"
        :href="game.androidUrl"
        target="_blank"
        rel="noopener"
      >
        <svg class="store-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3.6 1.8c-.4.4-.6 1-.6 1.7v17c0 .7.2 1.3.6 1.7l.1.1 9.5-9.5v-.2L3.7 1.7l-.1.1z"/>
          <path d="M16.4 15.9l-3.2-3.2v-.2l3.2-3.2.1.1 3.8 2.1c1.1.6 1.1 1.6 0 2.2l-3.8 2.1-.1.1z"/>
          <path d="M16.5 15.8L13.2 12.5 3.6 22.2c.4.4 1 .4 1.7 0l11.2-6.4z"/>
          <path d="M16.5 9.2L5.3 2.8c-.7-.4-1.3-.4-1.7 0l9.6 9.7 3.3-3.3z"/>
        </svg>
        Google Play
      </a>
      <a
        v-if="game.iosUrl"
        class="store-button"
        :href="game.iosUrl"
        target="_blank"
        rel="noopener"
      >
        App Store
      </a>
    </div>
  </article>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    game: { type: Object, required: true },
  },
};
</script>

<style scoped>
.card {
  width: 340px;
  max-width: 100%;
  padding: 32px 28px;
  background-color: #FFFFFF;
  border-radius: 28px;
  box-shadow: 0 6px 24px rgba(43, 36, 32, 0.08);
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(43, 36, 32, 0.14);
}

.card-cover {
  width: 160px;
  height: 160px;
  border-radius: 36px;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(43, 36, 32, 0.12);
}

.card-title {
  margin: 20px 0 8px;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  font-size: 21px;
  color: #2B2420;
}

.card-description {
  margin: 0 0 20px;
  font-size: 15px;
  line-height: 1.6;
  color: #6B5F56;
}

.card-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.store-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 999px;
  background-color: #2B2420;
  color: #FFFFFF;
  font-family: 'Fredoka', sans-serif;
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.store-button:hover {
  background-color: #E85D4F;
  transform: scale(1.04);
}

.store-icon {
  width: 18px;
  height: 18px;
}
</style>
