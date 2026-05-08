//hitting a key
//play animation .playing
//plays sound


function initialize_keys() {
    let keys = document.getElementsByClassName('key')
    let sounds = document.getElementsByClassName('sound')
    
    console.log(keys)
    let index = 0
    let key_binds = {}
    for (const key of keys) {
        const audio_url = "./sounds/" + sounds[index].textContent + ".wav"
        //const myAudio = new Audio()
        const child = key.firstElementChild.textContent.toLowerCase()
        //myAudio.play()
        key_binds[child] = {"audio_url":audio_url, "key_div": key}
        console.log(index, key, sounds[index].textContent, key.getAttribute('data-key'))
        index++;
    }
    document.addEventListener('keydown', (event) => {
        console.log(event.code, event.key)
        for (key in key_binds) {
            if (event.key === key) {
                console.log(key, key_binds[key])
                let key_div = key_binds[key]["key_div"]
                let audio_url = key_binds[key]["audio_url"]
                key_div.classList.add('playing')
                const audio = new Audio(audio_url)
                audio.play()
                audio.addEventListener('ended', () => {
                    key_div.classList.remove('playing')
                })
            }

        }
    })
}


document.addEventListener("DOMContentLoaded", () => {
    initialize_keys()
})