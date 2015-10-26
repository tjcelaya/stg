use Mix.Config

# if you want to provide default values for your application for third-
# party users, it should be done in your mix.exs file.

config :logger, :console,
  level: :info,
  format: "$date $time [$level] $metadata$message\n",
  metadata: [:user_id]

# import_config "../#{Mix.env}.exs"


repo_conf = [
    adapter: Ecto.Adapters.MySQL,
    username: "root",
    password: "",
    database: "stg",
    hostname: "127.0.0.1",
    port: 3306
]

if Mix.env == :test do
    repo_conf = Keyword.put repo_conf, :pool, Ecto.Adapters.SQL.Sandbox
else
    repo_conf = Keyword.put repo_conf, :pool_size, 10
end

config :stg_core, Core.Repo, repo_conf