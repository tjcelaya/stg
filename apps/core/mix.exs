defmodule Core.Mixfile do
  use Mix.Project

  def project do
    [app: :core,
     version: "0.0.1",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     elixir: "~> 1.0",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps,
     aliases: aliases
   ]
  end

  # check `mix help compile.app`
  def application do
    [applications: [:logger, :mariaex, :ecto],
     mod: {Core, []}]
  end

  defp deps do
    [
      {:ecto,"1.0.2"},
      {:mariaex,"0.4.3"}
    ]
  end

  defp aliases do 
    [
      redb: ["ecto.drop", "ecto.create", "ecto.migrate", "core.seed"],
      "core.seed": ["run priv/repo/seed.exs"],
    ]
  end
end
