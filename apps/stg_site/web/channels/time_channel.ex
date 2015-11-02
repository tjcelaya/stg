defmodule Site.TimeChannel do
  use Phoenix.Channel
  require Logger
  import Logger


  defmodule Clients do
    use ExActor.GenServer, export: __MODULE__
    @interval 1000
    defstart start_link do
      :erlang.send_after @interval, self, :time
      initial_state HashSet.new
    end
    defcast put(id),    state: s, do: s |> Set.put(id) |> new_state
    defcast delete(id), state: s, do: s |> Set.delete(id) |> new_state
    defcall list,       state: s, do: s |> Set.to_list |> reply
    defcall get(id),    state: s, do: s |> Set.get(id) |> reply
    defcall gimme,      state: s, do: s |> Enum.random |> reply

    def handle_info(:time, s) do
      Site.Endpoint.broadcast! "time", "set", %{now: inspect :erlang.timestamp}
      :erlang.send_after @interval, self, :time
      {:noreply, s}
    end
  end
  defmodule DebugSocket do
    def start_link, do: Agent.start_link(fn -> nil end, name: __MODULE__)

    def assign(c), do: Agent.update(__MODULE__, fn x -> c end)

    def get, do: Agent.get(__MODULE__, fn x -> x end)
  end

  def join("time", params, socket) do
    info "lobby join: " <> inspect params
    send(self, {:after_join, params["id"]})
    {:ok, "woot", socket}
  end

  def handle_info({:after_join, id},  socket) do
    Clients.put id
    push socket, "msg", %{body: "thanks for joining #{id}!"}
    {:noreply, socket}
  end
  # def join("time:" <> guid, params, socket) do
  #   DebugSocket.assign socket
  #   info guid <> " join: " <> inspect params
  #   {:ok, "daublewoot", socket}
  # end

  # def handle_in("new_msg", %{"body" => body}, socket) do
  #   info "new_msg in"
  #   broadcast! socket, "new_msg", %{body: Words.sample}
  #   {:noreply, socket}
  # end

  # def handle_out("new_msg", payload, socket) do
  #   info "new_msg out #{inspect payload}"
  #   push socket, "new_msg", payload
  #   {:noreply, socket}
  # end
end
