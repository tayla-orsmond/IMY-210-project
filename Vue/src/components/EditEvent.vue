<template>
  <!--Tayla Orsmond u21467456-->
  <div class="edit-event">
      <div class="edit-event-inner">
        <slot/>
        <span id="errmsg">{{errmsg}}</span><br/>
        <label><input v-model="e.title[0]" placeholder="Title" type="text"  @change="editTitle" maxlength="25" :disabled="uid != schid"/></label><br/>
        <label>Type:
            <select id="eType" v-model="e.type[0]" @change="editType()" :disabled="uid != schid">
                <option value="Event" :selected="e.type[0] === 'Event'">Event</option>
                <option value="Task" :selected="e.type[0] === 'Task'">Task</option>
                <option value="Appointment" :selected="e.type[0] === 'Appointment'">Appointment</option>
            </select>
        </label><br/>
        <p>Repeat:
            <input id="d" type="radio" name="eR" value="Daily" :checked=" this.e.date[0].$.repeat === 'Daily'" @change="editRepeat($event)" :disabled="uid != schid"/>
            <label for="d">Daily</label>
            <input id="w" type="radio" name="eR" value="Weekly" :checked=" this.e.date[0].$.repeat === 'Weekly'" @change="editRepeat($event)" :disabled="uid != schid"/>
            <label for="w">Weekly</label>
            <input id="m" type="radio" name="eR" value="Monthly" :checked=" this.e.date[0].$.repeat === 'Monthly'" @change="editRepeat($event)" :disabled="uid != schid"/>
            <label for="m">Monthly</label>
        </p><br/>
        <label>Start Time: <input type="time" v-model="eStart" id="eStart" @change="editStartTime($event)" :disabled="uid != schid"/></label>
        <label>End Time: <input type="time" v-model="eEnd" id="eEnd"  @change="editEndTime($event)" :disabled="uid != schid"/></label><br/>
        <label><input v-model="e.venue[0]" placeholder="Venue" type="text"  @change="editVenue" maxlength="25" :disabled="uid != schid"/></label><br/>
        <p>Guests:</p>
        <ul v-for="guest in g" :key="guest">
            <li>Name: <input type="text" :guest="guest" v-model="guest.name[0]" @change="editG(guest.name[0],guest.email[0])" maxlength="50" :disabled="uid != schid"/> Email:<input type="text" :guest="guest" v-model="guest.email[0]" @change="editG(guest.name[0],guest.email[0])" maxlength="50" :disabled="uid != schid"/><span class="btn" :guest="guest" @click="delG(guest.name[0])"  v-show="uid === schid"><img src="./img/user-minus-solid.svg" class="ico"/></span></li>
        </ul>
        <br/><span class="btn" @click="addG"  v-show="uid === schid"><img src="./img/user-plus-solid.svg" class="ico"/></span><br/>
        <label><textarea v-model="e.description[0]" placeholder="Description" @change="editDescription" rows="4" cols="80" maxlength="255" :disabled="uid != schid"></textarea></label><br/>
        <span class="btn" @click="update()" v-show="uid === schid"><img src="./img/calendar-check-solid.svg" class="ico"/></span>
        <span class="btn" @click="del()" v-show="uid === schid"><img src="./img/calendar-xmark-solid.svg" class="ico"/></span>
      </div>
  </div>
</template>
<script>
export default {
    name: 'EditEvent',
    props: ['event', 'uid', 'schid'],
    data(){
        return {
            eid: this.event.$.id,
            e: this.event,
            eStart: this.convertto24h(this.event.date[0].startingTime[0]),
            eEnd: this.convertto24h(this.event.date[0].endingTime[0]),
            errmsg: "",
            g: this.event.guests[0].guest,
            validTitle: true,
            validVenue: true,
            validDesc: true,
            validG: true,
            validstartTime: true,
            validendTime: true,
            updatedEvent: {},
            src: "http://localhost:3000/schedule/",
        }
    },
    methods: {
        convertto24h(time){
            var [t, mod] = time.split(" ");
            var [hrs, mins] = t.split(":");
            if(hrs === "12"){
                hrs = "00";
            }
            if(mod === "PM"){
                hrs = parseInt(hrs, 10) + 12;
            }
            return `${hrs}:${mins}`;
        },
        convertto12h(time){
            var mod;
            var [hrs, mins] = time.split(":");
            mod = +hrs < 12 ? " AM" : " PM";
            hrs = hrs %12 || 12;
            hrs = hrs.toString();
            if(hrs.length < 2){
                hrs = "0" + hrs;
            }
            return `${hrs}:${mins}`+mod;
        },
        editTitle(){
            if(this.e.title[0].length >= 1 && this.e.title[0].length <= 25){
                this.errmsg = '';
                this.validTitle = true;
            }
            else{
                this.errmsg = 'Title must be between 1 and 25 letters.';
                this.validTitle = false;
            }
        },
        editVenue(){
            if(this.e.venue[0].length >= 1 && this.e.venue[0].length <= 25){
                this.errmsg = '';
                this.validVenue = true;
            }
            else{
                this.errmsg = 'Venue must be between 1 and 25 letters.';
                this.validVenue = false;
            }
        },
        editDescription(){
            if(this.e.description[0].length >= 1 && this.e.description[0].length <= 255){
                this.errmsg = '';
                this.validDesc = true;
            }
            else{
                this.errmsg = 'Description must be between 1 and 255 letters.';
                this.validDesc = false;
            }
        },
        editType(){
            var eType = document.getElementById('eType');
            this.e.type[0] = eType.value;
        },
        editRepeat(event){
            this.e.date[0].$.repeat = event.target.value;
        },
        editStartTime(event){
            this.e.date[0].startingTime[0] = this.convertto12h(event.target.value);
            this.validstartTime = true;
        },
        editEndTime(event){
            this.e.date[0].endingTime[0] = this.convertto12h(event.target.value);
            this.validendtime = true;
        },
        addG() {
            if(this.g.length <=10){
                this.g.push({"name": [""],"email": [""]});
            }
            else{
                this.errmsg = "Max 10 guests allowed per event.";
            }
        },
        delG(gname){
            if(this.g.length == 1)
            {
                this.g.pop();
            }
            else this.g.forEach(guest => {
                if(guest.name == gname){
                    this.g.splice(this.g.indexOf(gname), 1);
                }
            });
            this.errmsg = '';
        },
        editG(name, email){
            if(name == "" && email == ""){
                this.errmsg = "Guest requires either an email or name.";
                this.validG = false;
            }
            else if(email == "" && (name.length <= 1 || name.length >= 50)){
                this.errmsg = "Guest name must be between 1 and 50 characters.";
                this.validG = false;
            }
            else if(name == "" && (email.length <= 1 || email.length >= 50)){
                this.errmsg = "Guest email must be between 1 and 50 characters.";
                this.validG = false;
            }
            else{
                this.validG = true;
            }
        },
        update(){
            if(this.validTitle && this.validVenue && this.validDesc && this.validG){
                this.errmsg = '';
                this.updatedEvent['event'] = this.e;
                this.putReq(this.updatedEvent);
                this.$emit('edited', this.updatedEvent);
            }
            else if(!this.validTitle){
                console.log(this.validTitle);
                this.errmsg = 'Title must be between 1 and 25 letters.';
            }
            else if(!this.validVenue){
                this.errmsg = 'Venue must be between 1 and 25 letters.';
            }
            else if(!this.validDesc){
                this.errmsg = 'Description must be between 1 and 255 letters.';
            }
            else if(!this.validG){
                this.errmsg = 'All guests must have either an email or name between 1 and 50 letters.';
            }
            else if(!this.validstartTime && !this.validendTime){
                this.errmsg = 'Time is required.';
            }
        },
        del(){
            this.delReq();
            this.$emit('deleted', null);
        },
        putReq: function(postArea){
            this.status = "put"
            const config = {
                method: "PUT",
                headers: {"Content-Type": "application/json; charset=utf-8", 
                "Accept": "application/json"},
                body: JSON.stringify(postArea)
            }
            fetch(this.src+this.uid+"/event/"+this.eid, config)
            .then(resp => resp.json())
            .then(data =>{this.e = data;})
        },
        delReq: function(){
            this.status = "delete"
            const config = {
                method: "DELETE",
                headers: {"Content-Type": "application/json; charset=utf-8", 
                "Accept": "application/json"},
            }
            fetch(this.src+this.uid+"/event/"+this.eid, config)
            .then(resp => resp.json())
            .then(data =>(this.data = data))
        }
    }
};
</script>


<style scoped>
</style>
