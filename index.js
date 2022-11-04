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
app.get('/api/download', async (req,res,next) => {
    const videoID = ytdl.getVideoID(req.query.URL)
    console.log('videoID', videoID)
    const range = req.headers.range
    console.log('rangerange', range)
    const infoByVideoID = ytdl.getInfo(videoID).then(data => {
        console.log('RES infoByVideoID', data.player_response.videoDetails.title)
        const download = ytdl(req.query.URL, { filter: 'audioandvideo' })
        console.log('download', download)
        const writeStream = fs.createWriteStream(__dirname + '/videos/' + data.player_response.videoDetails.title + '.mp4') // `./videos/${data.player_response.videoDetails.title}.mp4`
        download.pipe(writeStream)
        writeStream.on('finish', () => {
            writeStream.close()
            console.log('DONWLOAD COMPLETED')
            // const videoPath = __dirname + '/videos/' + data.player_response.videoDetails.title + '.mp4'
            // console.log('videoPath', videoPath)
            // res.download(videoPath)
            var filePath = path.join(__dirname, `/videos/${data.player_response.videoDetails.title}.mp4`)
            var stat = fs.statSync(filePath)

            const head = {
                'Content-Length': stat.size,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);

            // res.writeHead(200, {
            //     'Content-Type': 'video/mp4', // 'application/octet-stream',
            //     'Content-Length': stat.size
            // })
            //
            // var readStream = fs.createReadStream(filePath);
            // readStream.pipe(res);
        })
    })
})
