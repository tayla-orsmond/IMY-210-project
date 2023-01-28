<template>
  <!--Tayla Orsmond u21467456-->
  <h3>{{ selectedMonth }}</h3>
</template>

<script>

export default {
  name: 'CalDateStage',
  props: {
    selectedDate: {
      type: Object,
      required: true
    }
  },
  computed: {
    selectedMonth() {
      return this.selectedDate.format("MMMM YYYY")
    }
  }
};
</script>


<style scoped>
</style>
