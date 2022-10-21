<template>
  <div class="about">
    <b-button
      label="Presioname"
      size="is-medium"
      type="is-primary"
      @click="snackbar"
    />
    <div class="columns m-5">
      <div class="column is-1 notification is-dark">First column</div>
      <div class="column is-3 notification is-info">Second column</div>
      <div class="column is-2 notification is-success">Third column</div>
      <div class="column notification">
        <div class="columns">
          <div class="column red title has-text-white">hola 1</div>
          <div class="column yellow"><span class="title is-4">hola 2</span></div>
          <div class="column red subtitle has-text-info">hola 3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    snackbar() {
      this.$buefy.snackbar.open({
        message: "Hola soy el snackbar",
        type: "is-info",
        position: "is-bottom",
        actionText: "Hola",
      });
    },
  },
};
</script>

<style scoped>
.red {
  background-color: red;
}
.yellow {
  background-color: yellow;
}
</style>
