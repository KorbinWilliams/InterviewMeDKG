<template>
  <div id="categories">
    <div class="card-deck">
      <P>categories</P>
      <categories
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "quiz_categories",
  data() {
    return {
      name: ""
    };
  }
};
</script>

<style scoped>
#categories {
  background: rgb(159, 159, 248);
}
</style>
