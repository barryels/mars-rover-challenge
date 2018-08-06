require_relative "./RotationDriveSystem"
require_relative "./ForwardMovementDriveSystem"

class Rover

    def initialize(x, y, orientation)
        @initial_position = [x, y, orientation]
        @rotation_drive_system = RotationDriveSystem.new
        @forward_movement_drive_system = ForwardMovementDriveSystem.new
    end

    def get_current_orientation()
        return @rotation_drive_system.get_current_orientation()
    end

    def get_location()
        return "0" + "0" + @rotation_drive_system.get_current_orientation()
    end

    def add_instruction(instruction)
        case instruction
        when "R"
            turn_right()
        when "L"
            turn_left()
        end
    end

    def turn_right()
        return @rotation_drive_system.turn_right()
    end

    def turn_left()
        return @rotation_drive_system.turn_left()
    end

end