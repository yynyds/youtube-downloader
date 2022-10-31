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
app.get('/api/download', async (req,res) => {
    const videoID = ytdl.getVideoID(req.query.URL)
    console.log('videoID', videoID)
    const range = req.headers.range
    console.log('rangerange', range)
    const infoByVideoID = ytdl.getInfo(videoID).then(data => {
        console.log('RES infoByVideoID', data.player_response.videoDetails.title)
        const download = ytdl(req.query.URL, { filter: 'audioandvideo' })
        console.log('download', download)
        const writeStream = fs.createWriteStream(`./videos/${data.player_response.videoDetails.title}.mp4`)
        download.pipe(writeStream)
        writeStream.on('finish', () => {
            writeStream.close()
            console.log('DONWLOAD COMPLETED')
            const videoPath = __dirname + '/videos/' + data.player_response.videoDetails.title + '.mp4'
            res.download(videoPath)
        })
        ///
        /*setTimeout(() => {
            console.log('REEQ_HEADERS', req.headers)
            const range = req.headers.range
            console.log('rangerange', range)
            const videoPath = __dirname + '/videos/' + data.player_response.videoDetails.title + '.mp4'
            const videoSize = fs.statSync(videoPath).size

            const chunkSize = 1 * 1e+6
            const start = Number(range.replace(/\D/g, ''))
            const end = Math.min(start + chunkSize, videoSize - 1)

            const contentLength = end - start + 1

            const headers = {
                'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': contentLength,
                'Content-Type': 'video/mp4'
            }
            res.writeHead(200, headers)
            const stream = fs.createReadStream(videoPath, { start, end })
            stream.pipe(res)
            console.log('FFFIIILEEE', videoPath)
            res.download(videoPath)
        }, 1000)*/
    })
})
