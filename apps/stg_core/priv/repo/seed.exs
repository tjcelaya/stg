require IEx
defmodule Core.Seed do
  alias Core.User
  alias Core.Character
  alias Core.CharacterRelationship, as: CR
  alias Core.Territory
  alias Core.Territory.Type, as: TerritoryType
  alias Core.Lineage

  alias Core.Repo

  import Ecto.Model, only: [build: 2]

  use Mix.Task
  @moduledoc """
  Seed the database with some test data.
  """

  def run(_args \\ []) do
    Words.start_link
    create_lineages()
    create_territory_types()
    create_territories()
    create_characters()
    create_character_relations()
    create_users()

    IO.puts "created stuff"
  end

  def insert_models(models), do: models |> Enum.map &Repo.insert/1

  def create_lineages do

  end

  def create_territory_types do
    insert_models [
      %TerritoryType{ name: "Forest" },
      %TerritoryType{ name: "Desert" },
      %TerritoryType{ name: "Tundra" },
    ]
  end

  def create_territories do
    insert_models [
      %Territory{
        name: "Land of " <> Words.sample(:words),
        pos_x: 0,
        pos_y: 0,
        type_id: 1,
      },%Territory{
        pos_x: 0,
        pos_y: 1,
        type_id: 2,
      },%Territory{
        pos_x: 1,
        pos_y: 0,
        type_id: 1,
      },%Territory{
        pos_x: 1,
        pos_y: 1,
        type_id: 3,
      }
    ]
  end

  def create_characters do
    chars = [
      %Character{
        id: 1,
        name: "Bobacus",
      },%Character{
        id: 2,
        name: "Alith",
      },%Character{
        id: 3,
        name: "Alith II",
      },%Character{
        id: 4,
        name: "Alith III",
      },%Character{
        id: 5,
        name: "Bobarius",
      },%Character{
        id: 6,
        name: "Charlize",
      }
    ]
    chars = insert_models chars
  end

  def create_character_relations do
    insert_models [
      %CR{ parent_id: 1, child_id: 3 },
      %CR{ parent_id: 2, child_id: 3 },
      %CR{ parent_id: 1, child_id: 4 },
      %CR{ parent_id: 2, child_id: 4 },
      %CR{ parent_id: 4, child_id: 6 },
      %CR{ parent_id: 5, child_id: 6 },
    ]
  end

  def create_users do
    insert_models [
      %User{
        name: "Bob", email: "bob@hackers.com",
      },%User{
        name: "Alice", email: "alice@security.com",
      }
    ]
  end

end

Core.Seed.run