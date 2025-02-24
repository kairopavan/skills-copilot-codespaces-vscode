// Create web server
// 1. Create a web server
// 2. Read the comments from the file
// 3. Send the comments as response
// 4. Add a new comment
// 5. Write the new comment to the file
// 6. Send the new comment as response

// 1. Create a web server
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    console.log(path);

    if (path == '/comments') {
        if (req.method == 'GET') {
            // 2. Read the comments from the file
            fs.readFile('comments.txt', function(err, data) {
                res.end(data);
            });
        } else if (req.method == 'POST') {
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                // 4. Add a new comment
                fs.appendFile('comments.txt', body + '\n', function(err) {
                    res.end(body);
                });
            });
        }
    } else {
        res.end('Not found');
    }
});

server.listen(3000);
console.log('Server is running on port 3000');