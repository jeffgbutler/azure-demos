function checkDuplicateAndExecute(contact, request, mssql, isUpdate) {
    var parms,
        sql = 'select id ' +
          'from contact ' +
          'where firstname = ? ' +
          '  and lastname = ? ' +
          '  and __deleted = 0';
    
    parms = [
        contact.firstname,
        contact.lastname
    ];
    
    if (isUpdate) {
        sql += ' and id <> ?';
        parms.push(contact.id);
    }

    mssql.query(sql, parms, {
        success : function (results) {
            if (results.length > 0) {
                request.respond(statusCodes.BAD_REQUEST, {error : 'Duplicate Contacts are not allowed'});
            } else {
                request.execute();
            }
        },
        error : function (err) {
            request.respond(statusCodes.INTERNAL_SERVER_ERROR, {error : err});
        }
    });
}

exports.validateAndExecute = function(contact, request, mssql, isUpdate) {
    var errors = [];

    if (contact.firstname === '') {
        errors.push('First Name is required');
    }

    if (contact.lastname === '') {
        errors.push('Last Name is required');
    }

    if (contact.contact_type === '') {
        errors.push('Contact Type is required');
    }

    if (errors.length === 0) {
        checkDuplicateAndExecute(contact, request, mssql, isUpdate);
    } else {
        request.respond(statusCodes.BAD_REQUEST, {error : JSON.stringify(errors)});
    }
};
