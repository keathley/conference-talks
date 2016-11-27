defmodule ElixirTypes do
  import ElixirTypes.Conjoin
  alias ElixirTypes.Tree

  def run do
    Queue.new
    |> Queue.push(:foo)
    |> Presence.size
    # => 1

    Tree.new(1)
    |> Tree.insert(3)
    |> Presence.size
    # => 1

    [:foo, :bar]
    |> Presence.size
  end
end
