require "minitest/autorun"
require_relative "./../../lib/rover/Main"


class TestRover < Minitest::Test

    def setup
        # @rover = Rover.new(1 2 "N")
    end

    def test_respond_to_instructions
        @rover = Rover.new(0 0 "N")

        assert_equal "N", @rover.get_current_orientation()
        
        @rover.add_instruction("R")
        assert_equal "E", @rover.get_current_orientation()
        
        @rover.add_instruction("L")
        assert_equal "N", @rover.get_current_orientation()
        
        @rover.add_instruction("R")
        assert_equal "E", @rover.get_current_orientation()
        
        @rover.add_instruction("R")
        assert_equal "S", @rover.get_current_orientation()
        
        @rover.add_instruction("R")
        assert_equal "W", @rover.get_current_orientation()
        
        @rover.add_instruction("R")
        assert_equal "N", @rover.get_current_orientation()
    end


    def test_instruction_set_1
        @rover = Rover.new(1 2 "N")
        @rover.add_instructions("LMLMLMLMM")
        assert_equal "N", @rover.get_current_orientation()
    end

end