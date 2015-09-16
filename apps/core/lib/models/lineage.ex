defmodule Core.Lineage do
  alias Core.User
  alias Core.Lineage
  alias Core.Territory
  alias Core.Attribute


  use Ecto.Model

  schema "lineage" do

    field :name,      :string
    timestamps
  end
end

