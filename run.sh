#!/bin/bash

set -eu -o pipefail

PROJECT_NAME="AirSim"

main () {
  local subcommand="watch"

  while [[ $# -gt 0 ]]; do
    arg="$1"
    case $arg in
      -h|-help|--help|help)
        echo "Run an ${PROJECT_NAME} project command"
        echo
        echo "Usage: ./run.sh [-h] [subcommand] [option]"
        echo
        echo "Subcommands"
        echo
        echo "  watch: Run 'dotnet watch' on the main web project"
        echo
        echo "Default Subcommand"
        echo
        echo "If no subcommand is specified, the watch subcommand will be run"
        exit
        ;;
      watch)
        subcommand="watch"
        ;;
      *)
        echo "Unknown positional argument: ${arg}" 2>&1
        exit 1
        ;;
      -*)
        echo "Unknown option : ${arg}" 2>&1
        exit 1
        ;;
    esac
  done

  $subcommand
}

watch () {
  dotnet watch --project src/AirSim.Web/AirSim.Web.csproj
}

main "$@"
