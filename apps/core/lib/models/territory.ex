defmodule Core.Territory do

  alias Core.User
  alias Core.Lineage
  alias Core.Territory
  alias Core.Attribute


  use Ecto.Model
  schema "character" do
    field      :name,       :string

    belongs_to :user,        User
    belongs_to :lineage,     Lineage
    has_many   :territory,   Territory
    has_many   :attribute,   Attribute
  end
end
