<?php
class SchedulePattern implements \JsonSerializable
{

    private readonly datetime $effective_date;
    private readonly array $week_patterns; // Maps integer to week pattern

    private function __construct(datetime $effective_date, array $week_patterns)
    {
        $this->effective_date = $effective_date;
        $this->week_patterns = $week_patterns;
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