defprotocol ElixirTypes.Conjoin do
  @spec conj(any(), any()) :: any()
  def conj(thing, list)
end
