<?php
class DayAvailability implements \JsonSerializable
{

    private readonly array $available;
    private readonly array $unavailable;
    private readonly array $prefer_available;
    private readonly array $prefer_unavailable;

    private function __construct(array $available, array $unavailable, array $prefer_available, array $prefer_unavailable)
    {
        $this->available = $available;
        $this->unavailable = $unavailable;
        $this->prefer_available = $prefer_available;
        $this->prefer_unavailable = $prefer_unavailable;
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