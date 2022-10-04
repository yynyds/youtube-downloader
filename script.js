const downloadBtn = document.querySelector('.download-button')
const urlInput = document.querySelector('.url-input')
const errorMsg = document.getElementById('error-message')
const spinner = document.querySelector('.spinner')
const URL_EXAMPLE = 'https://www.youtube.com/watch?'
const URL_DOWNLOAD = 'https://youtube-downloader.yynyds.com:4000/download?URL=' // 'https://localhost/download?URL='

downloadBtn.addEventListener('click', () => {
    if (urlInput.value && urlInput.value.includes(URL_EXAMPLE)) {
        urlInput.classList.remove('error')
        setStyleElement(errorMsg,'none')
        sendURL(urlInput.value)
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
    window.location.href = `${URL_DOWNLOAD}${URL}`
    urlInput.value = ''
}
