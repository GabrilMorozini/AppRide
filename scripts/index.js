/*
Copyright (c) 2023 Gabriel Morozini
 
Partes do software Bootstrap são sujeitas à licença MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE).

Desenvolvido com o uso da biblioteca Popper.js (https://popper.js.org/) - Licenciado sob a MIT License (https://github.com/floating-ui/floating-ui/blob/master/LICENSE)

Atribuição é obrigatória.
*/

const rideListElement = document.querySelector("#rideList")
const rideListMsg = document.querySelector("#rideListMsg")
const allRides = getAllRides()

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let dataElementClass = "flex-fill d-flex flex-column"
let cityDivClass = "text-primary fw-bold mb-2"
let maxSpeedDivClass = "h5"
let dateDivClass = "text-secondary mt-2"

if (localStorage.length != 0) {
    rideListElement.classList.remove("d-none")
    document.body.classList.remove("h-100")
} else {
    rideListMsg.classList.remove("d-none")
    document.body.classList.add("h-100")
}

allRides.forEach(async ([id, value]) => {

    const ride = JSON.parse(value)
    ride.id = id

    const itemElement = document.createElement("li");
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"

    rideListElement.appendChild(itemElement)

    itemElement.addEventListener("click", () => {
        window.location.href = `./detail.html?id=${ride.id}`
    })

    const mapID = `map${ride.id}`
    const mapElement = document.createElement("div")
    mapElement.id = mapID
    mapElement.style = "width:100px; height:100px"
    mapElement.className = "bg-secondary rounded-4"

    const dataElement = await createElements(ride, dataElementClass, cityDivClass, maxSpeedDivClass, dateDivClass)

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    const firstPosition = initialPosition(ride)

    const map = L.map(mapID, {
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false
    })

    map.setView([firstPosition.latitude, firstPosition.longitude], 15)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 10,
        maxZoom: 19
    }).addTo(map)
    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)
})