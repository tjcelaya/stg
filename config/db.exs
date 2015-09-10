
use Mix.Config

bconf = [
      adapter: Ecto.Adapters.MySQL,
      username: "root",
      password: "",
      database: "stg_dev",
      hostname: "127.0.0.1",
      port: 3306
]


if Mix.env == "test" do
    bconf = Keyword.merge(bconf, [pool: Ecto.Adapters.SQL.Sandbox])
else
    bconf = Keyword.merge(bconf, [pool_size: 10])
end

config :stg_site, StgSite.Repo, bconf
