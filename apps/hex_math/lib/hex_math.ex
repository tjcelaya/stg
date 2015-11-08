defmodule Point do
  defstruct [:x, :y]
end

defmodule Hex do
  alias __MODULE__, as: H

  defstruct [:q, :r, :s]

  def add(%H{ q: xQ, r: xR, s: xS},
          %H{ q: yQ, r: yR, s: yS}),
    do: %H{ q: xQ + yQ, r: xR + yR, s: xS + yS}

  def sub(%H{ q: xQ, r: xR, s: xS},
          %H{ q: yQ, r: yR, s: yS}),
    do: %H{ q: xQ - yQ, r: xR - yR, s: xS - yS}

  def scale(%H{ q: xQ, r: xR, s: xS}, k),
    do: %H{ q: xQ * k, r: xR * k, s: xS * k }

  @directions %{
    east:       %H{q:  1, r:  0, s: -1},
    northeast:  %H{q:  1, r: -1, s:  0},
    northwest:  %H{q:  0, r: -1, s:  1},
    west:       %H{q: -1, r:  0, s:  1},
    southeast:  %H{q: -1, r:  1, s:  0},
    southwest:  %H{q:  0, r:  1, s: -1},
  }
  
  def neightbor(h = %H{}, dir), do: add(h, @directions[dir])

end

