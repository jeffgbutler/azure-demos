var contactvalidator = require('../shared/contactvalidator.js');

function update(item, user, request) {
    // mssql is a global object in table scripts
    contactvalidator.validateAndExecute(item, request, mssql, true);
}