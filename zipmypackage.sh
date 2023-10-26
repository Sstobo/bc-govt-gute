#!/bin/bash

# Define the name of your package
PACKAGE_NAME="vehicle-blocks"

# Define the directory to be zipped (currently set as "." to indicate the current directory)
DIR_TO_ZIP="."

# Set the output file name
OUTPUT_FILE="./$PACKAGE_NAME.zip"

# This will zip the directory
zip -r "$OUTPUT_FILE" "$DIR_TO_ZIP" 