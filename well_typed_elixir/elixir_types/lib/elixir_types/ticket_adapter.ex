defmodule ElixirTypes.TicketAdapter do
  @callback receive_ticket(any()) :: ElixirTypes.Ticket.t
end
