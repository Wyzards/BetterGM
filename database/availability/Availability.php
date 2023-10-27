<?php
class Availability implements \JsonSerializable
{

    private readonly datetime $start;
    private readonly datetime $end;

    private function __construct(datetime $start, datetime $end)
    {
        $this->start = $start;
        $this->end = $end;
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