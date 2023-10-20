$(document).ready(function () {
    window.onclick = function (event) {
        if (event.target == document.getElementById("add-employee-modal"))
            $("#add-employee-modal").css("display", "none");
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

const Roles = Object.freeze({
    CREW: Symbol(0),
    CASHIER: Symbol(1),
    BOH_TRAINER: Symbol(2),
    FOH_TRAINER: Symbol(3),
    KL: Symbol(4),
    SL: Symbol(5),
    AP: Symbol(6),
    GM: Symbol(7),
    R: Symbol(8),
    CTM: Symbol(9)
});

function showEmpInfo(Emp) {
    var emp_id = $(Emp).data("emp-id");

    getEmpDataPromise(emp_id).then(data => {
        //var employee = JSON.parse(data);
        console.log(data);
        //$("#show-emp-modal-name").text("Name: " + employee["name"]);
        //$("#show-emp-modal-role").text("Role: " + employee["role_id"]);
    });

    $("#show-employee-modal").css("display", "flex");
}

function getEmpDataPromise(emp_id) {
    return $.post({
        url: "../database/ajax.php",
        data: { FUNCTION: "GET_EMPLOYEE", emp_id: emp_id }
    });
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
            result = JSON.parse(response);

            if (result["response"] == "invalid role")
                alert("Something went wrong: The role you tried to set does not exist. Refresh the page and try again.");
        }
    });
}