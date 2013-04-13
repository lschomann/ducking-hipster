/**
 * Created with JetBrains PhpStorm.
 * User: lschomann
 * Date: 13.04.13
 * Time: 01:45
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){

    var $showTimeline = $('#timeline');
    var $timeline = $('#timeline-embed');

    $showTimeline.click(function(){
        if($showTimeline.text() == 'Zeige Timeline'){
            $timeline.fadeIn();
            createStoryJS({
                type:       'timeline',
                width:      '100%',
                height:     '700',
                source:     'javascripts/example.json',
                embed_id:   'timeline-embed'           // ID of the DIV you want to load the timeline into
            })
            $(this).empty().append('Verberge Timeline')
        }
        else {
            $timeline.fadeOut();
            $timeline.empty();
            $(this).empty().append('Zeige Timeline')
        }
    });
});
