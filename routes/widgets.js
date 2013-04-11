/**
 * Created with JetBrains PhpStorm.
 * User: malte
 * Date: 04.04.13
 * Time: 20:50
 * To change this template use File | Settings | File Templates.
 */


/**
 * Any routes associated with the widgets should go in here.
 * E.g. The main application window and other windows.
 */


module.exports = function(app){
    
    /*
     * GET application login window
     */
     
     app.get('/login', function(req, res) {
         res.render('login.jade', {content: {title: 'Login'}});
     });

    /*
     * GET main application window.
     */

    app.get('/', function(req, res){
        res.render('index.jade', {content: {title: 'Ducking-hipster'}});
    });

    /*
     * GET home page.
     */

    app.get('/main', function(req, res){
        res.render('main.jade', {content: {title: 'Ducking-hipster'}});
    })
};
