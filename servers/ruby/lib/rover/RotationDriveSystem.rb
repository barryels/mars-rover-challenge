class RotationDriveSystem

    def initialize
        @ORIENTATIONS = ["N", "E", "S", "W"]
        @current_orientation_index = 0
    end

    def get_current_orientation()
        return @ORIENTATIONS[@current_orientation_index]
    end

    def turn_right()
        @current_orientation_index = @current_orientation_index + 1
        if @current_orientation_index == @ORIENTATIONS.size()
            @current_orientation_index = 0
        end
    end

    def turn_left()
        @current_orientation_index = @current_orientation_index - 1
        if @current_orientation_index == -1
            @current_orientation_index = 0
        end
    end

end
