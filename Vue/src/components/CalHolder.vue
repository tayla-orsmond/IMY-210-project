<template>
  <!--Tayla Orsmond u21467456-->
  <div class="cal-box">
    <div class="cal-title">
      <h2>Hello <span class="col">{{id}}</span>!</h2>
      <h3>Viewing: <span class="col2">{{schid}}</span>'s Schedule:</h3>
      <div>
        <span class="btn" @click="fetchData"><img src="./img/rotate-right-solid.svg" class="ico s"/></span>
        <span class="btn" @click="adding = !adding" :disabled="uid != schid"><img src="./img/calendar-plus-solid.svg" class="ico s"/></span>
      </div>
      <AddEvent v-if="adding && uid === schid" :uid="uid" :schid="schid" @added="adding = !adding, addEvent(event)" @canceled="adding = !adding"/>
    </div>
    <div class="cal-month">
      <div class="cal-header">
        <CalDateStage :selectedDate="selectedDate"/>
        <CalDateSelect :currentDate="today" :selectedDate="selectedDate" @dateSelected="selectDate"/>
      </div>
      <CalWeekdays/>
      <div class="cal-grid">
          <CalDayItem v-for="day in days" :key="day.date" :day="day" :is-today="day.date === today" :uid ="id" :schid ="schid" :eventData="respdata"/>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalDateStage from "./CalDateStage.vue";
import CalDateSelect from "./CalDateSelect.vue";
import CalWeekdays from "./CalWeekdays.vue";
import CalDayItem from "./CalDayItem.vue";
import AddEvent from "./AddEvent.vue";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: 'CalHolder',
  props: ['id', 'schid', 'nU'],
  components: {
    CalDateStage,
    CalDateSelect,
    CalWeekdays,
    CalDayItem,
    AddEvent
  },
  data() {
    return {
      selectedDate: dayjs(),
      uid: this.id,
      sid: this.schid,
      nu: this.nU,
      respdata: [],
      bodydata: {
        "owner": this.id,
      },
      adding: false,
      src: "http://localhost:3000/schedule/",
    };
  },
  created() {  
    this.fetchData();  
    //this.timer = setInterval(this.fetchData, 5000);  
  },  
  methods: {  
    async fetchData(){ 
      if(this.schid != "" && !this.nu) 
        this.getReq();
      else if(this.schid != "" && this.nu){
        this.postReq(this.bodydata);
        this.nu = false;
      }
    },  
    // cancelGet() {  
    //   clearInterval(this.timer);  
    // },
    // beforeDestroy() {  
    //   this.cancelGet();  
    // },
    getReq: function(){
      this.status = "get";
      fetch(this.src+this.schid+'/events')
      .then(resp => resp.json())
      .then(data => {this.respdata = data;})
    },
    postReq: function(bodyData){
      this.status = "post";
      const config = {
          method: "POST",
          headers: {"Content-Type": "application/json; charset=utf-8", 
          "Accept": "application/json"},
          body: JSON.stringify(bodyData)
      }
      fetch(this.src, config)
      .then(resp => resp.json())
      .then(data =>(this.respdata = data))
    },
    getWeekday(date) {
      return dayjs(date).weekday();
    },

    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    addEvent(event){
      this.respdata = event;
      this.getReq;
    }
  },
  computed: {
    days() { 
      return [
        ...this.prevMonth,
        ...this.currMonth,
        ...this.nxtMonth
      ];
    },

    today() {
      return dayjs().format("YYYY-MM-DD");
    },

    month() {
      return Number(this.selectedDate.format("M"));
    },

    year() {
      return Number(this.selectedDate.format("YYYY"));
    },

    numMonthDays() {
      return dayjs(this.selectedDate).daysInMonth();
    },

    currMonth() {
      return [...Array(this.numMonthDays)].map((day, index) => {
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format("YYYY-MM-DD"),
          iscurrMonth: true
        };
      });
    },

    prevMonth() {
      const firstWeekdayinMonth = this.getWeekday(this.currMonth[0].date);
      const prevMonth = dayjs(`${this.year}-${this.month}-01`).subtract(1,"month");

      const visiDaysPrevMonth = firstWeekdayinMonth ? firstWeekdayinMonth - 1: 6;

      const lastMondayprevMonth = dayjs(this.currMonth[0].date).subtract(visiDaysPrevMonth, "day").date();

      return [...Array(visiDaysPrevMonth)].map(
        (day, index) => {
          return {
            date: dayjs(`${prevMonth.year()}-${prevMonth.month() +1}-${lastMondayprevMonth + index}`).format("YYYY-MM-DD"),
            iscurrMonth: false
          };
        }
      );
    },

    nxtMonth() {
      const lastWeekdayinMonth = this.getWeekday(`${this.year}-${this.month}-${this.currMonth.length}`);
      const nxtMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");

      const visiDaysNxtMonth = lastWeekdayinMonth ? 7 - lastWeekdayinMonth: lastWeekdayinMonth;

      return [...Array(visiDaysNxtMonth)].map((day, index) => {
        return {
          date: dayjs(`${nxtMonth.year()}-${nxtMonth.month() + 1}-${index + 1}`).format("YYYY-MM-DD"),
          iscurrMonth: false
        };
      });
    }
  }
};
</script>


<style scoped>
</style>
