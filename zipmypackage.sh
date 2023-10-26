#!/bin/bash

# Define the name of your package
PACKAGE_NAME="vehicle-blocks"

# Define the directory to be zipped (currently set as "." to indicate the current directory)
DIR_TO_ZIP="."

# Set the output file name
OUTPUT_FILE="./$PACKAGE_NAME.zip"

# Exclude the node_modules directory
EXCLUDE="node_modules/*"
EXCLUDE="public/*"
EXCLUDE=".gitignore"
EXCLUDE="package-lock.json"
EXCLUDE="package.json"
EXCLUDE="README.md"
EXCLUDE="zipmypackage.sh"


# This will zip the directory excluding the node_modules
zip -r "$OUTPUT_FILE" "$DIR_TO_ZIP" -x "$EXCLUDE"