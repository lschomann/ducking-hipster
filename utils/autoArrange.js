
var orm = require("orm");


exports.ArrangementError = function(msg){
    if (!(this instanceof exports.ArrangementError)){
        throw new Error("TypeError: constructor called without 'new' keyword.");
    }
    this.msg = msg;
}

exports.ArrangementError.prototype.toString = function(){
    return "ArrangementError: " + this.msg;
}


exports.autoArrange = function(entries, opts){
    var entries_len = entries.length;
    var conditions = exports.unpackConditions(entries);

    var iterations = opts_["iterations"];
    var n_members_per_generation = opts_["n_members_per_generation"];
    var mutation_rate = opts_["mutation_rate"];


    var survivors = [];
    var fitness_threshold = 0;
    for (var i = 0; i < iterations; ++i){
        var generation = exports.makeGeneration(entries, n_members_per_generation - survivors.length);
        generation.concat(survivors);

        var scores = [];
        for (var g = 0; g < generation.length; ++g){
            scores.push([g, exports.computeFitness(generation[g], conditions)]);
        }

        scores.sort(function(lhs, rhs){ return lhs[1] < rhs[1]; });

        survivors = [];
        var sum_of_survivor_scores = 0;
        for (var s = 0; s < scores.length; ++s){
            if (scores[s][1] > fitness_threshold){
                survivors.push(exports.mutate(generation[scores[s][0]], mutation_rate));
                sum_of_survivor_scores += scores[s][1];
            }
        }

        fitness_threshold = sum_of_survivor_scores / survivors.length;
    }
}

exports.computeFitness = function(entries, conditions){



}

exports.mutate = function(entries, mutation_rate){
    return entries;
}

exports.unpackConditions = function(entries){
    for(var e = 0; e < entries_len; ++e){
        var conditions_len = entries[e].conditions.length;
        var contenttype;
        var real_conditions = [];
        for (var c = 0; c < conditions_len; ++c){
            contenttype = entries[e].conditions[c].contenttype;

            orm.models[contenttype.modelname].find({ id: contenttype.connected_pk }, function(err, findings){
                if (err){
                    throw new exports.ArrangementError(err);
                } else if(findings.length == 0) {
                    throw new exports.ArrangementError("No entries found for contenttype pk " + contenttype.connected_pk.toString());
                } else if (findings.length > 1){
                    throw new exports.ArrangementError("TwitchingMatrixError: this should never happen.");
                }

                real_conditions.push(findings[0]);
            });
        }
    }
}

exports.sanitizeOptions = function(opts){
    var d = {};
    d["iterations"] = opts["iterations"] || 50;
    return d;
}