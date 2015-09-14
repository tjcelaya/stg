defprotocol Sample do
  @doc "Returns a random element from an enumerable"
  def take(enum)
  def take(enum, n)
end

defimpl Sample, for: List do
  def take(list) do
    Enum.at list, :random.uniform(length(list)) - 1
  end

  def take(list, n) when 0 < n do
    for _ <- 1..n, do: Sample.take list
  end
end

defimpl Sample, for: Range do
  def take(enum) do
    enum |> Enum.to_list |> Sample.take
  end

  def take(enum, n) when 0 < n do
    enum |> Enum.to_list |> Sample.take(n)
  end
end



defmodule Words do
  # use Supervisor

  @dict_of_dicts [
    words: "/usr/share/dict/words",
    names: "/usr/share/dict/propernames",
    connectives: "/usr/share/dict/connectives"
  ]

  def start_link do
    opts = [name: __MODULE__]

    Agent.start_link(fn ->
      @dict_of_dicts |> Enum.map(fn {k, v} ->
        {k, v |> File.read! |> String.split}
      end)
    end,
    opts)
  end

  defp _sample(l, kind) do
    Agent.get l, fn l ->
      Sample.take Dict.get(l, kind)
    end
  end

  def sample(kind) do
    _sample Process.whereis(__MODULE__), kind
  end
end
