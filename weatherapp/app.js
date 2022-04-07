let lon;
let lat;
let temperature = document.querySelector('.temperature');
let location = document.querySelector('.location');
let summary = document.querySelector('.summary');
let icon = document.querySelector('.icon');
const kelvin = 273;

window.addEventListener("load", ()=>{
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;


const api_key = "3915b57a37556d0743125578a4b6aaa8";
 
//corinth lon 22.932030 lat 37.938580
const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

fetch(base).then((response)=>{
    return response.json();
})
.then((data) => {
    console.log(data);
    temperature.textContent = Math.floor(data.main.temp - kelvin) + '°C';
    summary.textContent = data.weather[0].descritpion;
    loc.textContent = data.name + ',' + data.sys.country;
    let icon1 = data.weather[0].icon;
    icon.innerHTML = `<img scr="icons/${icon1}.svg" style='height:10rem'/>`;
    
    });
   });    
  }
});
