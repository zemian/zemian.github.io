<?php
// Generate a posts.json data file for quick design mockup used in '../zblog-design'

require "vendor/autoload.php";
require $_SERVER['HOME'] . "/my-php/learn-wordpress/wordpress/wp-load.php";
$json_file = "../zblog-design/posts.json";
$dir = "../blog/_posts";
$wp_user = get_user_by('login', 'zemian');
$parser = new Mni\FrontYAML\Parser;
$subdirs = array_slice(scandir($dir), 2);
$count = 0;
$parse_markdown = true; // save html instead of markup
$json_data = array();
$files = array();
foreach ($subdirs as $subdir) {
    $subdir_files = array_slice(scandir("$dir/$subdir"), 2);

    foreach ($subdir_files as $file) {
        $filename = "$dir/$subdir/$file";
        $files []= $filename;
    }
}

// sort files by latest first
$files = array_reverse($files);
foreach (array_slice($files, 0, 10) as $filename) {
    $str = file_get_contents($filename);
    $document = $parser->parse($str, $parse_markdown);
    $yaml = $document->getYAML();
    $content = $document->getContent();

//        // Fix image path
//        $new_image_path = "../wp-content/uploads/2021/11";
//        $content = preg_replace('#/images/posts/\d+/(.+)#', "$new_image_path/$1", $content);

    $title = $yaml['title'];
    $post_date = date('c', $yaml['date']);
    $tags = $yaml['tags'];

    echo "Processing $filename\n";
    $json_data []= array(
        'post_name' => sanitize_title($title),
        'post_title' => $title,
        'post_content' => $content,
        'post_date' => $post_date,
        'post_type' => 'post',
        'post_status' => 'publish',
        'tags_input' => $tags,
        'post_author' => $wp_user->ID,
        'post_author_display_name' => $wp_user->display_name,
    );
    $count++;
}

// Sort posts by dates with latest posts first
usort($json_data, function ($a, $b) {
    return strtotime($b['post_date']) <=> strtotime($a['post_date']);
});
$json_data = json_encode($json_data, JSON_PRETTY_PRINT);
file_put_contents($json_file, $json_data);
echo "Total $count files processed.\n";