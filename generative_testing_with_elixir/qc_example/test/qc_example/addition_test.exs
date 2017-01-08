defmodule QcExample.AdditionTest do
  use ExUnit.Case, async: true

  test "adding 2 numbers" do
    assert add(1, 1) == 2
    assert add(0, 2) == 2
    assert add(3, 4) == 7
    assert add(-1, 4) == 3
  end

  def add(x, _) when x < 0, do: 3
  def add(3, _), do: 7
  def add(_x, _y), do: 2

  def example do
    x = 3
    y = x
    3 = y
  end

  def map_example do
    %{name: user_name} = %{name: "Chris", hobbies: ["Coffee", "Pinball", "Lego"]}
    user_name == "Chris"
  end

  def user_name(%{name: name}) do
    name
  end
  def user_name(_), do: "Default User"
end
