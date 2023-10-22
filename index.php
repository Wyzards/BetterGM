<!DOCTYPE html>
<html>

<head>
    <title>BetterGM Schedule Writer</title>
    <script type="text/javascript" src="../scripts/jquery-3.7.1.min.js"></script>
    <script type="module" src="../scripts/javascript.js"></script>
    <link rel="stylesheet" href="../styles/styles.css">
</head>

<body>
    <?php
    require __DIR__ . "/database/Database.php";

    $database = Database::getInstance();
    $employees = $database->get_employees();
    ?>

    <div id="add-employee-modal" class="modal">
        <span id="span">
            <input id="add-employee-name-input" type="text" placeholder="Name...">
            <label>Role:</label>
            <select id="add-employee-role-select">
                <!-- Options added from PHP Enum w/ JS -->
            </select>
            <button id="submit-add-employee-button">Submit</button>
        </span>
    </div>

    <div id="show-employee-modal" class="modal">
        <span id="span">
            <p id="show-emp-modal-name">Name:</p>
            <p id="show-emp-modal-role">Role:</p>
        </span>
    </div>


    <h1>Better GM</h1>
    <button id="add-employee-button">Add Employee</button>
    <table>
        <th>Employee</th>
        <th>Mon 10/30</th>
        <th>Tue 10/31</th>
        <th>Wed 11/01</th>
        <th>Thu 11/02</th>
        <th>Fri 11/03</th>
        <th>Sat 11/04</th>
        <th>Sun 11/05</th>

        <?php foreach ($employees as $employee): ?>
            <tr> <!-- RYAN -->
                <td>
                    <?php
                    echo strtr("<p class='employee-name' data-emp-id='@emp-id'>@emp-name</p>", ["@emp-id" => $employee["emp_id"], "@emp-name" => $employee["name"]]);
                    ?>
                </td>

                <?php
                for ($x = 0; $x < 7; $x++) {
                    echo "<td></td>";
                } ?>
            </tr>
        <?php endforeach ?>
    </table>
</body>

</html>