/*
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>     DO NOT COMMIT    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 * This module is meant to contain all secret information, that must not be exposed to the public via
 * the source control. So under penalty of [insert something gruesome here] do __NOT__ commit this.
 *
 * > Sentence Temporaryly suspended due to development status :D
 */


var db_ = {
    type: "postgres",
    user: process.env.VCAP_SERVICES["postgresql-9.1"][0]["credentials"]["user"] || "postgres",
    pass: process.env.VCAP_SERVICES["postgresql-9.1"][0]["credentials"]["password"] || "uiaenrtd",
    host: process.env.VCAP_SERVICES["postgresql-9.1"][0]["credentials"]["host"] || "localhost",
    port: process.env.VCAP_SERVICES["postgresql-9.1"][0]["credentials"]["port"] || "",               // leave as empty string for default port
    database: process.env.VCAP_SERVICES["postgresql-9.1"][0]["credentials"]["name"] || "postgres"
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
