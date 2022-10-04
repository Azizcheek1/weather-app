const api = {
    key: 'bfd80e13c4f79230dd92cb194737716d',
    baseurl: 'https://api.openweathermap.org/data/2.5/',
};
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress' , setQuery);
function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchBox.value);
    }
}
function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) =>{
            return weather.json();
        })
        .then(displayResults);
}
function displayResults(weather){
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date()

    let date = document.querySelector('.date')
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weath = document.querySelector('.weather');
    weath.innerHTML = `${weather.weather[0].main}`;

    let hilow= document.querySelector('.hi-low');
    hilow.innerHTML= `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function dateBuilder(s){
    let months = ['Yanvar' , 'Fevral' , 'Mart' , 'Aprel' , 'May' , 'Iyun' , 'Iyul' , 'Avgust' , 'Sentyabr' , 'Oktyabr' , 'Noyabr' , 'Dekabr']
    let days = [1,'Dushanba' , 'Seshanba' , 'Chorshanba' , 'Payshanba' , 'Juma' , 'Shanba' , 'Yakshanba'];
    let day = days[s.getDay()];
    let date = s.getDate();
    let month = months[s.getMonth()];
    let year = s.getFullYear();
    return `${day} ${date} ${month} ${year}`
}