defmodule R do
  def sample do
    case :rand.uniform(2) - 1 do
      0 -> false
      1 -> true
    end
  end
end

defmodule Blip do
  use ExActor.Strict
  import IO, only: [puts: 1]
  @interval 1000
  import :erlang, only: [send_after: 3]

  defmacro i(p, t, f) do
    quote do
      if unquote(p), do: unquote(t), else: unquote(f)
    end
  end

  defstart start_link do 
    # send_after(@interval, self, :loop)
    initial_state 0
  end
  
  defcast stop, do: stop_server :normal

  defcast loop, state: s do
    IO.write inspect(s) <> " "
    me = self
    if R.sample, do: flip me
    send_after(@interval, me, :loop)
    noreply
  end

  def handle_info m, s do 
    GenServer.call(self, m)
    {:noreply, s}
  end

  defcall get, state: s, do: reply s

  defcast flip, state: s, do: new_state s + i(s == 0, 1, -1)
  defcall flip do
    reply GenServer.cast self, :flip
  end
end

defmodule O do
  defmacro p ~> m do
    quote do
      GenServer.call unquote(p), unquote(m)
    end
  end
end