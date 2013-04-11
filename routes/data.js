
/*
 * All routes associated with accessing or manipulating data in the database should go in here.
 * E.g.: Get all rooms entries or change a lecturer's name.
 *
 */


DataModel = require("datamodel/datamodel");

// monkey patch Backbone.js to use postgres data store.
Backbone = require("backbone-postgres");

Passport = require("passport");


module.exports = function(app){

    /******************
     *** BEGIN Room ***/

    /*
     * GET all Room objects.
     */

    app.get('/rest/room/all', function(req, res){
        res.json({});
    });

    /*** END Room ***
     ****************/

    /********************
     *** BEGIN Adress ***/

    /*
     * GET All Adress objects.
     */

    app.get('/rest/adress/', function(req, res){
        res.json({});
    });

    /*
     * GET The Adress object that has the given id. Returns 404 Not Found if the id does not exist.
     */
    app.get('/rest/adress/(\d+)', function(req, res){
        var obj = DataModel.Adress.read({id: parseInt(req.body.params[0])});
        return res.json(obj.toJSON());
    });

    /*
     * POST Create Adress object with the given values. Return newly created object.
     */
    app.post('/rest/adress/', function(req, res){
        var obj = new DataModel.Adress({"street": req.body.street, "number": req.body.number,
                                        "city": req.body.city, "zip": req.body.zip});
        return obj.save();
    });

    /*
     * UPDATE Adress object with the given id.
     */
    app.put('/rest/adress/(\d+)', function(req, res){
        var obj = DataModel.Adress.read({id: parseInt(req.body.params[0])});
        return obj.save({"street": req.body.street, "number": req.body.number,
                         "city": req.body.city, "zip": req.body.zip});

    });

    /*
     * DELETE Adress object with the given id.
     */
    app.delete('/rest/adress/(\d+)', function(reg, res){
        var obj = DataModel.Adress.read({id:parseInt(reg.body.params[0])});
        return obj.delete();
    });

    /*** END Adress ***
     ******************/
};
