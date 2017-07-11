#/bin/bash

# build.sh is a helper script for compiling/building javascript and css files
# Please update these lines before use it

YUI='../../tools/yuicompressor/build/yuicompressor-2.4.7.jar'
FILES='src/*.js src/*.css'
OUTPUT_DIR='min'

for FILE in $FILES 
do
	TYPE=${FILE/*./}
	NAME=`basename "$FILE"`
	OUTPUT="$OUTPUT_DIR/$NAME"
	`java -jar $YUI --type $TYPE -v $FILE -o $OUTPUT`
done

