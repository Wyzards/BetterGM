<?php
class Employee implements \JsonSerializable
{
    private readonly int $emp_id;
    private readonly Role $role;
    private readonly string $name;
    private readonly array $jobs;

    private function __construct(int $emp_id, Role $role, string $name, array $jobs)
    {
        $this->emp_id = $emp_id;
        $this->role = $role;
        $this->name = $name;
        $this->jobs = $jobs;
    }

    public static function make_employee(int $emp_id, Role $role, string $name): Employee
    {
        return new Employee($emp_id, $role, $name, []);
    }

    public static function make_employee_with_jobs(int $emp_id, Role $role, string $name, array $jobs): Employee
    {
        return new Employee($emp_id, $role, $name, $jobs);
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }

    public function __get($property)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }
}
?>