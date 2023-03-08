import express from 'express';
const cors = require('cors');
const compression = require('compression')

import {YoutubeDl} from "./YoutubeDl";

const app = express();
const port = process.env.PORT || 3000;

app.use(compression())
app.use(cors())

app.get('/v1/video', async (req, res) => {
    try {
        const url = req.query.url as string;
        const options = req.query.options as string;
        if(!url){
            res.status(400);
            res.send('Missing url');
            return;
        }
        let schema = req.query.schema as string[];
        let metadata = await YoutubeDl.getVideoMetadata(url, options, schema);
        res.json(metadata);
    } catch (e) {
        console.error(e)
        res.status(500);
        res.send(e);
    }
});

app.get('/watch', async (req, res) => {
    try {
        const v = req.query.v as string;
        const u = req.query.u as string;
        const options = req.query.options as string;
        let videoUrl;
        if (v || u) {
            videoUrl = await YoutubeDl.getVideoUrl(v || u, options, ['url'], !!u);
        } else {
            res.status(400);
            res.send('Missing video ID or URL');
            return;
        }
        res.redirect(videoUrl);
    } catch (e) {
        console.error(e)
        res.status(500);
        res.send(e);
    }
});

app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`);
});
