defmodule Presence do
  @spec present?(any()) :: boolean()
  def present?(thing), do: size(thing) > 0

  @spec empty?(any()) :: boolean()
  def empty?(thing), do: !present?(thing)

  @spec size(any()) :: non_neg_integer()
  def size(thing), do: Presence.Sizing.size(thing)
end
