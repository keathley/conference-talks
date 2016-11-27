defmodule Queue do
  defstruct inbox: [], outbox: []

  @type t :: %__MODULE__{
    inbox: list(),
    outbox: list()
  }

  @spec push(Queue.t, any()) :: Queue.t
  def push(%Queue{inbox: inbox, outbox: out}, x) do
    %Queue{ inbox: [x|inbox], outbox: out}
  end

  @spec pop(Queue.t) :: {any(), Queue.t}
  def pop(%Queue{inbox: [], outbox: []}), do: raise "Empty fifo"

  def pop(%Queue{inbox: inbox, outbox: []}) do
    pop(%Queue{inbox: [], outbox: Enum.reverse(inbox)})
  end

  def pop(%Queue{inbox: inbox, outbox: [h|t]}) do
    {h, %Queue{inbox: inbox, outbox: t}}
  end

  @spec new :: Queue.t
  def new(), do: %Queue{}
end

defimpl Presence.Sizing, for: Queue do
  def size(%Queue{inbox: i, outbox: o}) do
    Enum.count(i) + Enum.count(o)
  end
end

defimpl ElixirTypes.Conjoin, for: Queue do
  # @spec conj(Queue.t, any()) :: Queue.t
  def conj(queue, item) do
    Queue.push(queue, item)
  end
end
