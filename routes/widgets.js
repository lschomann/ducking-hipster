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
    
     // Main application window.
    app.get('/', ensureAuthenticated, function(req, res){
        res.render('index', {user: req.user, content: {title: 'Ducking-hipster'}});
    });
     
     // GET Login window
    app.get('/login', function(req, res){
      res.render('login', { user: req.user, message: req.session.messages, content: {title: 'Login'} });
    });
    
    // Logout redirect to Login
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
    
    // GET Main View
    app.get('/main', function(req, res){
        res.render('main.jade', {content: {title: 'Ducking-hipster'}});
    });
    
    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        else{res.redirect('/login')}
    }
};
