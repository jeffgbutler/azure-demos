exports.get = function(request, response) {
    var mssql = request.service.mssql,
        sql = 'select a.id as contactid, firstname, lastname, text as contacttype ' +
              'from Contact a join ContactType b on a.contact_type = b.id ' +
              "where a.__deleted = 0 "
              'order by lastname, firstname';
    
    mssql.query(sql, {
        success : function (results) {
            response.status(statusCodes.OK).send(JSON.stringify(results));
        },
        error : function (err) {
            response.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
        }
    });
};
