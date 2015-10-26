defmodule Core.Population do
  alias Core.Population
  use Ecto.Model
  schema "population" do
    field       :props,       :any, virtual: true

    belongs_to  :type,        PopulationType
    belongs_to  :character,   Character
    has_one     :population,  Population
    has_many    :artifacts,   Artifact
  end

  def props do

  end
end

defmodule Core.Population.Serializer do
  use JaSerializer
  location "/territory/:id"
  attributes [:id, :name, :type, :population]

  def name(t), do: t.name || t.type.name
  def type(t), do: t.type.name

  has_one :population,
    include: Core.Population.Serializer

  # has_many :comments,
  #   link: "/articles/:id/comments",

  # def props(model) do
  #   Comment.for_article(model)
  # end
end