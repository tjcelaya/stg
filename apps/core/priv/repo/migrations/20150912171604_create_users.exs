defmodule Core.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:user) do
      add :name,    :string
      add :email,   :string

      timestamps
    end
  end
end
