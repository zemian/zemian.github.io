wp-bedrock

https://roots.io/bedrock/

## Installing WP CLI

  curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
  chmod +x wp-cli.phar
  sudo mv wp-cli.phar /usr/local/bin/wp

## How to Run

Edit `env` file to match your settings. (Ensure WP_SITEURL is ends with `/wp` since that's Bedrock 
defualt!)

  wp server
  open http://localhost:8080/
  open http://localhost:8080/wp/wp-admin

## Installing plugins

  composer require wpackagist-plugin/query-monitor

