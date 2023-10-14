<!DOCTYPE html>

<html>

<head>
    <title>BetterGM Schedule Writer</title>
    <link rel="stylesheet" href="../styles/styles.css">
</head>

<body>
    <?php
    require __DIR__ . '/database/database.php';
    create_tables();
    ?>
    <h1>Better GM</h1>

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