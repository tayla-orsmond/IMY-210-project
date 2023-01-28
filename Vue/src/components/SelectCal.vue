<template>
  <!--Tayla Orsmond u21467456-->
  <div class="cal-select">
    <h3>See your friend's Schedules:</h3>
    <ul v-for="cal in resplist.files" :key="cal">
        <li @click="$emit('calSelected', cal.owner)">{{cal.title}}</li>
    </ul>
  </div> 
</template>

<script>

export default {
  name: 'SelectCal',
  props: ['uid', 'schid'],
  data(){
    return{
        src: "http://localhost:3000/schedule/",
        resplist: {}
    }
  },
  methods:{
    async fetchData(){
      this.getReq();
    },  
    getReq: function(){
      this.status = "get";
      fetch(this.src)
      .then(resp => resp.json())
      .then(data => {this.resplist = data;})
    },
  },
  created() {  
    this.fetchData();
    this.getReq;
  }
}
</script>

<style>
</style>
