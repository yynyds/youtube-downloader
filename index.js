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
    .listen(4000 , () => {
         console.log('Server Works! At port 4000 ')
    })
app.get('/download', (req,res) => {
    console.log('Hi:)')
    const URL = req.query.URL
    res.header('Content-Disposition', 'attachment; filename="video.mp4"')
    ytdl(URL, {
        format: 'mp4'
    }).pipe(res)
})
