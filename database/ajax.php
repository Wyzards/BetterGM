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
    } else if ($_POST["FUNCTION"] == "GET_TABLE") {
        $employees = $database->get_employees();
        $content = '<table id="schedule">
        <th>Employee</th>
        <th>Mon 10/30</th>
        <th>Tue 10/31</th>
        <th>Wed 11/01</th>
        <th>Thu 11/02</th>
        <th>Fri 11/03</th>
        <th>Sat 11/04</th>
        <th>Sun 11/05</th>';

        foreach ($employees as $employee):
            $content .= '<tr>
                <td>' .
                strtr("<p class='employee-name' data-emp-id='@emp-id'>@emp-name</p>", ["@emp-id" => $employee["emp_id"], "@emp-name" => $employee["name"]]) .
                '</td>';

            for ($x = 0; $x < 7; $x++) {
                $content .= "\n<td></td>";
            }

            $content .= '</tr>';
        endforeach;
        $content .= '</table>';

        echo json_encode($content);
    }
}
?>