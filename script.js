const downloadBtn = document.querySelector('.download-button')
const urlInput = document.querySelector('.url-input')
downloadBtn.addEventListener('click', () => {
    sendURL(urlInput.value)
})
function sendURL(URL) {
    window.location.href = `http://localhost:4000/download?URL=${URL}`
}
