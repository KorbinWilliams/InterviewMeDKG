<template> </template>

<script>
export default {
  name: "quizes",
  props: [],

  methods: {
    randomColor() {
      const colorsList = [
        "grey",
        "deep-orange",
        "brown",
        "blue-grey",
        "orange",
        "green",
        "cyan",
        "teal",
        "blue",
        "indigo",
        "pink",
        "red",
        "purple"
      ];
      const rand = Math.floor(Math.random() * colorsList.length);
      return colorsList[rand];
    }
  }
};
</script>
