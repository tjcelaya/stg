defmodule Core.Attr do
  use Ecto.Model
  @primary_key false
  schema "attrs" do
    field :id, :integer
    field :attr, :string
    field :val, :integer
    field :dt, Ecto.DateTime
  end
end

# R.all from (from a in Attr, group_by: [a.id, a.attr], select: { a.id, a.attr, max(a.dt) })
