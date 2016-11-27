# defmodule ElixirTypes.TicketAdapter.Email do
#   @behaviour ElixirTypes.TicketAdapter
#
#   defstruct from: "", body: "", title: ""
#
#   @type from :: String.t
#   @type body :: String.t
#   @type title :: String.t
#
#   @type t :: %__MODULE__{
#     from: from,
#     body: body
#   }
#
#   @spec receive_ticket(t) :: ElixirTypes.Ticket.t
#   def receive_ticket(%__MODULE__{}=email) do
#     email
#     |> cast_to_ticket
#   end
#
#   @spec cast_to_ticket(t) :: ElixirTypes.Ticket.t
#   def cast_to_ticket(%__MODULE__{from: from, body: body, title: title}) do
#     %ElixirTypes.Ticket{
#       requester: from,
#       severity: severity(title),
#       message: body
#     }
#   end
#
#   @spec severity(title) :: ElixirTypes.Ticket.severity
#   def severity(title) when is_binary(title), do: 1
#
#   def run(raw_email_text) do
#     raw_email_text
#     |> cast_to_email
#     |> create_ticket
#     |> process_ticket
#   end
# end
