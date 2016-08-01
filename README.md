# API Basejump: Request Header Parser

User stories:

> If I send a url, it'll give me back a new url with JSON object that redirects to the original

## Example usage:

`https://stark-stream-79701.herokuapp.com/http://google.com` will give you something like `https://lanckey.com/1234` and plugging `https://lanckey.com/1234` into your browser will take you to `http://google.com`

## Example output

`{ "original_url":"http://google.com", "short_url":"https://lanckey.com/1234" }`


