<template>
  <!--Tayla Orsmond u21467456-->
  <div class="edit-event">
      <div class="edit-event-inner">
        <span class="btn" @click="$emit('canceled')"><img src="./img/calendar-minus-solid.svg" class="ico"/></span>
        <slot/>
        <span id="errmsg">{{errmsg}}</span><br/>
        <label><input v-model="e.title[0]" placeholder="Title" type="text"  @change="editTitle" maxlength="25"/></label><br/>
        <label>Type:
            <select id="eType" v-model="e.type[0]" @change="editType()">
                <option value="Event" :selected="e.type[0] === 'Event'">Event</option>
                <option value="Task" :selected="e.type[0] === 'Task'">Task</option>
                <option value="Appointment" :selected="e.type[0] === 'Appointment'">Appointment</option>
            </select>
        </label><br/>
        <p>Date: 
            <input type="date" v-model="eDate" id="eDate" @change="editDate()"/>
        </p>
        <p>Repeat:
            <label><input type="radio" name="eR" value="Daily" :checked=" this.e.date[0].$.repeat === 'Daily'" @change="editRepeat($event)"/>Daily</label>
            <label><input type="radio" name="eR" value="Weekly" :checked=" this.e.date[0].$.repeat === 'Weekly'" @change="editRepeat($event)"/>Weekly</label>
            <label><input type="radio" name="eR" value="Monthly" :checked=" this.e.date[0].$.repeat === 'Monthly'" @change="editRepeat($event)"/>Monthly</label>
        </p><br/>
        <label>Start Time: <input type="time" v-model="eStart" id="eStart" @change="editStartTime($event)"/></label>
        <label>End Time: <input type="time" v-model="eEnd" id="eEnd"  @change="editEndTime($event)"/></label><br/>
        <label><input v-model="e.venue[0]" placeholder="Venue" type="text"  @change="editVenue" maxlength="25"/></label><br/>
        <p>Guests:</p>
        <ul v-for="guest in g" :key="guest">
            <li>Name: <input type="text" :guest="guest" v-model="guest.name[0]" @change="editG(guest.name[0],guest.email[0])" maxlength="50"/> Email:<input type="text" :guest="guest" v-model="guest.email[0]" @change="editG(guest.name[0],guest.email[0])" maxlength="50"/><span class="btn" :guest="guest" @click="delG(guest.name[0])"><img src="./img/user-minus-solid.svg" class="ico"/></span></li>
        </ul>
        <br/><span class="btn" @click="addG"><img src="./img/user-plus-solid.svg" class="ico"/></span><br/>
        <label><textarea v-model="e.description[0]" placeholder="Description" @change="editDescription" rows="4" cols="80" maxlength="255"></textarea></label><br/>
        <span class="btn" @click="add()"><img src="./img/calendar-plus-solid.svg" class="ico"/></span>
      </div>
  </div>
</template>
<script>
export default {
    name: 'AddEvent',
    props: ['uid', 'schid'],
    data(){
        return {
            e: {
                "$": {
                    "id": ""
                },
                "title": [
                    ""
                ],
                "type": [
                    "Event"
                ],
                "date": [
                    {
                        "$": {
                            "repeat": "Daily"
                        },
                        "day": [
                            ""
                        ],
                        "month": [
                            ""
                        ],
                        "startingTime": [
                            ""
                        ],
                        "endingTime": [
                            ""
                        ]
                    }
                ],
                "guests": [
                    {
                        "guest": [
                            {
                                "name": [
                                    ""
                                ],
                                "email": [
                                    ""
                                ]
                            }
                        ]
                    }
                ],
                "venue": [
                    ""
                ],
                "description": [
                    ""
                ]
            },
            newEvent: {},
            eDate: "",
            eStart: "",
            eEnd: "",
            errmsg: "",
            g: [],
            validTitle: false,
            validVenue: true,
            validDesc: true,
            validG: true,
            validDate: false,
            validstartTime: false,
            validendTime: false,
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
        editDate(){
            const eDate = document.getElementById('eDate');
            var d = eDate.value.split('-');
            this.e.date[0].day[0] = d[2];
            const m = Number(d[1]);
            switch (m) {
                case 1: this.e.date[0].month[0] = 'January'; break;
                case 2: this.e.date[0].month[0] = 'February'; break;
                case 3: this.e.date[0].month[0] = 'March'; break;
                case 4: this.e.date[0].month[0] = 'April'; break;
                case 5: this.e.date[0].month[0] = 'May'; break;
                case 6: this.e.date[0].month[0] = 'June'; break
                case 7: this.e.date[0].month[0] = 'July'; break;
                case 8: this.e.date[0].month[0] = 'August'; break;
                case 9: this.e.date[0].month[0] = 'September'; break;
                case 10: this.e.date[0].month[0] = 'October'; break;
                case 11: this.e.date[0].month[0] = 'November'; break;
                case 12: this.e.date[0].month[0] = 'December'; break;
            }
            this.validDate = true;
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
        add(){
            if(this.validTitle && this.validVenue && this.validDesc && this.validG && this.validDate){
                this.errmsg = '';
                this.e.$.id = this.uid.substr(0, 3) + (Date.now().toString()).substr(-3) + this.e.type[0].substr(0,3);
                this.e.guests[0].guest = this.g;
                this.newEvent['event'] = this.e;
                this.postReq(this.newEvent);
                this.$emit('added', this.newEvent);
            }
            else if(!this.validTitle){
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
            else if(!this.validDate){
                this.errmsg = 'Date is required.';
            }
            else if(!this.validstartTime && !this.validendTime){
                this.errmsg = 'Time is required.';
            }
        },
        postReq: function(bodyData){
            this.status = "post";
            const config = {
                method: "POST",
                headers: {"Content-Type": "application/json; charset=utf-8", 
                "Accept": "application/json"},
                body: JSON.stringify(bodyData)
            }
            fetch(this.src+this.uid+"/event", config)
            .then(resp => resp.json())
            .then(data =>(this.newEvent = data))
        },
    }
};
</script>


<style scoped>
</style>
