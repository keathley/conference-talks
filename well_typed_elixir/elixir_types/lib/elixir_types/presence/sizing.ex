defprotocol Presence.Sizing do
  @spec size(any()) :: non_neg_integer
  def size(structure)
end
