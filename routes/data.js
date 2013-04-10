/**
 * Created with JetBrains PhpStorm.
 * User: malte
 * Date: 07.04.13
 * Time: 14:51
 * To change this template use File | Settings | File Templates.
 */

/*
 * All routes associated with accessing or manipulating data in the database should go in here.
 * E.g.: Get all rooms entries or change a lecturer's name.
 *
 */

/*
 * GET all rooms.
 */



module.exports = function(app){

    /*
     * GET all rooms as objects.
     */

    app.get('/rest/getRooms', function(req, res){
        res.json({});
    });
};
