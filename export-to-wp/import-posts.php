<?php
// This script should be run inside export-to-wp with "composer install" setup first.
// This script will import all Markdown blogs into WP.

require "vendor/autoload.php";
require $_SERVER['HOME'] . "/my-php/learn-wordpress/wordpress/wp-load.php";
$dir = "../blog/_posts";

// This will prevent WP sanitize our importing posts content
remove_all_filters('content_save_pre');

$wp_user = get_user_by('login', 'zemian');
$parser = new Mni\FrontYAML\Parser;
$subdirs = array_slice(scandir($dir), 2);
$count = 0;
$parse_markdown = false;
foreach ($subdirs as $subdir) {
    $files = array_slice(scandir("$dir/$subdir"), 2);

    foreach ($files as $file) {
        $filename = "$dir/$subdir/$file";
        $str = file_get_contents($filename);
        $document = $parser->parse($str, $parse_markdown);
        $yaml = $document->getYAML();
        $content = $document->getContent();

        // Fix image path
        $new_image_path = "../wp-content/uploads/2021/11";
        $content = preg_replace('#/images/posts/\d+/(.+)#', "$new_image_path/$1", $content);

        $title = $yaml['title'];
        $post_date = date('c', $yaml['date']);
        $tags = $yaml['tags'];

        echo "Processing $filename\n";
        $result = wp_insert_post(array(
            'post_title' => $title,
            'post_content' => $content,
            'post_date' => $post_date,
            'post_type' => 'post',
            'post_status' => 'publish',
            'tags_input' => $tags,
            'post_author' => $wp_user->ID,
        ), true);

        if (is_wp_error($result)) {
            echo "Failed $filename";
            var_dump($result);
            exit;
        }
        $count++;
    }
}
echo "Total $count files processed.\n";