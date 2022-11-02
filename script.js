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
    const fileLink = document.createElement('a')
    fileLink.href = `${URL_DOWNLOAD}${URL}`
    const fileName = 'video.mp4'
    fileLink.setAttribute('video.mp4', fileName)
    fileLink.setAttribute('target', '_blank')
    document.body.appendChild(fileLink)
    fileLink.click()
    fileLink.remove()
    console.log('sendURL', `${URL_DOWNLOAD}${URL}`)
    fetch(`${URL_DOWNLOAD}${URL}`,
        {
            method: 'GET',
            mode: 'no-cors',
            responseType: 'application/octet-stream',
            // headers: {
            //     'Content-Type': 'application/octet-stream'
            // },

        })
    .then(response => {
        console.log('res', response)
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        console.log('fileURL', fileURL)
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        const fileName = 'TEST.mp4'
        fileLink.setAttribute('download', fileName);
        fileLink.setAttribute('target', '_blank');
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();
        response.blob()
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
