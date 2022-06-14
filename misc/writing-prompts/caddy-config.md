# https://caddyserver.com/docs
{
    # We set global ports (they are internal anyway) to something other than 80/443 for custom use!
    http_port 2019
    https_port 2020
}

# Configure localhost web server
localhost:2020 {
	root * .
	file_server {
	    index '.do_not_serve_index.html' # Avoid serving normal index.html
	    browse
	}
}
