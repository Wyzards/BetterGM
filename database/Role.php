<?php
enum Role: int implements \JsonSerializable
{
    case CREW = 0;
    case CASHIER = 1;
    case FOH_TRAINER = 2;
    case BOH_TRAINER = 3;
    case KL = 4;
    case SL = 5;
    case AP = 6;
    case GM = 7;
    case R = 8;
    case CTM = 9;

    public static function get_role(string $role_name): Role|null
    {
        foreach (Role::cases() as $case)
            if ($case->name === $role_name)
                return $case;
        return null;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }
}
?>