# yt-dlp-server
A yt-dlp web server, powered by yt-dlp.

Intended to provide raw video url and other metadata as a json payload, not as a streaming server.

## Getting started
```
npm install
npm start
```

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## API

```
GET /watch?v=<YOUTUBE_VIDEO_ID_HERE>

Redirects to the raw video url. One of -v or -u must be provided. If both are provided,
-u will be ignored.

- v - Url or ID of the video, same as the url parameter of GET /v1/video
- u - The base64-encoded URL to a video URL supported by yt-dlp (e.g. YouTube video, tweet with embedded video)
```
