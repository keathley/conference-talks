defmodule StackExample.ProcessRegistry do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, [], name: :process_registry)
  end

  def register(key, pid) do
    GenServer.call(:process_registry, {:register, key, pid})
  end

  def whereis(key) do
    GenServer.call(:process_registry, {:whereis, key})
  end

  def init(_) do
    {:ok, HashDict.new}
  end

  def handle_call({:register, key, pid}, _from, registry) do
    case HashDict.get(registry, key) do
      nil ->
        Process.monitor(pid)
        {:reply, :yes, HashDict.put(registry, key, pid)
      _   ->
        {:reply, :no, registry}
    end
  end

  def handle_call({:whereis, key}, _from, registry) do
    {:reply, HashDict.get(registry, key, :undefined), registry}
  end

  def handle_info({:DOWN, _, :process, pid, _}, registry) do
    {:noreply, deregister_pid(registry, pid)}
  end
end

