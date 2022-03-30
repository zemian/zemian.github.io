<?php
$files = glob("source/_posts/**/*.md");
var_dump($files);
$count = count($files);
echo "{$count} files found.\n";
