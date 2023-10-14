<!DOCTYPE html>
<html>

<head>
    <title>BetterGM Schedule Writer</title>
    <script type="text/javascript" src="../scripts/jquery-3.7.1.min.js"></script>
    <script type="text/javascript" src="../scripts/javascript.js"></script>
    <link rel="stylesheet" href="../styles/styles.css">
</head>

<body>
    <?php
    require __DIR__ . '/database/database.php';
    create_tables();
    ?>

    <div id="add-employee-modal" class="modal">
        <span id="span">
            <input type="text" placeholder="Name...">
            <label>Role:</label>
            <select>
                <option>Crew</option>
                <option>Cashier</option>
            </select>
            <button>Submit</button>
        </span>
    </div>

    <h1>Better GM</h1>
    <button onclick="addEmployee()">Add Employee</button>
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
                <td>Ryan Stark</td>
                <td></td>
                <td></td>
                <td>10:00AM-8:00PM</td>
                <td>10:00AM-8:00PM</td>
                <td>10:00AM-8:00PM</td>
                <td>10:00AM-8:00PM</td>
                <td>10:00AM-8:00PM</td>
            </tr>
        <?php endforeach ?>
    </table>
</body>

</html>