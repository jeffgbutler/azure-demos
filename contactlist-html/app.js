/*global $, WindowsAzure, TableTools */
/*jslint unparam: true, browser: true, devel: true */

$(document).ready(function () {
    'use strict';

    var client = new WindowsAzure.MobileServiceClient('<<service URL here>>', '<<service key here>>'),
        contactTable = $('#contactTable').DataTable({
            order : [[1, 'asc'], [0, 'asc']],
            dom: 'T<"clear">lfrtip',
            tableTools : {
                sRowSelect : "single",
                aButtons : []
            }
        });

    function clearForm() {
        $('#contactId').val('');
        $('#firstName').val('');
        $('#lastName').val('');
        $('#deleteButton').hide();
        $('#updateButton').hide();
    }

    function fillinFormFromSelectedRow(rowData) {
        var contactTypeId;
        $('#firstName').val(rowData[0]);
        $('#lastName').val(rowData[1]);
        // find option value by the text of the contact type
        contactTypeId = $('#contactType option').filter(function () {
            return $(this).html() === rowData[2];
        }).val();
        $('#contactType').val(contactTypeId);
        $('#contactId').val(rowData[3]);
        $('#deleteButton').show();
        $('#updateButton').show();
    }

    $('#contactTable').click(function () {
        var oTT = TableTools.fnGetInstance('contactTable'),
            aData = oTT.fnGetSelectedData();
        if (aData.length === 0) {
            clearForm();
        } else {
            fillinFormFromSelectedRow(aData[0]);
        }
    });

    function initializeContactTypes() {
        $.blockUI();
        var table = client.getTable('ContactType');
        table.orderBy('text').read().then(function (results) {
            $(results).each(function () {
                var option = '<option value="' + this.id + '">' + this.text + '</option>';
                $('#contactType').append(option);
            });
        });
        $.unblockUI();
    }

    function refreshContactTable() {
        $.blockUI();
        client.invokeApi('getcontacts', {
            body : null,
            method : 'get'
        }).done(function (results) {
            contactTable.clear();
            $($.parseJSON(results.response)).each(function () {
                contactTable.row.add([
                    this.firstname,
                    this.lastname,
                    this.contacttype,
                    this.contactid
                ]);
            });
            contactTable.draw();
            clearForm();
            $.unblockUI();
        }, function (error) {
            alert(error.message);
            $.unblockUI();
        });
    }

    $('#addButton').click(function () {
        var table = client.getTable('Contact');
        table.insert({
            firstname : $('#firstName').val(),
            lastname : $('#lastName').val(),
            contact_type : $('#contactType').val()
        }).done(function (result) {
            clearForm();
            refreshContactTable();
        }, function (error) {
            alert('Error: ' + error);
        });
    });

    $('#deleteButton').click(function () {
        var table = client.getTable('Contact');
        table.del({
            id : $('#contactId').val()
        }).done(function (result) {
            clearForm();
            refreshContactTable();
        }, function (error) {
            alert('Error: ' + error);
        });
    });

    $('#updateButton').click(function () {
        var table = client.getTable('Contact');
        table.update({
            id : $('#contactId').val(),
            firstname : $('#firstName').val(),
            lastname : $('#lastName').val(),
            contact_type : $('#contactType').val()
        }).done(function (result) {
            clearForm();
            refreshContactTable();
        }, function (error) {
            alert('Error: ' + error);
        });
    });

    initializeContactTypes();
    refreshContactTable();
});
