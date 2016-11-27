defmodule ElixirTypes.Tree do
  defstruct key: nil, left: nil, right: nil

  alias ElixirTypes.Tree

  @type t :: %__MODULE__{
    key: any(),
    left: any(),
    right: any()
  }

  def new(key) do
    %__MODULE__{key: key}
  end

  def insert(t=%Tree{left: l}, value) do
    %Tree{ t | left: Tree.new(l) }
  end

  def right(_tree), do: 0
  def left(_tree), do: 0
end

defimpl Presence.Sizing, for: ElixirTypes.Tree do
  alias ElixirTypes.Tree

  def size(%Tree{left: left, right: right}) do
    size(left) + size(right) + 1
  end
  def size(nil), do: 0
end
