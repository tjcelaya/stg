defmodule Core.User do
  use Ecto.Model
  alias Core.Character

  schema "user" do
    field :name, :string, null: false
    field :email, :string, null: false
    field :hash, :string
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
  def generate_name do
    @alphas |> Enum.take_random(2 + :random.uniform(12)) |> to_string
  end

  def generate_legendary_name do
    [:names, :connectives, :words] |> Enum.map(&Words.sample/1) |> Enum.join " "
  end

end
