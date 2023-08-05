/*
Copyright (c) 2023 Gabriel Morozini
 
Partes do software Bootstrap são sujeitas à licença MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE).

Desenvolvido com o uso da biblioteca Popper.js (https://popper.js.org/) - Licenciado sob a MIT License (https://github.com/floating-ui/floating-ui/blob/master/LICENSE)

Atribuição é obrigatória.
*/

const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let dataElementClass = "flex-fill d-flex flex-column"
let cityDivClass = "text-primary fw-bold mb-2"
let maxSpeedDivClass = "h5"
let dateDivClass = "text-secondary mt-2"

document.addEventListener("DOMContentLoaded", async () => {
    const firstPosition = await initialPosition(ride)
    const dataElement = await createElements(ride, dataElementClass, cityDivClass, maxSpeedDivClass, dateDivClass)
    document.querySelector("#data").appendChild(dataElement)

    const deleteButton = document.querySelector("#deleteBtn")
    deleteButton.addEventListener("click", () => {
        deleteRide(rideID);
        window.location.href = "./"
    })

    const map = L.map("mapDetail")
    map.setView([firstPosition.latitude, firstPosition.longitude], 15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 3,
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    const positionArray = ride.data.map((position) => {
        return [position.latitude, position.longitude]
    })
    const polyline = L.polyline(positionArray, { color: "#F00" }).addTo(map)
    map.fitBounds(polyline.getBounds())
})