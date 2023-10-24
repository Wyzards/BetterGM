<?php
class Employee implements \JsonSerializable
{
    private readonly int $emp_id;
    private Role $role;
    private string $name;

    function __construct(int $emp_id, Role $role, string $name)
    {
        $this->emp_id = $emp_id;
        $this->role = $role;
        $this->name = $name;
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