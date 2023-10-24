import { Database } from "./database.js";
import { Role } from "./role.js";

class App {

    static #instance;
    #database;

    constructor() {
        this.#database = Database.getInstance();
    }

    static getInstance() {
        if (!App.#instance)
            App.#instance = new App();
        return App.#instance;
    }

    get database() {
        return this.#database;
    }

    setup() {
        this.updateTable().then(function () {
            window.onclick = function (event) {
                if ($(event.target).is($("#add-employee-modal")))
                    $("#add-employee-modal").css("display", "none");
                if ($(event.target).is($("#show-employee-modal"))) {
                    $("#show-employee-modal").css("display", "none");
                    $("#employee-jobs-select").css("display", "none");
                    $("#employee-jobs-list").css("display", "flex");
                    $("#edit-jobs-button").css("display", "flex");
                    $("#save-jobs-button").css("display", "none");
                }
            }

            $("#submit-add-employee-button").click(() => { App.getInstance().submitAddEmployee() });
            $("#add-employee-button").click(() => { $("#add-employee-modal").css("display", "flex"); });
            $("#remove-employee-button").click(function () { App.getInstance().removeEmployee(this); });
            $("#edit-jobs-button").click(function () { App.getInstance().editJobs(this) });
            $("#save-jobs-button").click(function () { App.getInstance().saveJobsSelection(this) });


            Role.roles.forEach((role, i) => {
                $("#add-employee-role-select").append("<option>" + role.name + "</option>");
            });

            Job
        });
    }

    removeEmployee(Emp) {
        this.#database.getEmployee($(Emp).data("emp_id")).then((employee) => {
            App.getInstance().database.removeEmployee(employee);
            App.getInstance().updateTable();
        });
    }

    showEmpInfo(Emp) {
        this.#database.getEmployee($(Emp).data("emp-id")).then(
            employee => {
                $("#show-emp-modal-name").text("Name: " + employee.name);
                $("#show-emp-modal-role").text("Role: " + employee.role.name);
                $("#remove-employee-button").data("emp_id", employee.emp_id);
                $("#edit-jobs-button").data("emp_id", employee.emp_id);
                $("#show-employee-modal").css("display", "flex");
            });
    }

    // Attempts to add an employee based on user input
    submitAddEmployee() {
        $.post({
            url: "../database/ajax.php",
            data: { FUNCTION: "ADD_EMPLOYEE", name: $("#add-employee-name-input").val(), role_name: $("#add-employee-role-select").find(":selected").val() },
            success: function (response) {
                if (JSON.parse(response)["response"] == "invalid role")
                    alert("Something went wrong: The role you tried to set does not exist. Refresh the page and try again.");
                else {
                    $("#add-employee-modal").css("display", "none");
                    App.getInstance().updateTable();
                }
            }
        });
    }

    editJobs(Emp) {
        this.#database.getEmployee($(Emp).data("emp_id")).then(
            employee => {
                $("#employee-jobs-list").css("display", "none");
                $("#employee-jobs-select").css("display", "flex");
                $("#edit-jobs-button").css("display", "none");
                $("#save-jobs-button").css("display", "flex");
            });
    }

    saveJobsSelection() {
        $("#save-jobs-button").css("display", "none");
        $("#edit-jobs-button").css("display", "flex");
        $("#employee-jobs-select").css("display", "none");
        $("#employee-jobs-list").css("display", "flex");
    }

    updateTable() {
        return $.post({
            url: '../database/ajax.php',
            dataType: 'json',
            data: { FUNCTION: "GET_TABLE" },
            success: function (response) {
                $("#schedule").html(response);
                $(".employee-name").off();
                $(".employee-name").click(function () { App.getInstance().showEmpInfo(this); });
            }
        });
    }

}

$(document).ready(function () {
    let app = App.getInstance();

    app.setup();
});

export { App };