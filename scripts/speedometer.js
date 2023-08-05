/*
Copyright (c) 2023 Gabriel Morozini
 
Partes do software Bootstrap são sujeitas à licença MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE).

Desenvolvido com o uso da biblioteca Popper.js (https://popper.js.org/) - Licenciado sob a MIT License (https://github.com/floating-ui/floating-ui/blob/master/LICENSE)

Atribuição é obrigatória.
*/

const speedElement = document.querySelector("#speed")
const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let watchID = null
let currentRide = null
startBtn.addEventListener("click", () => {

    if (watchID)
        return

    function handleSuccess(position) {
        addPosition(currentRide, position)
        speedElement.innerText = position.coords.speed ? (position.coords.speed * 3.6).toFixed(1) : 0
    }

    function handleError(position) {
        console.log(error.msg)
    }

    const options = { enableHighAccuracy: true }
    currentRide = createNewRide()
    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options)
    startBtn.classList.add("d-none")
    stopBtn.classList.remove("d-none")
})

stopBtn.addEventListener("click", () => {
    if (!watchID)
        return

    navigator.geolocation.clearWatch(watchID)
    watchID = null
    updateStopTime(currentRide)
    currentRide = null
    startBtn.classList.remove("d-none")
    stopBtn.classList.add("d-none")
    window.location.href = "./"
})