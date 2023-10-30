<?php

class Database
{

    private static $instance = null;
    private $sql;

    public function __construct()
    {
        $config = json_decode(file_get_contents(__DIR__ . "/../config.json"), true);
        // Create tables
        $this->sql = mysqli_connect($config["mysqli_host"], $config["mysqli_username"], $config["mysqli_password"], $config["mysqli_database"]);
        $sql = $this->sql;
        $sql->query("CREATE TABLE IF NOT EXISTS Employees (emp_id INT NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL, role_id INT UNSIGNED NOT NULL, PRIMARY KEY (emp_id))");
        $sql->query("CREATE TABLE IF NOT EXISTS Emp_Jobs (emp_id INT NOT NULL REFERENCES employees(emp_id), job_id INT UNSIGNED NOT NULL, PRIMARY KEY (emp_id, job_id))");
        $sql->query("CREATE TABLE IF NOT EXISTS Day_Avail (day_id INT NOT NULL AUTO_INCREMENT, avail VARCHAR(40), unavail VARCHAR(40), prefer VARCHAR(40), prefernot VARCHAR(40), PRIMARY KEY (day_id))");
        $sql->query("CREATE TABLE IF NOT EXISTS Week_Avail (week_avail_id INT NOT NULL AUTO_INCREMENT, monday_id INT NOT NULL REFERENCES day_avail(day_id), tuesday_id INT NOT NULL REFERENCES day_avail(day_id), wednesday_id INT NOT NULL REFERENCES day_avail(day_id), thursday_id INT NOT NULL REFERENCES day_avail(day_id), friday_id INT NOT NULL REFERENCES day_avail(day_id), saturday_id INT NOT NULL REFERENCES day_avail(day_id), sunday_id INT NOT NULL REFERENCES day_avail(day_id), min_hours INT DEFAULT 0, max_hours INT DEFAULT 37, PRIMARY KEY (week_avail_id))");
        $sql->query("CREATE TABLE IF NOT EXISTS Emp_Avail (emp_id INT NOT NULL REFERENCES Employees(emp_id), week_num INT UNSIGNED NOT NULL, week_avail_id INT NOT NULL REFERENCES Week_Avail(week_avail_id), effective_date DATE)");
        $sql->query("CREATE TABLE IF NOT EXISTS Sched_Week_Template (week_template_id INT NOT NULL AUTO_INCREMENT, monday VARCHAR(40), tuesday VARCHAR(40), wednesday VARCHAR(40), thursday VARCHAR(40), friday VARCHAR(40), saturday VARCHAR(40), sunday VARCHAR(40), PRIMARY KEY (week_template_id))");
        $sql->query("CREATE TABLE IF NOT EXISTS Emp_Sched_Template (emp_id INT NOT NULL REFERENCES Employees(emp_id), week INT UNSIGNED NOT NULL, week_id INT NOT NULL REFERENCES sched_week_template(week_template_id), PRIMARY KEY(emp_id, week));");
    }

    public static function getInstance()
    {
        if (self::$instance == null)
            self::$instance = new Database();

        return self::$instance;
    }

    /**
     * The function sets the jobs for an employee by their IDs, deleting any existing job assignments
     * and inserting new ones.
     * 
     * @param Employee employee The parameter "employee" is an instance of the Employee class. It
     * represents an employee object with properties such as emp_id, emp_name, emp_salary, etc.
     * @param array job_ids The parameter `job_ids` is an array that contains the IDs of the jobs that
     * need to be associated with the employee.
     */
    function set_jobs_by_ids(Employee $employee, array $job_ids): void
    {
        $this->clear_jobs($employee);

        foreach ($job_ids as $job_id)
            $this->sql->execute_query("INSERT INTO emp_jobs VALUES (?, ?)", [$employee->emp_id, $job_id]);
    }

    function clear_jobs(Employee $employee): void
    {
        $this->sql->execute_query("DELETE FROM emp_jobs WHERE emp_id = ?", [$employee->emp_id]);
    }

    function add_employee(string $name, Role $role)
    {
        $sql = $this->sql;
        $sql->execute_query("INSERT INTO Employees (name, role_id) VALUES (?, ?)", [$name, $role->value]);
    }

    function delete_employee(Employee $employee): void
    {
        $this->sql->execute_query("DELETE FROM Employees WHERE emp_id = ?", [$employee->emp_id]);
    }

    function get_employees(): array
    {
        $table_query = $this->sql->query("SELECT emp_id,name,role_id FROM employees");
        return $table_query->fetch_all(MYSQLI_ASSOC);
    }

    function get_employee_by_id(int $emp_id): Employee
    {
        $statement = $this->sql->prepare("SELECT name,role_id FROM Employees WHERE emp_id = ?");
        $statement->bind_param("i", $emp_id);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc();
        $job_arr = $this->sql->execute_query("SELECT job_id FROM emp_jobs WHERE emp_id = ?", [$emp_id])->fetch_all(MYSQLI_ASSOC);
        $jobs = array_map(function ($job_row) {
            return Job::from($job_row["job_id"]);
        }, $job_arr);

        return Employee::make_employee_with_jobs($emp_id, Role::from($row["role_id"]), $row["name"], $jobs);
    }
}

?>