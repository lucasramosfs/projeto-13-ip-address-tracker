let pesquisar = document.getElementById("btn-pesquisar")
const pesquisa = document.getElementById("pesquisa")
const respIp = document.getElementById("ip-address")
const respLocation = document.getElementById("location")
const respTimezone = document.getElementById("timezone")
const respIsp = document.getElementById("isp")
const resposta = document.querySelectorAll("h2")


const map = L.map('map')

   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 19,
       attribution: '© OpenStreetMap'
   }).addTo(map);
    map.locate({setView: true,maxZoom: 10})




pesquisar.addEventListener('click', ()=>{
    
    teste(pesquisa.value)
})

async function teste(ipAddress) {

    resposta.forEach((item)=>{
        item.innerHTML = ""
    })

    const url = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_Josei1ZjJQAIDhOKoxuQPMoNmyjQ7&ipAddress=${ipAddress}`)

    const api = await url.json()

    respIp.innerHTML = api.ip
    respLocation.innerHTML = `${api.location.city}, ${api.location.country} ${api.location.geonameId}`
    respTimezone.innerHTML = `UTC ${api.location.timezone}`
    respIsp.innerHTML = api.isp

    console.log(api.location);
    map.setView([api.location.lat, api.location.lng], 16);
    let marcador = L.marker([api.location.lat, api.location.lng]).addTo(map);


}
