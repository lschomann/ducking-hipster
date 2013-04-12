/**
 * Created with JetBrains PhpStorm.
 * User: lschomann
 * Date: 12.04.13
 * Time: 21:22
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(function(){
    $("#duck").fadeIn();
});

$("#duck").click(function(){

    var $loginArea       = $('#LoginArea');
    var duckMovingDistance    = $loginArea.offset().left - 300;

    $("#duck").animate({"left": "+="+duckMovingDistance}, "slow",function(){
        $('#loginSubmit').click();
    });
});