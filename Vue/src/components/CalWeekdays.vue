<template>
  <!--Tayla Orsmond u21467456-->
  <div class="cal-weekdays">
      <ol>
          <li v-for="weekday in weekdays" :key="weekday">{{weekday}}</li>
      </ol>
  </div>
</template>

<script>
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default {
  name: 'CalWeekdays',
  computed: {
    weekdays() {
      return weekdays
    }
  }
};
</script>


<style scoped>

</style>
