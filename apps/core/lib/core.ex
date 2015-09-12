defmodule Core do
  use Application

  # http://elixir-lang.org/docs/stable/elixir/Application.html
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # Define workers and child supervisors to be supervised
      # worker(Core.Worker, [arg1, arg2, arg3])
      worker(Core.Repo, [])
    ]

    # http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    opts = [strategy: :one_for_one, name: Core.Supervisor]

    Supervisor.start_link(children, opts)
  end
end


defprotocol Sample do
  @doc "Returns a random element from an enumerable"
  def take(enum)
  def take(enum, n)
end

defimpl Sample, for: List do
  def take(list) do
    Enum.at list, :random.uniform(length(list)) - 1
  end

  def take(list, n) when 0 < n do
    for _ <- 1..n, do: Sample.take list
  end
end

defimpl Sample, for: Range do
  def take(enum) do
    enum |> Enum.to_list |> Sample.take
  end

  def take(enum, n) when 0 < n do
    enum |> Enum.to_list |> Sample.take(n)
  end
end
