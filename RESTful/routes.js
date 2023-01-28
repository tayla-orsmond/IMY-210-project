/*Tayla Orsmond u21467456*/
var router = (app,fs,xml2js) => {
    //API for scheduler DB
    //parser and builder for converting between xml and JSON
    var parser = new xml2js.Parser();
    var builder = new xml2js.Builder();
    //CONSTANTS
    const DBSRC = "index.json";//database file index
    //const src = 'xmlDB/sample_data.xml';//database file (example)
    //api endpoints (functions)
    /*
    
        GET

    */
    //GET schedules
    app.get('/schedule', (req, res) => {
        //read schedules JSON file
        fs.readFile(DBSRC, (err, data) => {
            if(err){
                throw err;
            }
            //send back response as JSON
            res.send(JSON.parse(data));
        })
    });
    //GET specific schedule by id
    app.get('/schedule/:id', (req, res) => {
        var reqid = req.params['id'];//request id
        fs.readFile(DBSRC, (err, data) => {
            if(err){
                throw err;
            }
            //get the whole file as obj
            var file = JSON.parse(data);
            var reqItem = null;
            for(const item of file.files){
                if(item != null && item.owner == reqid){//matching id
                    reqItem = item;
                    break;//first match
                }
            }
            //error handling
            if(reqItem == null){
                res.send("Requested item not found. Please try again, and ensure you have queried a valid id.");
            }
            else{
                const src = reqItem.path;
                //read schedule xml file
                fs.readFile(src, (e, d) => {
                    if(e){
                        throw e;
                    }
                    //parse xml into JS object
                    var schedule;
                    parser.parseString(d, (error, result) => {
                        if(error){
                            throw error;
                        }
                        schedule = result;
                    });
                    //send back response as JSON
                    res.send(JSON.stringify(schedule));
                });
            }
        });
    });
    //GET events of schedule
    app.get('/schedule/:id/events', (req, res) => {
        var reqid = req.params['id'];//request id
        fs.readFile(DBSRC, (err, data) => {
            if(err){
                throw err;
            }
            //get the whole file as obj
            var file = JSON.parse(data);
            var reqItem = null;
            for(const item of file.files){
                if(item != null && item.owner == reqid){//matching id
                    reqItem = item;
                    break;//first match
                }
            }
            //error handling
            if(reqItem == null){
                res.send("Requested item not found. Please try again, and ensure you have queried a valid id.");
            }
            else{
                const src = reqItem.path;
                //read schedule xml file
                fs.readFile(src, (e, d) => {
                    if(e){
                        throw e;
                    }
                    //parse xml into JS object
                    var schedule;
                    parser.parseString(d, (error, result) => {
                        if(error){
                            throw error;
                        }
                        schedule = result;
                    });
                    //send back response as JSON
                    if(schedule.schedule.event != null)
                        res.send(JSON.stringify(schedule.schedule.event));
                    else{
                        res.send(JSON.stringify([]));
                    }
                });
            }
        });
    });
    //GET specific event id
    app.get('/schedule/:id/events/:eid', (req, res) => {
        var reqid = req.params['id'];//request id
        var eid = req.params['eid'];
        fs.readFile(DBSRC, (err, data) => {
            if(err){
                throw err;
            }
            //get the whole file as obj
            var file = JSON.parse(data);
            var reqItem = null;
            for(const item of file.files){
                if(item != null && item.owner == reqid){//matching id
                    reqItem = item;
                    break;//first match
                }
            }
            //error handling
            if(reqItem == null){
                res.send("Requested item not found. Please try again, and ensure you have queried a valid id.");
            }
            else{
                const src = reqItem.path;
                //read schedule xml file
                fs.readFile(src, (e, d) => {
                    if(e){
                        throw e;
                    }
                    //parse xml into JS object
                    var schedule;
                    parser.parseString(d, (error, result) => {
                        if(error){
                            throw error;
                        }
                        schedule = result;
                    });
                    //send back response as JSON
                    var reqEvent = null;
                    for(const event of schedule.schedule.event){
                        if(event.$.id == eid){
                            reqEvent = event;
                        }
                    }
                    if(reqEvent == null){
                        res.send("Requested event not found. Please try again, and ensure you have queried a valid event id.");
                    }
                    else{
                        res.send(JSON.stringify(reqEvent));
                    }
                });
            }
        });
    });
    /*
    
        POST

    */
    //POST a new schedule (for new user)
    /*
        post req body looks like:
        {
            "owner": "Daddylonglegs"
        }
    
    */
    app.post('/schedule', (req, res) => {
        //error handling
        if(req.body == null || req.body.owner == ""){
            res.status(422).send("Invalid request. Please ensure all required fields are valid/ included.");
            return;
        }
        //get timestamp
        var d = new Date();
        var now = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        //trim owner name
        var owner = req.body.owner.trim();
        //get path
        var src = "xmlDB/" + owner + ".xml";
        var xml = '<?xml version="1.0"?><schedule user="'+ owner +'" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="validate.xsd"></schedule>';
        //create new index table entry
        var newschedule = {
            "id": "",
            "owner": owner,
            "title": owner + "'s Schedule",
            "path": src,
            "lastEdited": now
        }
        //create new schedule file
        fs.writeFile(src, xml, (e) => {
            if(e){
                throw e;
            }
        });
        //get index file to add into
        fs.readFile(DBSRC, (err, data) => {
            if(err){
                throw err;
            }
            //get the whole file as obj
            var file = JSON.parse(data);
            //count num of objects in JSON file and get new unique ID (new array place for object)
            var newid = file.files.length;
            //add new entry to index.json from req
            newschedule.id = newid + "-" + owner;
            //append new data to index.json
            file.files[newid] = newschedule;
            //write new data into file
            var updatedFile = JSON.stringify(file);
            fs.writeFile(DBSRC, updatedFile, (error) => {
                if(error){
                    throw error;
                }
            });
            //return updated list of data to user as JSON file
            //res.send(updatedFile);
            
            //read new schedule xml file
            fs.readFile(src, (e, d) => {
                if(e){
                    throw e;
                }
                //parse xml into JS object
                var schedule;
                parser.parseString(d, (error, result) => {
                    if(error){
                        throw error;
                    }
                    schedule = result;
                });
                //send back response as JSON
                res.send(JSON.stringify(schedule.schedule.event));
            });
        });
    });
    //POST a new event
    /*
        post req body looks like:
        {
            "$": {
                "id": ""
            },
            "title": [
                ""
            ],
            "type": [
                ""
            ],
            "date": [
                {
                    "$": {
                        "repeat": ""
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
        }    
    */
    app.post('/schedule/:id/event', (req, res) => {
        //error handling
        var reqid = req.params['id'];//request id
        fs.readFile(DBSRC, (err, data) => {
            if(err){
                throw err;
            }
            //get the whole file as obj
            var file = JSON.parse(data);
            var reqItem = null;
            for(const item of file.files){
                if(item != null && item.owner == reqid){//matching id
                    reqItem = item;
                    break;//first match
                }
            }
            //error handling
            if(reqItem == null){
                res.send("Requested item not found. Please try again, and ensure you have queried a valid id.");
            }
            else{
                const src = reqItem.path;
                //read schedule xml file
                fs.readFile(src, (e, d) => {
                    if(e){
                        throw e;
                    }
                    //parse xml into JS object
                    var schedule;
                    parser.parseString(d, (error, result) => {
                        if(error){
                            throw error;
                        }
                        schedule = result;
                    });
                    //get new schedule object from body
                    const event = req.body.event;
                    if(schedule.schedule.event != null){
                        var eid = schedule.schedule.event.length;
                        schedule.schedule.event[eid] = event;
                    }
                    else{
                        var eid = 0;
                        schedule.schedule = Object.assign(schedule.schedule, {"event": [event]});
                    }
                    //append it to schedule JSON file
                    //rebuild xml file from JSON
                    var xml = builder.buildObject(schedule);
                    //write xml file
                    fs.writeFile(src, xml, (er) => {
                        if(er){
                            throw er;
                        }
                    });
                    //send back response as JSON
                    res.send(JSON.stringify(schedule));
                });
            }
        });
    });
    /*
    
        PUT
    
    */
    app.put('/schedule/:id/event/:eid', (req, res) => {
        var reqid = req.params['id'];//request id
        var eid = req.params['eid'];
        fs.readFile(DBSRC, (err, data) => {
            if(err){
                throw err;
            }
            //get the whole file as obj
            var file = JSON.parse(data);
            var reqItem = null;
            for(const item of file.files){
                if(item != null && item.owner == reqid){//matching id
                    reqItem = item;
                    break;//first match
                }
            }
            //error handling
            if(reqItem == null){
                res.send("Requested item not found. Please try again, and ensure you have queried a valid id.");
            }
            else{
                const src = reqItem.path;
                //read schedule xml file
                fs.readFile(src, (e, d) => {
                    if(e){
                        throw e;
                    }
                    //parse xml into JS object
                    var schedule;
                    parser.parseString(d, (error, result) => {
                        if(error){
                            throw error;
                        }
                        schedule = result;
                    });
                    //send back response as JSON
                    var reqEvent = null;
                    var eIndex = 0;
                    if(schedule.schedule.event != null){
                        for(const event of schedule.schedule.event){
                            if(event.$.id == eid){
                                reqEvent = event;
                                break;
                            }
                            eIndex++;
                        }
                    }
                    if(reqEvent == null){
                        res.send("Requested event not found. Please try again, and ensure you have queried a valid event id.");
                    }
                    else{
                        //get new schedule object from body
                        const newEvent = req.body.event;
                        //append it to schedule JSON file
                        schedule.schedule.event[eIndex] = newEvent;
                        //rebuild xml file from JSON
                        var xml = builder.buildObject(schedule);
                        //write xml file
                        fs.writeFile(src, xml, (er) => {
                            if(er){
                                throw er;
                            }
                        });
                        //send back response as JSON
                        res.send(JSON.stringify(schedule.schedule.event[eIndex]));
                    }
                });
            }
        });
    });
    /*
    
        DELETE
    
    */
    //DELETE schedule (for example if someone logs out)
    app.delete('/schedule/:id', (req, res) =>{
        //remove array entry object based on ID using delete operator
        var reqid = req.params['id'];//request id
        fs.readFile(DBSRC, (err, data) => {
            if(err){
                throw err;
            }
            //get the whole file as obj
            var file = JSON.parse(data);
            //test if reqested item is in file
            var reqItem = null;
            var index = 0;//array index to delete from in file
            for(const item of file.files){
                if(item != null && item.owner == reqid){//matching id
                    reqItem = item;
                    break;//first match
                }
                index++;
            }
            //error handling
            if(reqItem == null){
                res.send("Requested item not found. Please try again, and ensure you have queried a valid id.");
            }
            else{
                const src = reqItem.path;
                //delete data found at request id
                fs.unlink(src, (e) =>{
                    if(e){
                        throw e;
                    }
                });
                //write new data into file
                var updatedData = JSON.stringify(file);
                fs.writeFile(src, updatedData, (error) => {
                    if(error){
                        throw error;
                    }
                });
                //return updated list of data to user as JSON file
                res.send(updatedData);
            }
        });
    });
    //DELETE event
    app.delete('/schedule/:id/event/:eid', (req, res) =>{
        var reqid = req.params['id'];//request id
        var eid = req.params['eid'];
        fs.readFile(DBSRC, (err, data) => {
            if(err){
                throw err;
            }
            //get the whole file as obj
            var file = JSON.parse(data);
            var reqItem = null;
            for(const item of file.files){
                if(item != null && item.owner == reqid){//matching id
                    reqItem = item;
                    break;//first match
                }
            }
            //error handling
            if(reqItem == null){
                res.send("Requested item not found. Please try again, and ensure you have queried a valid id.");
            }
            else{
                const src = reqItem.path;
                //read schedule xml file
                fs.readFile(src, (e, d) => {
                    if(e){
                        throw e;
                    }
                    //parse xml into JS object
                    var schedule;
                    parser.parseString(d, (error, result) => {
                        if(error){
                            throw error;
                        }
                        schedule = result;
                    });
                    //send back response as JSON
                    var reqEvent = null;
                    var eIndex = 0;
                    if(schedule.schedule.event != null){
                        for(const event of schedule.schedule.event){
                            if(event.$.id == eid){
                                reqEvent = event;
                                break;
                            }
                            eIndex++;
                        }
                    }
                    if(reqEvent == null){
                        res.send("Requested event not found. Please try again, and ensure you have queried a valid event id.");
                    }
                    else{
                        //append it to schedule JSON file
                        delete schedule.schedule.event[eIndex];
                        //rebuild xml file from JSON
                        var xml = builder.buildObject(schedule);
                        //write xml file
                        fs.writeFile(src, xml, (er) => {
                            if(er){
                                throw er;
                            }
                        });
                        //send back response as JSON
                        res.send(JSON.stringify(schedule));
                    }
                });
            }
        });
    });
};

module.exports = router;