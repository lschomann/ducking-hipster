
Backbone = require("backbone");

exports = (function(){

    var Adress_ = Backbone.Model.extend({
        urlRoot: "/rest/adress",
        defaults: {
            street: "",
            number: 0,
            city: "",
            zip: 0
        },
        validate: function(attrs){
            if (attrs.number < 1){
                return "Die Hausnummer muss größer 0 sein.";
            }
            if (attrs.zip.toString().length < 5){
                return "Die PLZ muss genau 5 Stellen haben.";
            }
            if (typeof attrs.street != "string"){
                return "Die Straße muss eine Zeichfolge sein.";
            }
            if (typeof attrs.city != "string"){
                return "Die Stadt muss eine Zeichenfolge sein.";
            }
        }
    });

    var Room_ = Backbone.Model.extend({
        urlRoot: "/rest/room",
        defaults: {
            desc: "",
            number: 0,
            floor: 0,
            capacity: 0
        },
        validate: function(attrs){
            // do something here
        }
    });

    return {
        Adress:     Adress_,
        Room:       Room_
    };
})();
