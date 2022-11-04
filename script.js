const downloadBtn = document.querySelector('.download-button')
const urlInput = document.querySelector('.url-input')
const errorMsg = document.getElementById('error-message')
const spinner = document.querySelector('.spinner')
const URL_EXAMPLE = 'https://www.youtube.com/watch?'
const URL_MOBILE_EXAMPLE = 'https://youtu.be/'
const URL_DOWNLOAD = 'https://localhost:80/api/download?URL=' // 'https://youtube-downloader.yynyds.com:80/api/download?URL=' 'https://localhost:4000/download?URL=' work ''

downloadBtn.addEventListener('click', () => {
    if (urlInput.value && urlInput.value.includes(URL_EXAMPLE)) {
        urlInput.classList.remove('error')
        setStyleElement(errorMsg,'none')
        sendURL(urlInput.value) // highestvideo, lowestvideo
        setSpinner()
    } else if (urlInput.value && urlInput.value.includes(URL_MOBILE_EXAMPLE)) {
        urlInput.classList.remove('error')
        setStyleElement(errorMsg,'none')
        const url = urlInput.value.replace('youtu.be', 'youtube.com/watch?v=')
        sendURL(urlInput.value) // highestvideo, lowestvideo
        setSpinner()
    } else {
        setStyleElement(errorMsg,'block')
        setStyleElement(spinner, 'none')
        urlInput.classList.add('error')
    }
})

function setStyleElement (element, value) {
    element.style.display = value
}
function setSpinner () {
    setStyleElement(spinner,'block')
    let timerId = setInterval(() => setStyleElement(spinner,'block'), 1)
    setTimeout(() => {
        clearInterval(timerId)
        setStyleElement(spinner,'none')
    }, 1400)
}
function sendURL(URL) {
    // window.location.href = `${URL_DOWNLOAD}${URL}`
    window.open(`${URL_DOWNLOAD}${URL}`, '_blank')
    console.log('sendURL', `${URL_DOWNLOAD}${URL}`)
    fetch(`${URL_DOWNLOAD}${URL}`,
        {
            method: 'GET',
            mode: 'no-cors',
            responseType: 'video/mp4', // 'application/octet-stream',
            // headers: {
            //     'Content-Type': 'application/octet-stream'
            // },

        })
    .then(response => {
        console.log('res', response)
        const blob = new Blob([response.data], { type: response.headers['content-type'] })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        document.getElementsByTagName('body')[0].appendChild(link)
        link.href = url
        link.download = 'yt-video.mp4'
        link.click()
        document.getElementsByTagName('body')[0].removeChild(link)
        })
    // { responseType: 'blob' }
    // const response = await fetch(`${URL_DOWNLOAD}${URL}&quality=${quality}`, { responseType: 'blob' })
    // console.log(response.data)
    /*const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    const fileName = response.headers['content-disposition'].substring(22, 52);
    fileLink.setAttribute('download', fileName);
    fileLink.setAttribute('target', '_blank');
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();*/
    urlInput.value = ''
}
