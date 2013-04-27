
/*
 * All routes associated with accessing or manipulating data in the database should go in here.
 * E.g.: Get all rooms entries or change a lecturer's name.
 *
 */


path = require("path");
DataModel = require(path.join(__dirname, "..", "datamodel", "datamodel"));
Passport = require("passport");


module.exports = function(app){

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
        var obj = req.models.room.find( { id: parseInt(req.params.id) } , function(err, findings){
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
        var objs = req.models.room.find({}, function(err, findings){
            res.json((findings));
        });
    });

    /*
     * POST create a new Room entry on the database. Return newly created item's id.
     */
    app.post('/rest/room/', function(req, res){
        var obj = req.models.room.create(
            [{desc: req.body.desc,
                number: req.body.number,
                floor: req.body.floor,
                capacity: req.body.capacity }],
            function(err, items){
                !err && res.json((items[0]));
            }
        );
    });

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
                return;
            } else {
                findings[0].remove(function(err){
                    if (err){
                        res.send(500, {'error': err});
                        return;
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
     *** BEGIN Adress ***/

    /*
     * GET All Adress objects.
     */

    app.get('/rest/address/', function(req, res){



    });

    /*
     * GET The Address object that has the given id. Returns 404 Not Found if the id does not exist.
     */
    app.get('/rest/address/:id', function(req, res){

    });

    /*
     * POST Create Address object with the given values. Return newly created object.
     */
    app.post('/rest/address/', function(req, res){
        var d = {"street": req.body.street, "number": req.body.number,
                                        "city": req.body.city, "zip": req.body.zip};
    });

    /*
     * UPDATE Address object with the given id.
     */
    app.put('/rest/address/:id', function(req, res){
        var d = {"street": req.body.street, "number": req.body.number,
                         "city": req.body.city, "zip": req.body.zip};
    });

    /*
     * DELETE Address object with the given id.
     */
    app.delete('/rest/address/:id', function(reg, res){
        var d = {id:parseInt(reg.body.params[0])};
    });

    /*** END Adress ***
     ******************/

    /********************
     ***  BEGIN Entry ***/

    app.get(
        '/rest/entry/',
        function(req, res){

    });

    app.post(
        '/rest/entry/',
        Passport.authenticate('local', { failureRedirect: '/login'}),
        function(req, res){
            res.json({});
        }
    )

    app.put(
        '/rest/entry/:id',
        Passport.authenticate('local', { failureRedirect: '/login'}),
        function(req, res){
            res.json({hello: "World"});
        }
    )

    app.delete(
        '/rest/entry/:id',
        Passport.authenticate('local', { failureRedirect: '/login'}),
        function(req, res){
            res.json({hello: "World"});
    });

    /*** END Entry ***
     *****************/
};
