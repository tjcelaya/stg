defmodule Core.User do
  use Ecto.Model
  schema "user" do
    # # here we associate the `:local_weather` from every City that belongs_to
    # # a Country through that Country's `has_many :cities, City` association
    # has_many :weather, through: [:cities, :local_weather]

    # has_many :cities, City

    field :name,      :string
    field :email,     :string
    field :hash,      :string
    field :recovery_hash, :string
    timestamps

    has_many :characters, Character
  end

  @required_fields ~w(name)
  @optional_fields ~w(email, hash, recovery_hash)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def create_from_name(name \\ nil) do
    unless name do
      name = generate_name()
    end

    Core.Repo.insert %Core.User{ name: name }
  end

  @alphas Enum.concat(?A..?Z, ?a..?z)
  def generate_name() do
    @alphas |> Sample.take(2 + :random.uniform(12)) |> to_string
  end

  def generate_legendary_name do
    [:names, :connectives, :words] |> Enum.map(&Words.sample/1) |> Enum.join " "
  end

end

# iex(8)>   Repo.all(from u in User, select: u)
# iex(11)>  Repo.get User, 1

# iex> query = Book |> select([book], book.id) \
#                   |> where([book], like(book.title, "%Programming%")) \
#                   |> order_by([book], desc: book.id) \
#                   |> limit(1) \
#                   |> offset(0) \
#                   |> group_by([book], book.id) \
#                   |> having([book], book.id >= 1)
# iex> Repo.all(query)