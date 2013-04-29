"use strict";
/*
 * All routes associated with accessing or manipulating data in the database should go in here.
 * E.g.: Get all rooms entries or change a lecturer's name.
 *
 */


var _ = require("underscore");
var path = require("path");
var DataModel = require(path.join(__dirname, "..", "datamodel", "datamodel"));
var Passport = require("passport");


module.exports = function(app){

    /*******************************
     *** BEGIN Utility functions ***/

    /*
     * GET Generate test data
     */

    app.get('/rest/gen-data/', function(req, res){
        var abc = "abcdefghijklmnopqrstuvwxyz���ABCDEFGHIJKLMNOPQRSTUVWXYZ���";

        var pickAsMany = function(from, howMany){
            var L = [];
            var from_len = from.length;
            for(var i = 0; i < howMany; ++i){
                L.push(from[_.random(from_len)]);
            }
            return L.join("");
        };

        var obj;
        var maxEntries = 100;
        var j;
        while(j < maxEntries){
            obj = req.models.room.create(
                [{desc: pickAsMany(abc, 45),
                    number: _.random(500),
                    floor: _.random(100),
                    capacity: _.random(2000) }],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }

        j = 0;
        while(j < maxEntries){
            obj = req.models.address.create(
                [ { street:pickAsMany(abc, 45),
                    number:_.random(500),
                    city:_.random(200),
                    zip:_.random(500)        }],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }

        j = 0;
        while(j < maxEntries){
            obj = req.models.location.create(
                [ { name: pickAsMany(abc, 45) } ],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }

        j = 0;
        while(j < maxEntries){
            obj = req.models.role.create(
                [ { desc: pickAsMany(abc, 16) } ],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }

        j = 0;
        while(j < maxEntries){
            obj = req.models.permission.create(
                [ { desc: pickAsMany(abc, 6) + "::" + pickAsMany(abc, 8) + "::" + pickAsMany(abc, 6) } ],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }

        j = 0;
        while(j < maxEntries){
            obj = req.models.person.create(
                [ { fname: pickAsMany(abc, 15),
                    lname: pickAsMany(abc, 25),
                    email: pickAsMany(abc, 20) + "@" + pickAsMany(abc, 14) + "." + pickAsMany(abc, 3) }],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }

        j = 0;
        while(j < maxEntries){
            obj = req.models.resource.create(
                [ { desc: pickAsMany(abc, 15),
                    number: _.random(1235) }],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }

        j = 0;
        while(j < maxEntries){
            obj = req.models.resource_kind.create(
                [ { desc: pickAsMany(abc, 15)}],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }

        j = 0;
        while(j < maxEntries){
            obj = req.models.entry.create(
                [ { begin: (new Date()).toISOString(), end: (new Date()).toISOString()}],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }

        j = 0;
        while(j < maxEntries){
            obj = req.models.building.create(
                [ { desc: pickAsMany(abc, 25)}],
                function(err, items){
                    !err && res.json((items[0]));
                }
            );
            j++;
        }
    });

    app.get("/rest/drop-data/", function(req, res){
        
    });

     /**** END Utility functions ****
     *******************************/

    /******************
     *** BEGIN Room ***/

    /*
     * GET a form to test all the following functionnality, i.e. GET, POST, PUT, DELETE
     */

    app.get('/rest/room/testform', function(req, res){
        //res.render('testform__rest__room', {'id': req.params.id});
        var url = '/rest/room/';
        res.render(
            'testrest.jade', {
                content: { title: "Test form for model 'room' CRUD methods."},
                model: 'room',
                forms: {
                    getAll: {
                        title: "Get all",
                        id: 'get-all',
                        action: url,
                        method: 'GET',
                        fields: []
                    },
                    getOne: {
                        title: 'Get by ID',
                        id: 'get-one',
                        action: url,
                        method: 'GET',
                        fields: [
                            { modelField: 'id', class: 'entry_id', type: 'text', placeholder: 'Entry ID', name: 'entry_id' }
                        ]
                    },
                    create: {
                        title: 'Create',
                        id: 'create',
                        action: url,
                        method: 'POST',
                        fields: [
                            { modelField: 'desc', class: 'desc', type: 'text', placeholder: 'Description', name: 'desc' },
                            { modelField: 'number', class: 'number', type: 'text', placeholder: 'Number', name: 'number'},
                            { modelField: 'floor', class: 'floor', type: 'text', placeholder: 'Floor', name: 'floor' },
                            { modelField: 'capacity', class: 'capacity', type: 'text', placeholder: 'Capacity', name: 'capacity' }
                        ]
                    },
                    update: {
                        title: 'Update',
                        id: 'update',
                        action: url,
                        method: 'PUT',
                        fields: [
                            { modelField: 'id', class: 'entry_id', type: 'text', placeholder: 'Entry ID', name: 'entry_id' },
                            { modelField: 'desc', class: 'desc', type: 'text', placeholder: 'Description', name: 'desc' },
                            { modelField: 'number', class: 'number', type: 'text', placeholder: 'Number', name: 'number'},
                            { modelField: 'floor', class: 'floor', type: 'text', placeholder: 'Floor', name: 'floor' },
                            { modelField: 'capacity', class: 'capacity', type: 'text', placeholder: 'Capacity', name: 'capacity' }
                        ]
                    },
                    delete: {
                        title: 'Delete',
                        id: 'delete',
                        action: url,
                        method: 'DELETE',
                        fields: [
                            { modelField: 'id', class: 'entry_id', type: 'text', placeholder: 'Entry ID', name: 'entry_id' }
                        ]
                    }
                }
            });
    });

    /*
     * GET the Room object specified by *id*.
     */

    app.get('/rest/room/:id', function(req, res){
        req.models.room.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });
    
    /*
     * GET all Room objects.
     */

    app.get('/rest/room/', function(req, res){
        req.models.room.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new Room entry on the database. Return newly created item's id.
     */

    app.post('/rest/room/', function(req, res){
        req.models.room.create(
            [{desc: req.body.desc,
                number: req.body.number,
                floor: req.body.floor,
                capacity: req.body.capacity }],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });
    
    /*
     * PUT Update the Room entry of the given *id*.
     */

    app.put('/rest/room/:id', function(req, res){
        req.models.room.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].desc = req.body.desc || findings[0].desc;
                findings[0].number = req.body.number || findings[0].number;
                findings[0].floor = req.body.floor || findings[0].floor;
                findings[0].capacity = req.body.capacity || findings[0].capacity;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    app.delete('/rest/room/:id', function(req, res){
        req.models.room.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });

    /*** END Room ***
     ****************/


    /********************
     *** BEGIN Address ***/

    /*
     * GET the Address object specified by *id*.
     */


    app.get('/rest/address/:id', function(req, res){
        req.models.address.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });
    /*
     * GET all Address objects.
     */

    app.get('/rest/address/', function(req, res){
        req.models.address.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new Address entry on the database. Return newly created item's id.
     */

    app.post('/rest/address/', function(req, res){
        req.models.address.create(
            [{street: req.body.street,
                number: req.body.number,
                city: req.body.city,
                zip: req.body.zip }],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

    /*
     * PUT Update the Address entry of the given *id* with the given values.
     */
    app.put('/rest/address/:id', function(req, res){
        req.models.address.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].street = req.body.street || findings[0].street;
                findings[0].number = req.body.number || findings[0].number;
                findings[0].city = req.body.city || findings[0].city;
                findings[0].zip = req.body.zip || findings[0].zip;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    /*
     * DELETE Delete the Address entry of the given *id*.
     */
    app.delete('/rest/address/:id', function(req, res){
        req.models.address.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });

    /*** END Address ***
     *******************/


    /********************
     *** BEGIN Entry ***/

    /*
     * GET the Entry object specified by *id*.
     *
     * The dates contained in an Entry are returned as ISO UTC strings.
     * Convert them to timezone-aware Date objects like so:
     *      new Date(Date.UTC(year, month, day, hour, minute, second))
     */

    app.get('/rest/entry/:id', function(req, res){
        req.models.entry.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });

    /*
     * GET all Entry objects.
     *
     * The dates contained in an Entry are returned as ISO UTC strings.
     * Convert them to timezone-aware Date objects like so:
     *      new Date(Date.UTC(year, month, day, hour, minute, second))
     */

    app.get('/rest/entry/', function(req, res){
        req.models.entry.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * GET all entries as a timeline.js compatible data structure.
     */

    app.get('/rest/entry/as-timeline', function(req, res){
        var timeline = {
            "timeline":
            {
                "headline":"Sh*t People Say",
                "type":"default",
                "text":"People say stuff",
                "startDate":"2012,1,26",
                "date": [

                ]
            }
        };

        req.models.entry.find({}, function(err, findings){
            var rv = [],
                f,
                begin,
                end;

            for(var i in findings){
                f = findings[i];
                begin = f.getBegin();
                end = f.getEnd();
                timeline['timeline']['date'].push(
                    {
                        "startDate": begin.getYear() + "," + begin.getMonth() + "," + begin.getDay() + "," + begin.getHours() + "," + begin.getMinutes() + "," + begin.getSeconds(),
                        "endDate": end.getYear() + "," + end.getMonth() + "," + end.getDay() + "," + end.getHours() + "," + end.getMinutes() + "," + end.getSeconds(),
                        "headline":"Entry " + f.getId(),
                        "text":"<p>Runtime: " + begin.getDay() + "." + begin.getMonth() + "." + begin.getYear()
                                + begin.getHours() + ":" + begin.getMinutes() + ":" + begin.getSeconds() + " - "
                                + end.getDay() + "." + end.getMonth() + "." + end.getYear()
                                + end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds() + "</p>",
                        "data": JSON.stringify(f)
                    }
                );
            }
        });
    })

    /*
     * POST create a new Entry entry on the database. Return newly created item's id.
     *
     * Dates are parsed with Javascript's builtin *Date* constructor, then stringified
     * with *Date.toISOString* resulting in a timezone agnostic UTC date/time.
     */

    app.post('/rest/entry/', function(req, res){
        req.models.entry.create(
            [{begin: (new Date(req.body.begin)).toISOString(),
                end: (new Date(req.body.end)).toISOString()}],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

    /*
     * PUT Update the Entry entry of the given *id* with the given values.
     *
     * Dates are parsed with Javascript's builtin *Date* constructor, then stringified
     * with *Date.toISOString* resulting in a timezone agnostic UTC date/time.
     */

    app.put('/rest/entry/:id', function(req, res){
        req.models.entry.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].begin = (new Date(req.body.begin)).toISOString() || findings[0].begin;
                findings[0].number = (new Date(req.body.end)).toISOString() || findings[0].end;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    /*
     * DELETE Delete the Entry entry of the given *id*.
     */
    app.delete('/rest/entry/:id', function(req, res){
        req.models.entry.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });

    /*
     * GET Access the related items in Entry.rooms
     */

    app.get('/rest/entry/:id/rooms/', function(req, res){
        req.models.entry.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getRooms()));
        });
    });
    
    app.post('/rest/entry/:id/rooms/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
        
        req.models.entry.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            req.models.room.find({id: ids}, function(err, findings_){ 
                if (err) { 
                    res.send(500, {'error': err});
                } else {
                    findings[0].setRooms(findings_, function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            }); 
        });
     });

    /*
     * GET Access the related items in Entry.participants
     */

    app.get('/rest/entry/:id/people/', function(req, res){
        req.models.entry.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getParticipants()));
        });
    });
     
    app.post('/rest/entry/:id/participants/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
        
        req.models.entry.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            req.models.people.find({id: ids}, function(err, findings_){ 
                if (err) { 
                    res.send(500, {'error': err});
                } else {
                    findings[0].setParticipants(findings_, function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            }); 
        });
     });

    /*
     * GET Access the related items in Location.people
     */

    app.get('/rest/entry/:id/resources/', function(req, res){
        req.models.entry.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getResources()));
        });
    });
     
    app.post('/rest/entry/:id/resources/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
        
        req.models.entry.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            req.models.resource.find({id: ids}, function(err, findings_){ 
                if (err) { 
                    res.send(500, {'error': err});
                } else {
                    findings[0].setResources(findings_, function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            }); 
        });
     });

    /*** END Entry ***
     *****************/

    /******************
     *** BEGIN Role ***/

    /*
     * GET the Role object specified by *id*.
     */

    app.get('/rest/role/:id', function(req, res){
        req.models.role.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });
    /*
     * GET all Role objects.
     */

    app.get('/rest/role/', function(req, res){
        req.models.role.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new Role entry on the database. Return newly created item's id.
     */

    app.post('/rest/role/', function(req, res){
        req.models.role.create(
            [{desc: req.body.desc}],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

    /*
     * PUT Update the Role entry of the given *id* with the given values.
     */
    app.put('/rest/role/:id', function(req, res){
        req.models.role.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].desc = req.body.desc || findings[0].desc;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    /*
     * DELETE Delete the Role entry of the given *id*.
     */
    app.delete('/rest/role/:id', function(req, res){
        req.models.role.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });


    /*** END Role ***
     ****************/


    /************************
     *** BEGIN Permission ***/

    /*
     * GET the Permission object specified by *id*.
     */

    app.get('/rest/permission/:id', function(req, res){
        req.models.permission.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });
    /*
     * GET all Permission objects.
     */

    app.get('/rest/permission/', function(req, res){
        req.models.permission.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new Permission entry on the database. Return newly created item's id.
     */

    app.post('/rest/permission/', function(req, res){
        req.models.permission.create(
            [{desc: req.body.desc}],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

    /*
     * PUT Update the Permission entry of the given *id* with the given values.
     */
    app.put('/rest/permission/:id', function(req, res){
        req.models.permission.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].desc = req.body.desc || findings[0].desc;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    /*
     * DELETE Delete the Permission entry of the given *id*.
     */
    app.delete('/rest/permission/:id', function(req, res){
        req.models.permission.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });

    /*
     * GET Access the related items in Permission.roles
     */

    app.get('/rest/permission/:id/roles/', function(req, res){
        req.models.permission.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getRoles()));
        });
    });
    
    /*
     * POST Update relation Permission.roles
     */
     
    app.post('/rest/permission/:id/roles/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
         
        req.models.permission.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                req.models.role.find({id: ids}, function(err, findings_){ 
                    if (err) { 
                        res.send(500, {'error': err});
                    } else {
                        findings[0].setRoles(findings_, function(err){
                            if (err){
                                res.send(500, {'error': err});
                            } else {
                                res.send(200);
                            }
                        });
                    }
                });
            }
        });
     });


    /*** END Permission ***
     **********************/


    /********************
     *** BEGIN Person ***/

    /*
     * GET the Person object specified by *id*.
     */

    app.get('/rest/person/:id', function(req, res){
        req.models.person.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });

    /*
     * GET all Person objects.
     */

    app.get('/rest/person/', function(req, res){
        req.models.person.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new Person entry on the database. Return newly created item's id.
     */

    app.post('/rest/person/', function(req, res){
        req.models.person.create(
            [{fname: req.body.fname, lname: req.body.lname, email: req.body.email}],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

    /*
     * PUT Update the Person entry of the given *id* with the given values.
     */
    app.put('/rest/person/:id', function(req, res){
        req.models.person.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].fname = req.body.fname || findings[0].fname;
                findings[0].lname = req.body.lname || findings[0].lname;
                findings[0].fname = req.body.email || findings[0].email;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    /*
     * DELETE Delete the Person entry of the given *id*.
     */
    app.delete('/rest/person/:id', function(req, res){
        req.models.person.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });


    /*
     * GET Access the related items in Person.address
     */

    app.get('/rest/person/:id/address/', function(req, res){
        req.models.person.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getAddress()));
        });
    });

    /*
     * POST Update relation Person.address
     */
     
    app.post('/rest/person/:id/address/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
        
        req.models.person.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            req.models.address.find({id: ids}, function(err, findings_){ 
                if (err) { 
                    res.send(500, {'error': err});
                } else {
                    findings[0].setAddress(findings_[0], function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            }); 
        });
     });

    /*
     * GET Access the related items in Person.roles
     */

    app.get('/rest/person/:id/roles/', function(req, res){
        req.models.person.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getRoles()));
        });
    });

    /*
     * POST Update relation Person.roles
     */
     
    app.post('/rest/person/:id/roles/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
         
        req.models.person.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            req.models.role.find({id: ids}, function(err, findings_){ 
                if (err) { 
                    res.send(500, {'error': err});
                } else {
                    findings[0].setRoles(findings_, function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            }); 
        });
     });


    /*** END Person ***
     ******************/


    /********************
     *** BEGIN Resource ***/

    /*
     * GET the Resource  object specified by *id*.
     */

    app.get('/rest/resource/:id', function(req, res){
        req.models.resource.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });

    /*
     * GET all Resource  objects.
     */

    app.get('/rest/resource/', function(req, res){
        req.models.resource.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new Resource  entry on the database. Return newly created item's id.
     */

    app.post('/rest/resource/', function(req, res){
        req.models.resource.create(
            [{desc: req.body.desc, number: req.body.number}],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

    /*
     * PUT Update the Resource  entry of the given *id* with the given values.
     */
    app.put('/rest/resource/:id', function(req, res){
        req.models.resource.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].fname = req.body.desc || findings[0].desc;
                findings[0].lname = req.body.number || findings[0].number;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    /*
     * DELETE Delete the Resource  entry of the given *id*.
     */
    app.delete('/rest/resource/:id', function(req, res){
        req.models.resource.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });

    /*
     * GET Access the related items in Resource.kind
     */

    app.get('/rest/resource/:id/kind/', function(req, res){
        req.models.resource.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getKind()));
        });
    });
    
    /*
     * POST Update relation Resource.kind
     */
     
    app.post('/rest/resource/:id/kind/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
        
        req.models.resource.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            req.models.resource_kind.find({id: ids}, function(err, findings_){ 
                if (err) { 
                    res.send(500, {'error': err});
                } else {
                    findings[0].setKind(findings_[0], function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            }); 
        });
     });


    /*** END Resource ***
     ********************/


    /**************************
     *** BEGIN ResourceKind ***/

    /*
     * GET the ResourceKind object specified by *id*.
     */

    app.get('/rest/resource_kind/:id', function(req, res){
        req.models.resource_kind.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });

    /*
     * GET all ResourceKind objects.
     */

    app.get('/rest/resource_kind/', function(req, res){
        req.models.resource_kind.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new ResourceKind entry on the database. Return newly created item's id.
     */

    app.post('/rest/resource_kind/', function(req, res){
        req.models.resource_kind.create(
            [{desc: req.body.desc, number: req.body.number}],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

    /*
     * PUT Update the ResourceKind entry of the given *id* with the given values.
     */
    app.put('/rest/resource_kind/:id', function(req, res){
        req.models.resource_kind.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].desc = req.body.desc || findings[0].desc;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    /*
     * DELETE Delete the ResourceKind entry of the given *id*.
     */
    app.delete('/rest/resource_kind/:id', function(req, res){
        req.models.resource_kind.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });

    /*** END ResourceKind ***
     ************************/


    /**************************
     *** BEGIN Location ***/

    /*
     * GET the Location object specified by *id*.
     */

    app.get('/rest/location/:id', function(req, res){
        req.models.location.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });

    /*
     * GET all Location objects.
     */

    app.get('/rest/location/', function(req, res){
        req.models.location.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new Location entry on the database. Return newly created item's id.
     */

    app.post('/rest/location/', function(req, res){
        req.models.location.create(
            [{name: req.body.name}],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

    /*
     * PUT Update the Location entry of the given *id* with the given values.
     */
    app.put('/rest/location/:id', function(req, res){
        req.models.location.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].name = req.body.name || findings[0].name;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    /*
     * DELETE Delete the Location entry of the given *id*.
     */
    app.delete('/rest/location/:id', function(req, res){
        req.models.location.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });

    /*
     * GET Access the related item in Location.address
     */

    app.get('/rest/location/:id/address/', function(req, res){
        req.models.location.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getAddress()));
        });
    });
    
    /*
     * POST Update relation Location.address
     */
     
    app.post('/rest/location/:id/address/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
        
        req.models.location.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            req.models.address.find({id: ids}, function(err, findings_){
                if (err) {
                    res.send(500, {'error': err});
                } else {
                    findings[0].setAddress(findings_[0], function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            });
        });
     });

    /*
     * GET Access the related items in Location.buildings
     */

    app.get('/rest/location/:id/buildings/', function(req, res){
        req.models.location.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getBuildings()));
        });
    });

    /*
     * POST Update relation Location.buildings
     */
     
    app.post('/rest/location/:id/buildings/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
         
        req.models.location.find({id: req.params.id}, function(err, findings){
            req.models.buildings.find({id: ids}, function(err, findings_){ 
                if (err) { 
                    res.send(500, {'error': err});
                } else {
                    findings[0].setBuildings(findings, function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            }); 
        });
     });

    /*
     * POST Update relation Location.people
     */
     
    app.post('/rest/location/:id/people/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
         
        req.models.location.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            req.models.people.find({id: ids}, function(err, findings_){ 
                if (err) { 
                    res.send(500, {'error': err});
                } else {
                    findings[0].setPeople(findings_, function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            }); 
        });
     });


    /*
     * GET Access the related items in Location.people
     */

    app.get('/rest/location/:id/people/', function(req, res){
        req.models.location.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getPeople()));
        });
    });

    /*** END Location ***
     ********************/

    /**************************
     *** BEGIN Building ***/

    /*
     * GET the Building object specified by *id*.
     */

    app.get('/rest/building/:id', function(req, res){
        req.models.building.find( { id: parseInt(req.params.id, 10) } , function(err, findings){
            if (err){
                res.send(404, {'error': err});
            } else {
                res.json(findings[0]);
            }
        });
    });

    /*
     * GET all Building objects.
     */

    app.get('/rest/building/', function(req, res){
        req.models.building.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new Building entry on the database. Return newly created item's id.
     */

    app.post('/rest/building/', function(req, res){
        req.models.building.create(
            [{desc: req.body.desc}],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

    /*
     * PUT Update the Building entry of the given *id* with the given values.
     */
    app.put('/rest/building/:id', function(req, res){
        req.models.building.find({id: req.params.id}, function(err, findings){
            if (err){
                res.json({'error': err});
            } else {
                findings[0].desc = req.body.desc || findings[0].desc;
                findings[0].save();

                res.json((findings[0]));
            }
        });
    });

    /*
     * DELETE Delete the Building entry of the given *id*.
     */
    app.delete('/rest/building/:id', function(req, res){
        req.models.building.find({id: req.params.id}, function(err, findings){
            if (err){
                res.send(500, {'error': err});
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                    } else {
                        res.send(200);
                    }
                });
            }
        });
    });
    
    /*
     * GET Access the related items in Building.rooms
     */
    
    app.get('/rest/building/:id/rooms/', function(req, res){
        req.models.building.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            res.json(JSON.stringify(findings[0].getRooms()));
        });
    });
   
    /*
     * POST Update relation Building.rooms
     */
     
    app.post('/rest/building/:id/rooms/', function(req, res){
        var ids = req.body.ids.split(",");
        ids.forEach(function(obj, idx, arr){ arr[idx] = parseInt(obj, 10); } );
        
        req.models.building.find({id: parseInt(req.params.id, 10)}, function(err, findings){
            req.models.room.find({id: ids}, function(err, findings_){ 
                if (err) { 
                    res.send(500, {'error': err});
                } else {
                    findings[0].setRooms(findings_, function(err){
                        if (err){
                            res.send(500, {'error': err});
                        } else {
                            res.send(200);
                        }
                    });
                }
            });
        });
    });

    /*** END Building ***
     ********************/
}
