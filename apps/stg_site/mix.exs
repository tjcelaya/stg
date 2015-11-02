defmodule Site.Mixfile do
  use Mix.Project

  def project do
    [
      app: :stg_site,
      version: "0.0.1",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.0",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix] ++ Mix.compilers,
      build_embedded: Mix.env == :prod,
      start_permanent: Mix.env == :prod,
      deps: deps,
      aliases: [
        "js.build": "npm run build"
      ]
    ]
  end

  # Configuration for the OTP application
  #a
  # Type `mix help compile.app` for more information
  def application do
    [mod: {Site, []},
      applications: [
        :phoenix,
        :phoenix_html,
        :cowboy,
        :logger,
        :stg_core,
      ]
    ]
  end

  # Specifies which paths to compile per environment
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies
  #
  # Type `mix help deps` for examples and options
  defp deps do
    [
      {:phoenix, "~> 1.0.2"},
      {:phoenix_html, "~> 2.1"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:cowboy, "~> 1.0"},
      {:gproc, "~> 0.5"},
      {:beaker, "~> 1.1"},
      {:stg_core, in_umbrella: true},
      {:exactor, "~> 2.2.0"},
    ]
  end
end
