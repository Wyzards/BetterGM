$(document).ready(function () {
    window.onclick = function (event) {
        if (event.target == document.getElementById("add-employee-modal"))
            $("#add-employee-modal").css("display", "none");
    }

    $.post({
        url: "../database/database.php",
        data: { FUNCTION: "GET_ROLE_LIST" },
        success: function (response) {
            var roles = JSON.parse(response);
            roles.forEach((role, i) => {
                $("#add-employee-role-select").append("<option>" + role + "</option>");
            });
        }
    });
});

function showEmpInfo(Emp) {
    var emp_id = $(Emp).data("emp-id");

    console.log(emp_id);
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
        url: "../database/database.php",
        data: data,
        success: function (response) {
            result = JSON.parse(response);

            if (result["response"] == "invalid role")
                alert("Something went wrong: The role you tried to set does not exist. Refresh the page and try again.");
        }
    });
}