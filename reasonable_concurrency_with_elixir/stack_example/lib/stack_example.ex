defmodule StackExample do
  use Application

  def start(_type, _args) do
    StackExample.Supervisor.start_link
  end
end

