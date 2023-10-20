<?php
spl_autoload_register(function ($class_name) {
    include $class_name . '.php';
});

if (array_key_exists("FUNCTION", $_POST)) {
    $database = Database::getInstance();
    // Add an employee
    if ($_POST["FUNCTION"] == "ADD_EMPLOYEE") {
        $role = Role::get_role($_POST["role_name"]);
        $result = new stdClass();

        if ($role == null)
            $result->response = "invalid role";
        else {
            $database->add_employee($_POST["name"], $role);
            $result->response = "success";
        }

        echo json_encode($result);
    }

    // Get a list of Roles
    else if ($_POST["FUNCTION"] == "GET_ROLE_LIST") {
        $role_list = [];

        foreach (Role::cases() as $case)
            array_push($role_list, $case->name);

        echo json_encode($role_list);
    } else if ($_POST["FUNCTION"] == "GET_EMPLOYEE") {
        $employee = $database->get_employee($_POST["emp_id"]);

        echo json_encode($employee);
    }
}
?>