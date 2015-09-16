defmodule Core.Character do
  use Ecto.Model

  alias Core.User
  alias Core.CharacterRelationship

  schema "character" do
    field :name,      :string

    has_one :user, User
    has_many :child_rel, CharacterRelationship, foreign_key: :parent_id
    has_many :parent_rel, CharacterRelationship, foreign_key: :child_id

    has_many :parent, through: [:parent_rel, :parent]
    has_many :child, through: [:child_rel, :child]
    # has_many :parent, through: [:character_relationship, :parent]

  end
end

defmodule Core.CharacterRelationship do
  use Ecto.Model

  alias Core.Character

  schema "character_relationship" do
    belongs_to :child, Character
    belongs_to :parent, Character
  end
end