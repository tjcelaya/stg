defmodule Site.TimeChannel do
  use Phoenix.Channel

  def join("time:lobby", _message, socket) do
    DebugSocket.start_link
    {:ok, "woot", socket}
  end
  def join("rooms:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    DebugSocket.assign socket
    broadcast! socket, "new_msg", %{body: Words.sample}
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end
end

defmodule DebugSocket do
  def start_link, do: Agent.start_link fn -> nil end, name: __MODULE__

  def assign(c), do: Agent.update __MODULE__, fn x -> c end

  def get, do: Agent.get __MODULE__, fn x -> x end
end