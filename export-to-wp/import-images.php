<?php
// This script should be run inside zemian-blog-import
// This script will import all Markdown blogs into WP.

require "../wordpress/wp-load.php";
require $_SERVER['HOME'] . "/my-php/learn-wordpress/wordpress/wp-load.php";
$dir = "../blog/images";

function get_files($dir) {
    $files = [];
    $subdirs = array_slice(scandir($dir), 2);
    foreach ($subdirs as $subdir) {
        if (is_dir("$dir/$subdir")) {
            $subfiles = get_files("$dir/$subdir");
            array_push($files, ...$subfiles);
        } else {
            $files []= "$dir/$subdir";
        }
    }
    return $files;
}

$wp_user = get_user_by('login', 'zemian');
$files = get_files($dir);
$count = 0;
$wp_uploads_dir = wp_upload_dir('2021/11')['path']; // Ensure to use fixed date string in subdir
$wp_uploads_subdir = substr(wp_upload_dir()['subdir'], 1); // remove leading '/';
echo "Uploading to WP dir: $wp_uploads_dir\n";
foreach ($files as $file) {
    $pathinfo = pathinfo($file);
    $basename = $pathinfo['basename']; // filename + ext
    $filename = $pathinfo['filename'];
    copy($file, "$wp_uploads_dir/$basename");
    $file_type = wp_check_filetype($file)['type'];
    $wp_file = "$wp_uploads_subdir/$basename";
    $result = wp_insert_attachment([
        'post_name' => $basename,
        'post_title' => $filename,
        'post_mime_type' => $file_type,
        'post_author' => $wp_user->ID,
    ], $wp_file, -1, true);
    if (is_wp_error($result)) {
        echo "Failed to insert attachment $file\n";
        var_dump($result);
        exit;
    } else {
        echo "Uploaded media: $file, ID=$result\n";
    }
    $count++;
}
echo "Total $count files processed.\n";