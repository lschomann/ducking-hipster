

exports.setup = function(db, models) {

    models.role = db.define(
        "role",
        {   desc: { type: "text", size: 255 }   }
    );

    models.permission = db.define(
        "permission",
        {   desc: { type: "text", size: 255 }   }
    );

    models.permission.hasMany("roles", models.role, {}, {reverse: "permissions"});

    models.address = db.define(
        "address",
        {   street:     { type: "text", size: 255},
            number:     Number,
            city:       { type: "text", size: 255 },
            zip:        { type: "text", size: 5}        }
    );

    models.person = db.define(
        "person",
        {   fname:      { type: "text", size: 255 },
            lname:      { type: "text", size: 255 },
            email:      { type: "text", size: 255 }     }
    );
    models.person.hasOne("address", models.address, {}, { reverse: 'inhabitants'});

    models.person.hasMany("roles", models.role, {}, {reverse: "members"});




    models.room = db.define(
        "room",
        {   desc:       {type: "text", size: 255},
            number:     Number,
            floor:      Number,
            capacity:   Number                      }
    );


    models.resource_kind = db.define(
        "resource_kind",
        {   desc:       { type: "text", size: 255 } }
    );

    models.resource = db.define(
        "resource",
        {   desc:       { type: "text", size: 255 },
            number:     Number                      }
    );
    models.resource.hasOne("kind", models.resource_kind);

    models.entry = db.define(
        "entry",
        {   begin:  Date,
            end:    Date    }
    );
    models.entry.hasMany("rooms", models.room, {}, {reverse: "entries"});

    models.entry.hasMany("participants", models.person, {}, { reverse: "entries"});

    models.entry.hasMany("resources", models.resource, {}, {reverse: "entries"});

    models.location = db.define(
        "location",
        {   name:       { type: "text", size: 255 } }
    );
    models.location.hasMany("buildings", models.building, {}, { reverse: "location"});

    models.location.hasMany("people", models.person, {}, { reverse: "location"});

    models.location.hasOne("address", models.address, {}, {reverse: "location"});

    models.building = db.define(
        "building",
        {   desc: { type: "text", size: 255 }   }
    );

    models.building.hasMany("rooms", models.room);

    db.sync(function(err){ !err && console.log("syncing of models succesful!"); });
};
