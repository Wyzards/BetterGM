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

            <!-- Availability -->
            <button id="view-emp-avail-button">View Availability</button>
            <br>
            <!-- Removal -->
            <button id="remove-employee-button">Remove Employee</button>
        </span>
    </div>

    <div id="emp-avail-modal" class="modal">
        <span id="span">
            <p>Availability</p>
            <p>10/20/2020 - 10/20/2023</p>
            <p>Mon</p>
            <p>Tue</p>
            <p>Wed</p>
            <p>Thu</p>
            <p>Fri</p>
            <p>Sat</p>
            <p>Sun</p>
            <button id="edit-emp-avail-button">Edit Availability</button>
        </span>
    </div>

    <div id="select-avail-pattern-date-modal" class="modal">
        <span id="span">
            <p>Start Date</p>
            <input id="pattern-date-input" type="date">
            <button id="submit-new-pattern">Create New Pattern</button>
        </span>
    </div>

    <div id="edit-emp-avail-modal" class="modal">
        <span id="span">
            <button id="add-avail-pattern">Add Pattern</button>
            <!-- EMPTY WEEK 
            <p>Pattern 1</p> <button>Add Pattern</button>
            <p>Effective from 01/01/2023-FOREVER</p>
            <p>Week 1</p>
            <p class="avail-day">Monday:</p>
            <p class="avail-day" contenteditable="true">12A-12A</p>
            <p class="avail-day">Tuesday:</p>
            <p class="avail-day" contenteditable="true">12A-12A</p>
            <p class="avail-day">Wednesday:</p>
            <p class="avail-day" contenteditable="true">12A-12A</p>
            <p class="avail-day">Thursday:</p>
            <p class="avail-day" contenteditable="true">12A-12A</p>
            <p class="avail-day">Friday:</p>
            <p class="avail-day" contenteditable="true">12A-12A</p>
            <p class="avail-day">Saturday:</p>
            <p class="avail-day" contenteditable="true">12A-12A</p>
            <p class="avail-day">Sunday:</p>
            <p class="avail-day" contenteditable="true">12A-12A</p>
            <button style="display:block">Add Week</button>
            -->
        </span>
    </div>


    <h1>Better GM</h1>
    <button id="add-employee-button">Add Employee</button>
    <table id="schedule"></table>
</body>

</html>