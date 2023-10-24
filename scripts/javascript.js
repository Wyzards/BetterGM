import { Role } from "./role.js";
import { Database } from "./database.js";

$(document).ready(function () {
    updateTable().then(function () {
        window.onclick = function (event) {
            if ($(event.target).is($("#add-employee-modal")))
                $("#add-employee-modal").css("display", "none");
            if ($(event.target).is($("#show-employee-modal")))
                $("#show-employee-modal").css("display", "none");
        }

        $.post({
            url: "../database/ajax.php",
            data: { FUNCTION: "GET_ROLE_LIST" },
            success: function (response) {
                var roles = JSON.parse(response);
                roles.forEach((role, i) => {
                    $("#add-employee-role-select").append("<option>" + role + "</option>");
                });
            }
        });
    });
});

function removeEmployee(Emp) {
    var database = Database.getInstance();
    database.getEmployee($(Emp).data("emp_id")).then(employee => {
        console.log("removeEmployee() employee = " + employee);
        database.removeEmployee(employee);
        updateTable();
    });
}

function showEmpInfo(Emp) {
    var emp_id = $(Emp).data("emp-id");
    var database = Database.getInstance();
    database.getEmployee(emp_id).then(employee => {
        $("#show-emp-modal-name").text("Name: " + employee.name);
        $("#show-emp-modal-role").text("Role: " + employee.role.name);
        $("#remove-employee-button").data("emp_id", emp_id);
    });

    $("#show-employee-modal").css("display", "flex");
}

function clickAddEmployee() {
    $("#add-employee-modal").css("display", "flex");
}

// Attempts to add an employee based on user input
function submitAddEmployee() {
    var name = $("#add-employee-name-input").val();
    var role_name = $("#add-employee-role-select").find(":selected").val();
    var data = { FUNCTION: "ADD_EMPLOYEE", name: name, role_name: role_name };

    $.post({
        url: "../database/ajax.php",
        data: data,
        success: function (response) {
            if (JSON.parse(response)["response"] == "invalid role")
                alert("Something went wrong: The role you tried to set does not exist. Refresh the page and try again.");
            else {
                $("#add-employee-modal").css("display", "none");
                updateTable();
            }
        }
    });
}

function updateTable() {
    return $.post({
        url: '../database/ajax.php',
        dataType: 'json',
        data: { FUNCTION: "GET_TABLE" },
        success: function (response) {
            $("#schedule").html(response);
            $(".employee-name,#submit-add-employee-button,#add-employee-button,#remove-employee-button").off();
            $(".employee-name").click(function () { showEmpInfo(this); });
            $("#submit-add-employee-button").click(submitAddEmployee);
            $("#add-employee-button").click(clickAddEmployee);
            $("#remove-employee-button").click(function () { removeEmployee(this); });
        }
    });
}

export { updateTable };