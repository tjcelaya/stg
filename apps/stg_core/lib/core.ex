defmodule Core do
  use Application

  # http://elixir-lang.org/docs/stable/elixir/Application.html
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # Define workers and child supervisors to be supervised
      # worker(Core.Worker, [arg1, arg2, arg3])
      worker(Core.Repo, []),
      worker(Words, [])
    ]

    # http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    opts = [strategy: :one_for_one, name: Core.Supervisor]

    Supervisor.start_link(children, opts)
  end
end
