class Connection {
    _connectionID = {
        type: Number,
        value: null,
        required: true,
        unique: true
    };
    _connectionName = {
        type: String,
        value: null,
        required: true
    };
    _connectionCategory = {
        type: Number,
        value: null,
        required: true
    };
    _details = {
        type: String,
        value: null
    };
    _date = {
        type: 'datetime',
        value: null,
        required: true
    };
    get connectionID () {
        return this._connectionID;
    }
    get connectionName () {
        return this._connectionName;
    }
    get connectionCategory () {
        return this._connectionCategory;
    }
    get details () {
        return this._details;
    }
    get date () {
        return this._date;
    }


    set connectionID(value) {
        this._connectionID = value;
    }
    get thumbnail () {
        return this._thumbnail;
    }
    set connectionName(value) {
        this._connectionName = value;
    }
    set connectionCategory(value) {
        this._connectionCategory = value;
    }
    set details(value) {
        this._details = value;
    }
    set date(value) {
        this._date = value;
    }
}

module.exports = Connection;