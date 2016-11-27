defmodule Stack do
  use GenServer

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, [], opts)
  end

  def push(item) do
    GenServer.call(__MODULE__, {:push, item})
  end

  def pop do
    GenServer.call(__MODULE__, {:pop})
  end

  def peek do
    GenServer.call(__MODULE__, {:peek})
  end

  def init(stack \\ []) do
    {:ok, StackExample.Database.get || stack}
  end

  def handle_call({:push, item}, _from, stack) do
    new_stack = [item | stack]
    StackExample.Database.store(new_stack)
    {:reply, new_stack, new_stack}
  end

  def handle_call({:pop}, _from, [head | tail] = _stack) do
    StackExample.Database.store(tail)
    {:reply, head, tail}
  end

  def handle_call({:pop}, _from, [] = stack) do
    {:reply, nil, stack}
  end

  def handle_call({:peek}, _from, stack) do
    {:reply, stack, stack}
  end
end
