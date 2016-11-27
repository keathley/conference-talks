defmodule ElixirTypes.Ticket do
  defstruct requester: nil, severity: 1, message: nil

  @type requester :: String.t
  @type severity :: 1..5
  @type message :: String.t

  @type t :: %__MODULE__{
    requester: requester(),
    severity: severity(),
    message: message()
  }
end
