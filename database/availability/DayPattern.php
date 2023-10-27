<?php
class DayPattern implements \JsonSerializable
{

    private readonly Availability $availability;

    private function __construct(Availability $availability)
    {
        $this->availability = $availability;
    }

    public function jsonSerialize()
    {
        return null;
    }

    public function __get($property)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }
}
?>