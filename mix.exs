defmodule Stg.Mixfile do
  use Mix.Project

  def project do
    [apps_path: "apps",
     deps: deps]
  end

  defp deps do
    [
      # {:ecto,"1.0.2"},
      # {:mariaex,"0.4.3"},
      # {:timex, "~> 0.19.5"},
      # {:exactor, "~> 2.2.0"},
      # {:poison, "~> 1.5"},
    ]
  end
end
