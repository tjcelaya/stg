defmodule Core.User do
  use Ecto.Model
  schema "user" do
    # # here we associate the `:local_weather` from every City that belongs_to
    # # a Country through that Country's `has_many :cities, City` association
    # has_many :weather, through: [:cities, :local_weather]

    # has_many :cities, City

    field :name, :string
    field :email, :string
  end
end

# iex(8)>   Repo.all(from u in User, select: u)
# iex(11)>  Repo.get User, 1
