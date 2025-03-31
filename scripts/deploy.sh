#!/bin/sh

source ./scripts/private.sh
if [ "$DESTDIR" != "" ] ; then
	COMMANDS=("$@")
	WORKDIR="$DESTDIR"
else
	PARMS=("$@")
	COMMANDS=("${PARMS[@]:0:${#PARMS[@]}-1}")
	WORKDIR="${PARMS[@]: -1}"
fi
echo "Deploying into $WORKDIR"
# echo "COMMANDS = ${COMMANDS[@]}"
# echo "WORKDIR = $WORKDIR"

for COMMAND in "${COMMANDS[@]}"; do
	if [ "$COMMAND" = "clean" ] ; then
		rm -rvf "$WORKDIR"
	elif [ "$COMMAND" = "mkdir" ] ; then
		mkdir -p "$WORKDIR"
	elif [ "$COMMAND" = "deploy" ] ; then
		git archive main | tar -x -C "$WORKDIR"
	fi
#	npm run $COMMAND "$WORKDIR"
done
