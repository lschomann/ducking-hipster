

function NoOverlapException(lhs, rhs){
    if (!(this instanceof NoOverlapException)){
        throw new Error("TypeError: constructor called without 'new' keyword.");
    }
    this.lhs = lhs;
    this.rhs = rhs;
}

NoOverlapException.prototype.toString = function(){
    return "No overlap between " + this.lhs.toString() + " and " + this.rhs.toString();
}


function TimeRange(entry){
    if (!(this instanceof TimeRange)){
        throw new Error("TypeError: constructor called without 'new' keyword.");
    }
    this.entry = entry;
}

TimeRange.prototype.toString = function(){
    return "TimeRange{begin=" + this.begin + ", end=" + this.end "}"
}

TimeRange.prototype.overlaps = function(other){
    return this.begin < other.end && this.end < other.begin;
}

TimeRange.prototype.getOverlap = function(other){
    if (this.overlaps(other)){
        return new TimeRange(Math.max.apply([this.begin, other.begin]), Math.min.apply([this.end, other.end]));
    }
    throw new NoOverlapException(this, other);
}