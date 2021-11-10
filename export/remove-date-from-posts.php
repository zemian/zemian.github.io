<?php
// Remove all date from the _posts filenames.

$dir = "../blog/_posts";
$subdirs = array_slice(scandir($dir), 2);
$count = 0;
foreach ($subdirs as $subdir) {
    $subdir_files = array_slice(scandir("$dir/$subdir"), 2);

    foreach ($subdir_files as $file) {
        $filename = "$dir/$subdir/$file";
        $new_file = preg_replace('/\d{4}-\d{2}-\d{2}-(.*)/', '$1', $file);
        $new_filename = "$dir/$subdir/$new_file";
        echo "Rename $filename to $new_filename\n";
        rename($filename, $new_filename);
        $count++;
    }
}

echo "Total $count files processed.\n";
