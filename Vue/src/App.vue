<template>
  <!--Tayla Orsmond u21467456-->
  <div id="app">
     <div class="login-box" v-if="!visi">
      <div>
        <h1>Hello!</h1>
        <p>Log in to view your schedule</p>
      </div>
      <div>
        <label><input type="text" placeholder="Username" v-model="userID" v-on:keyup.enter="setUserID(userID, userPsw)"/></label><br/>
        <label><input type="password" placeholder="Password" v-model="userPsw" v-on:keyup.enter="setUserID(userID, userPsw)"/></label><br/>
        <div>
          <span class="btn" @click="setUserID(userID, userPsw, false)">Log in</span>
          <span class="btn" @click="setUserID(userID, userPsw, true)">New User</span>
        </div>
        <p>{{errmsg}}</p>
      </div>
    </div>
    <div v-if="visi">
      <div class="cal-main">
        <SelectCal @calSelected="selectSchedule" :key="scheduleID"/>
        <CalHolder :id ="userID" :schid="scheduleID" :nU ="newU" :key="scheduleID"/>
      </div>
    </div>
  </div> 
</template>

<script>
import CalHolder from './components/CalHolder.vue'
import SelectCal from './components/SelectCal.vue'

export default {
  name: 'App',
  components: {
    CalHolder,
    SelectCal
  },
  data(){
    return{
      userID: "",
      userPsw: "",
      newU: false,
      scheduleID: "",
      visi: false,
      errmsg: "",
    }
  },
  methods:{
    setUserID(uid, psw, nu){
      if(psw == undefined || uid.length < 5){
        this.errmsg = "Username should be more than 5 characters.";
      }
      if(psw == undefined || psw.length < 1){
        this.errmsg = "Password should be more than 1 character.";
      }
      else if(uid.length > 5 && psw.length > 1){
        this.errmsg = "";
        this.visi = !this.visi;
        this.userID = uid;
        this.userPsw= psw;
        this.scheduleID = uid;
        this.newU = nu;
      }
    },
    selectSchedule(newSchedule){
      this.scheduleID = newSchedule;
      this.newU = false;
    }
  },
}
</script>

<style lang="css">
  @import './assets/style.css';
</style>
