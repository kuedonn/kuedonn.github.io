
let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');
let cityname = document.querySelector('.cityname');
let desc = document.querySelector('.desc');
let temp = document.querySelector('.temp');

button.addEventListener('click', function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=3915b57a37556d0743125578a4b6aaa8&units=metric")
    .then(response => response.json())
    .then(data => {
        console.log(data)

    let nameValue = data['name'];
    let tempValue = data['main']['temp'];
    let descValue = data['weather'][0]['description']; 
    cityname.innerHTML = nameValue;
    temp.innerHTML = tempValue;
    desc.innerHTML = descValue;
})
.catch(err => alert("Wrong city name"))
})



