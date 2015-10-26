if [[ ! -d "$(pwd)/apps" || ! -f "mix.exs" ]]; then
  echo "Only RUNME from project root" && exit
fi

if [[ ! -d "apps/stg_site/node_modules" ]]; then
  cd "apps/stg_site"
  echo "NPM modules missing, running 'npm install' from apps/stg_site"
  npm install
fi

CMD='mix do deps.get, compile, phoenix.server'
if [[ $* == *-d* ]]; then
  CMD="iex -S $CMD"
fi
$CMD
