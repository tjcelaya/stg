defmodule Core.Repo.Migrations.CreateUsers do
  use Ecto.Migration
require IEx
  defmacrop name(opts \\ [null: false]) do
    quote do
      add :name, :string
    end
  end

  def change do
    create table(:user) do
      name
      add :email, :string
      add :hash, :string#, null: false
      add :salt, :string#, null: false
      add :recovery_hash, :string

      timestamps
    end

    create table :lineage do
      name
    end

    create table :character do
      name
      add :user_id, references(:user)
      # add :user_id, references(:user, null: false)
      # nullable? AI could be implemented as userless characters

      add :character_id, references(:character)
    end

    create table :character_relationship do
      add :parent_id, references(:character, null: false)
      add :child_id, references(:character, null: false)
    end

    create table :resource_type do
      name
    end

    create table :resource do
      name
      add :type_id, references(:resource_type)
    end

    create table :territory_type do
      name
    end

    create table :territory do
      name [null: true]
      add :pos_x, :integer
      add :pos_y, :integer

      add :character_id, references(:character)
      add :type_id, references(:territory_type)
    end

    create table :resource_territory do
      add :resource_id, references(:resource)
      add :territory_id, references(:territory)
      add :quantity, :integer
    end

    create table(:events, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :data, :map

      # timestamps alone would include updated_at
      add :inserted_at, :datetime
    end

    # create table(:attrs, primary_key: false) do
    #   add :id, :integer # foreign key, not primary/serial
    #   add :attr, :string
    #   add :val, :integer
    #   add :dt, :timestamp
    # end
  end
end
