$(document).ready(function () {
    window.onclick = function (event) {
        if (event.target == document.getElementById("add-employee-modal"))
            $("#add-employee-modal").css("display", "none");
    }
});

function addEmployee() {
    $("#add-employee-modal").css("display", "flex");
}