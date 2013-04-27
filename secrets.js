/*
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>     DO NOT COMMIT    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 * This module is meant to contain all secret information, that must not be exposed to the public via
 * the source control. So under penalty of [insert something gruesome here] do __NOT__ commit this.
 */


var db_ = {
    type: "postgres",
    user: "postgres",
    pass: "uiaenrtd",
    host: "localhost",
    port: "",               // leave as empty string for default port
    database: "postgres"
};

var getDBConnectionString_ = function(){
    return db_.type + "://" + db_.user + ":" + db_.pass + "@" + db_.host + "/" + db_.database
}

var session_ = {
    secret: 'lkhlokgj5rgl5hnztglsdeerifdgh'
}

module.exports = {
    db: db_,
    session: session_,
    getDBConnectionString: getDBConnectionString_
};