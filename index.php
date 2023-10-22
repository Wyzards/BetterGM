<!DOCTYPE html>
<html>

<head>
    <title>BetterGM Schedule Writer</title>
    <script type="text/javascript" src="../scripts/jquery-3.7.1.min.js"></script>
    <script type="module" src="../scripts/javascript.js"></script>
    <link rel="stylesheet" href="../styles/styles.css">
</head>

<body>
    <div id="add-employee-modal" class="modal">
        <span id="span">
            <input id="add-employee-name-input" type="text" placeholder="Name...">
            <label for="add-employee-role-select">Role:</label>
            <select id="add-employee-role-select" name="select-role"></select>
            <button id="submit-add-employee-button">Submit</button>
        </span>
    </div>

    <div id="show-employee-modal" class="modal">
        <span id="span">
            <p id="show-emp-modal-name">Name:</p>
            <p id="show-emp-modal-role">Role:</p>
            <button id="remove-employee-button">Remove Employee</button>
        </span>
    </div>


    <h1>Better GM</h1>
    <button id="add-employee-button">Add Employee</button>
    <table id="schedule"></table>
</body>

</html>