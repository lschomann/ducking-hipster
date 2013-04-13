/**
 * Created with JetBrains PhpStorm.
 * User: lschomann
 * Date: 13.04.13
 * Time: 01:45
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $('#timeline').click(function(){
        createStoryJS({
            type:       'timeline',
            width:      '100%',
            height:     '700',
            source:     'javascripts/example.json',
            embed_id:   'timeline-embed'           // ID of the DIV you want to load the timeline into
        });
    });
});
