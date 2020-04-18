// const Connection = require('../models/ConnectionDB');

// const conn_events = require('./event.json');


// let self = {};
// let connections = [];
// let categories= ['Tech', 'Sports']

// conn_events.forEach(element => {
//     let connection = new Connection();
//     connection.connectionID = element.connectionID;
//     connection.connectionName = element.connectionName;
//     connection.category = element.category;
//     connection.details = element.category;
//     connection.location = element.location;
//     connection.date = element.date;
//     connections.push(connection);

// });


// self.getCategories = () => {
//     return categories;
// }

// self.getConnectionsByCategory = (category) => {
//     return connections.filter(obj => {
//         return obj.category === category
//     });
// }

// self.getConnectionsGroupedByCategory = () => {

//     let categories = self.getCategories();
//     let connections = {};
//     let connectionsSize = 0;

//     categories.forEach(element => {
//         connections[element] = self.getConnectionsByCategory(element);
//         connectionsSize+=connections[element].length||0;
//     });

//     return {connections: connections, length: connectionsSize};
// }


// self.getConnectionByID = (connectionID) => {
//     return connections.find(obj => {
//         return obj.connectionID === connectionID
//     });
// }

// module.exports = self;