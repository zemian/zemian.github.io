<?php
// This script should be run inside export dir with "composer install" setup first.
// Generate a posts.json data file for quick design mockup used in '../zblog-design'

require "vendor/autoload.php";
$json_file = "posts.json";
$dir = "../blog/_posts";
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

$files = array_reverse($files); // sort files by latest first
$export_posts_count = 10; // We only want to export 10 posts
foreach (array_slice($files, 0, $export_posts_count) as $filename) {
    $str = file_get_contents($filename);
    $document = $parser->parse($str, $parse_markdown);
    $yaml = $document->getYAML();
    $content = $document->getContent();

    $title = $yaml['title'];
    $post_date = date('c', $yaml['date']);
    $tags = $yaml['tags'];

    echo "Processing $filename\n";
    $json_data []= array(
        'ID' => $count + 1,
        'post_title' => $title,
        'post_content' => $content,
        'post_date' => $post_date,
        'post_type' => 'post',
        'post_status' => 'publish',
        'tags_input' => $tags,
        'post_author' => 1,
        'post_author_display_name' => "Zemian Deng",
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