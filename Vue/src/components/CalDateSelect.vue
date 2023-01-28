<template>
  <!--Tayla Orsmond u21467456-->
    <div class="cal-month-select">
      <span @click="prev">-</span>
      <span @click="curr">Today</span>
      <span @click="next">+</span>
    </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: 'CalDateSelect',
  props: {
    currentDate: {
        type: String,
        required: true
    },
    selectedDate: {
      type: Object,
      required: true
    }
  },
  methods: {
    prev() {
        var newSelectedDate = dayjs(this.selectedDate).subtract(1,'month');
        this.$emit('dateSelected', newSelectedDate);
    },
    curr() {
        var newSelectedDate = dayjs(this.currentDate);
        this.$emit('dateSelected', newSelectedDate);
    },
    next() {
        var newSelectedDate = dayjs(this.selectedDate).add(1, 'month');
        this.$emit('dateSelected', newSelectedDate);
    }

  }
};
</script>


<style scoped>
</style>
