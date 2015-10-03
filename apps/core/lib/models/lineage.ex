defmodule Core.Lineage do
  use Ecto.Model

  schema "lineage" do
    field :name,      :string
    timestamps
  end
end
