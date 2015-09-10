# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :stg_site, StgSite.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "Th+9GV/oq5xR0Vn4oavbZMdxesqAL6qA/9dkK/5rkxGz36nqEwgHK1ew9bDcZvf4",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: StgSite.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
# import_config "dev.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

import_config "../../../config/db.exs"
