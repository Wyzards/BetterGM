<!DOCTYPE html>
<html>

<head>
    <title>BetterGM Schedule Writer</title>
    <script type="module" src="../scripts/lib/jquery-3.7.1.min.js"></script>
    <script type="module" src="../scripts/app.js"></script>
    <link rel="stylesheet" href="../styles/styles.css">
    <link rel="icon" href="icons/favicon.ico">
    <link rel="shortcut icon" href="icons/favicon.ico">
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
            <!-- Info -->
            <p id="show-emp-modal-name">Name:</p>
            <p id="show-emp-modal-role">Role:</p>

            <!-- Jobs -->
            <button id="edit-jobs-button">Edit Jobs</button>
            <button id="save-jobs-button" style="display:none">Save Jobs</button>
            <p>Jobs:</p>

            <ul id="employee-jobs-list">
            </ul>
            <select id="employee-jobs-select" style="display:none" multiple>
            </select>

            <!-- Removal -->
            <button id="remove-employee-button">Remove Employee</button>
        </span>
    </div>


    <h1>Better GM</h1>
    <button id="add-employee-button">Add Employee</button>
    <table id="schedule"></table>
</body>

</html>