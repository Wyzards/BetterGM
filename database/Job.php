<?php
enum Job: int implements \JsonSerializable
{
    case GRILL = 0;
    case CASH = 1;
    case CHIPS = 2;
    case PREP = 3;
    case LINE = 4;
    case DIGITAL = 5;

    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }
}
?>