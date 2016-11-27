defmodule StackExample.Database do
  use GenServer

  # Public API

  def start_link(folder) do
    GenServer.start_link(__MODULE__, folder, name: :db_server)
  end

  def store(stack) do
    GenServer.cast(:db_server, {:store, stack})
  end

  def get do
    GenServer.call(:db_server, {:get})
  end

  # Server Callbacks

  def init(folder) do
    File.mkdir_p(folder)
    {:ok, folder}
  end

  def handle_cast({:store, stack}, folder) do
    file_name(folder)
    |> File.write!(:erlang.term_to_binary(stack))

    {:noreply, folder}
  end

  def handle_call({:get}, _from, folder) do
    data = case File.read(file_name(folder)) do
      {:ok, contents} -> :erlang.binary_to_term(contents)
      _ -> nil
    end

    {:reply, data, folder}
  end

  def terminate(_reason, _folder) do
    IO.puts "Wake up we have an issue"
  end

  def code_change(_old_vsn, folder, _extra) do
    IO.puts "Updating code"
    {:ok, folder}
  end

  defp file_name(folder), do: "#{folder}/stack"
end

