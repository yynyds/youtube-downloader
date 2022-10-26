const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')
const fs = require('fs')
const https = require('https')
const path = require('path')
const app = express()

app.use(cors())

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
}

https.createServer(httpsOptions, app)
    .listen(80 , () => {
         console.log('Server Works! At port 80 ')
    })
app.get('/api/download', (req,res) => {
    console.log('Hi:)')
    const URL = req.query.URL
    res.header('Content-Disposition', 'attachment; filename="video.mp4"')
    ytdl(URL, {
        format: 'mp4'
    }).pipe(fs.createWriteStream('video_2.mp4'))
    res.end('END')
})
