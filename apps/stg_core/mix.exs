defmodule Core.Mixfile do
  use Mix.Project

  def project do
    [app: :stg_core,
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
    [applications: [:logger, :mariaex, :ecto, :tzdata],
     mod: {Core, []}]
  end

  defp deps do
    [
      {:ecto,"1.0.2"},
      {:mariaex,"0.4.3"},
      {:timex, "~> 0.19.5"},
      {:exactor, "~> 2.2.0"},
      {:poison, "~> 1.5"},
      {:ja_serializer, "~> 0.4.0"},
      {:gproc, "~> 0.5.0"},
      {:beaker, "~> 1.1"},
    ]
  end

  defp aliases do
    [
      redb: ["ecto.drop", "ecto.create", "ecto.migrate", "core.seed"],
      "core.seed": ["run priv/repo/seed.exs"],
    ]
  end
end
