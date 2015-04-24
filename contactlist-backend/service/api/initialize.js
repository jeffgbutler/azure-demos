/*global statusCodes, exports */
/*jslint plusplus: true, sloppy: true */

var jobs = [];

function runNextJobOrEnd(request, response, jobNumber) {
    jobNumber++;
    if (jobNumber >= jobs.length) {
        response.status(statusCodes.OK).send('Database Initialized!');
    } else {
        jobs[jobNumber](request, response, jobNumber);
    }
}

function insertBusiness(request, response, jobNumber) {
    var table = request.service.tables.getTable('ContactType'),
        contactType = {
            text : 'Business'
        };

    table.insert(contactType, {
        success : function () {
            runNextJobOrEnd(request, response, jobNumber);
        },
        error : function (err) {
            response.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
        }
    });
}

function insertPersonal(request, response, jobNumber) {
    var table = request.service.tables.getTable('ContactType'),
        contactType = {
            text : 'Personal'
        };

    table.insert(contactType, {
        success : function () {
            runNextJobOrEnd(request, response, jobNumber);
        },
        error : function (err) {
            response.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
        }
    });
}

function clearContacts(request, response, jobNumber) {
    var mssql = request.service.mssql;
    mssql.query('delete from Contact', {
        success : function () {
            runNextJobOrEnd(request, response, jobNumber);
        },
        error : function (err) {
            response.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
        }
    });
}

function clearContactTypes(request, response, jobNumber) {
    var mssql = request.service.mssql;
    mssql.query('delete from ContactType', {
        success : function () {
            runNextJobOrEnd(request, response, jobNumber);
        },
        error : function (err) {
            response.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
        }
    });
}

exports.get = function (request, response) {
    jobs.push(clearContacts);
    jobs.push(clearContactTypes);
    jobs.push(insertBusiness);
    jobs.push(insertPersonal);

    jobs[0](request, response, 0);
};
