
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { content: { title: 'Raumverwaltung' } });
};