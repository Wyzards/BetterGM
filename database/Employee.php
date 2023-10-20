<?php
class Employee
{
    public int $emp_id;
    public Role $role;
    public string $name;

    function __construct(int $emp_id, Role $role, string $name)
    {
        $this->emp_id = $emp_id;
        $this->role = $role;
        $this->name = $name;
    }
}
?>