const model = require('./index.js')

var connectionSchema = new model.mongoose.Schema({
        connectionID: {
            type: Number,
            value: null,
            required: true,
            unique: true
        },
        connectionName : {
            type: String,
            value: null,
            required: true
        },
        connectionCategory : {
            type: String,
            value: null,
            //required: true
        },
        details : {
            type: String,
            value: null
        },
        date : {
            type: Date,
            value: null,
            required: true
        }
});

var Connection = model.mongoose.model('Connection', connectionSchema);





function getConnections(cb){

    Connection.aggregate([{
        $group: {
            _id : "$category",
            //connectionID: { $addToSet: '$connectionID'},
            connectionName: { $addToSet: { connectionName: '$connectionName', connectionID: '$connectionID' } },
            details: { $addToSet: '$details' },
            location: { $addToSet: '$location' },
            date: { $addToSet: '$date' },                
        }
    }]).then(function(data){
        //console.log(data[0].connectionName)
        cb(data)
    });
}


function getConnection(connectionID, cb){
    Connection.find({ connectionID: connectionID }).then(function(data){
        console.log(data)
                cb(data);
        //         //if (err) return handleError(err);
        //         //return data;
        });

}




module.exports = {
    Connection: Connection,
    getConnections: getConnections,
    getConnection: getConnection
}