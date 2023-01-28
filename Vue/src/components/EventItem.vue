<template>
  <!--Tayla Orsmond u21467456-->
  <div class="event-item">
      <span v-if="e != null" @click="editing = !editing"><p>{{e.title[0]}}</p></span>
      <EditEvent v-if="editing" :event="event" :uid="uid" :schid="schid" @edited="editing = !editing" @deleted="editing = !editing, e = updatedEvent">
        <span class="btn" @click="editing = !editing"><img src="./img/calendar-minus-solid.svg" class="ico"/></span>
      </EditEvent>
  </div>
</template>

<script>
//&& uid === schid
import EditEvent from "./EditEvent.vue";
export default {
    name: 'EventItem',
    components: {
        EditEvent
    },
    props: ['event', 'uid', 'schid'],
    data(){
        return {
            editing: false,
            eid: this.event.$.id,
            e: this.event,
            src: "http://localhost:3000/schedule/",
        }
    },
};
</script>


<style scoped>

</style>
