<?php
class WeekPattern implements \JsonSerializable
{

    private readonly DayPattern $monday;
    private readonly DayPattern $tuesday;
    private readonly DayPattern $wednesday;
    private readonly DayPattern $thursday;
    private readonly DayPattern $friday;
    private readonly DayPattern $saturday;
    private readonly DayPattern $sunday;
    private readonly int $min_hours;
    private readonly int $max_hours;

    private function __constructing(DayPattern $monday, DayPattern $tuesday, DayPattern $wednesday, DayPattern $thursday, DayPattern $friday, DayPattern $saturday, DayPattern $sunday, int $min_hours, int $max_hours)
    {
        $this->monday = $monday;
        $this->tuesday = $tuesday;
        $this->wednesday = $wednesday;
        $this->thursday = $thursday;
        $this->friday = $friday;
        $this->saturday = $saturday;
        $this->sunday = $sunday;
        $this->min_hours = $min_hours;
        $this->max_hours = $max_hours;
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