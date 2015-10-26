defmodule Core.Territory do
  alias Core.User
  alias Core.Lineage
  alias Core.Territory
  alias Core.Attribute
  alias Core.Territory.Type, as: TerritoryType

  use Ecto.Model
  schema "territory" do
    field       :name,        :string, null: true
    field       :pos_x,       :integer
    field       :pos_y,       :integer
    field       :props,       :any, virtual: true

    belongs_to  :type,        TerritoryType
    belongs_to  :character,   Character
    has_one     :population,  Population
    has_many    :artifacts,   Artifact
  end

  def name(t), do: t.name || t.type.name
  def type(t), do: t.type.name
end

defmodule Core.Territory.Type do
  use Ecto.Model
  schema "territory_type" do
    field       :name,        :string
  end
end

defimpl Poison.Encoder, for: Core.Territory do
  def encode(d, opts \\ []) do
    IO.puts"using protocol"
    d
      |> Map.take([:id, :name, :type])
      |> Poison.Encoder.encode(opts)
  end
end

defmodule Core.Territory.Serializer do
  use JaSerializer
  location "/territory/:id"
  attributes [:id, :name, :type, :population]

  def name(t), do: t.name || t.type.name
  def type(t), do: t.type.name

  # has_one :population,
  #   include: Core.Population.Serializer

  # has_many :comments,
  #   link: "/articles/:id/comments",

  # def props(model) do
  #   Comment.for_article(model)
  # end
end