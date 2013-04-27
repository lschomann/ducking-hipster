

exports = (function(){
    var setup = function (db, models) {
        models.person = db.define(
            "person",
            {   fname:      { type: 'text', size: 255 },
                lname:      { type: 'text', size: 255 },
                email:      { type: 'text', size: 255 }     }
        );

        models.room = db.define(
            "room",
            {   desc:       {type: 'text', size: 255},
                number:     Number,
                floor:      Number,
                capacity:   Number                      }
        );

        models.address = db.define(
            "address",
            {   street:     { type: 'text', size: 255},
                number:     Number,
                city:       { type: 'text', size: 255 },
                zip:        { type: 'text', size: 5}        }
        );

        models.entry = db.define(
            "entry",
            {   begin:  Date,
                end:    Date    }
        );

        models.resource = db.define(
            "resource",
            {   desc:       { type: 'text', size: 255 },
                kind:       Number,
                number:     Number                      }
        );

        models.resource_kind = db.define(
            "resource_kind",
            {   desc:       { type: 'text', size: 255 } }
        );

        models.location = db.define(
            "location",
            {   name:       { type: 'text', size: 255 } }
        );

        models.role = db.define(
            "role",
            {   desc: { type: 'text', size: 255 }   }
        );

        models.permission = db.define(
            "permission",
            {   desc: { type: 'text', size: 255 }   }
        );

        models.building = db.define(
            "building",
            {   desc: { type: 'text', size: 255 }   }
        );

        db.sync(function(err){ !err && console.log("syncing of models succesful!"); });
    }
})();