<template>
  <!--Tayla Orsmond u21467456-->
    <div class="cal-day" :class="{ 'cal-day-other': !day.iscurrMonth, 'cal-day-today': isToday }">
        <span>{{ calday }}</span>
        <div class="cal-day-events" v-for="event in eventData" :key="event">
            <EventItem v-if="this.calday == event.date[0].day[0] && this.calmonth == event.date[0].month[0]" :event="event" :uid="uid" :schid="schid"/>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
import EventItem from "./EventItem.vue"
export default {
    name: 'CalDayItem',
    components: {
        EventItem
    },
    props: {
        day: {
            type: Object,
            required: true
        },

        isCurrentMonth: {
            type: Boolean,
            default: false
        },

        isToday: {
            type: Boolean,
            default: false
        },
        uid: {
            type: String,
        },
        schid: {
            type: String,
        },
        eventData: {
            type: Array,
        },
    },
    data(){
        return {
            calyear: Number(dayjs(this.day.date).format("YYYY")),
            calmonth: dayjs(this.day.date).format("MMMM").toString(),
            calday: Number(dayjs(this.day.date).format("D")),
        }
    }
};
</script>


<style scoped>
</style>
