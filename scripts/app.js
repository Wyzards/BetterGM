import { Database } from "./database.js";

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

    updateTable() {
        return $.post({
            url: '../database/ajax.php',
            dataType: 'json',
            data: { FUNCTION: "GET_TABLE" },
            success: function (response) {
                $("#schedule").html(response);
                $(".employee-name,#submit-add-employee-button,#add-employee-button,#remove-employee-button").off();
                $(".employee-name").click(function () { App.getInstance().showEmpInfo(this); });
                $("#submit-add-employee-button").click(() => { App.getInstance().submitAddEmployee() });
                $("#add-employee-button").click(() => { $("#add-employee-modal").css("display", "flex"); });
                $("#remove-employee-button").click(function () { App.getInstance().removeEmployee(this); });
            }
        });
    }

}

$(document).ready(function () {
    let app = App.getInstance();

    app.setup();
});

export { App };