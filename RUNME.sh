CMD='mix do deps.get, compile, phoenix.server'
if [[ $* == *-d* ]]
then
  CMD="iex -S $CMD"
fi
$CMD