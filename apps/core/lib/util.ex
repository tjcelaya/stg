defmodule Words do
  @dict_of_dicts [
    words: "/usr/share/dict/words",
    names: "/usr/share/dict/propernames",
    connectives: "/usr/share/dict/connectives"
  ]

  @allowed_kinds Keyword.keys @dict_of_dicts

  def start_link do
    opts = [name: __MODULE__]

    Agent.start_link(fn ->
      @dict_of_dicts |> Enum.map(fn {k, filename} ->
        words = case File.read filename do
          {:ok, f} -> String.split f
          _ -> [ Atom.to_string k ]
        end
        { k, words }
      end)
    end,
    opts)
  end

  def sample(kind) do
    unless kind in @allowed_kinds do
      raise "Kind not in #{inspect @allowed_kinds}"
    end

    Agent.get Process.whereis(__MODULE__), fn l ->
      Enum.random Dict.get(l, kind)
    end
  end
end
