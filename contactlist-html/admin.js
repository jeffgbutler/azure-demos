/*global $, WindowsAzure */
/*jslint browser: true, devel: true */

$(document).ready(function () {
    'use strict';

    var client = new WindowsAzure.MobileServiceClient('<<service URL here>>', '<<service key here>>');

    $('#initializeButton').click(function () {
        $.blockUI();
        client.invokeApi('initialize', {
            body : null,
            method : 'get'
        }).done(function (results) {
            $.unblockUI();
            alert(results.response);
        }, function (error) {
            $.unblockUI();
            alert(error.message);
        });
    });
});
