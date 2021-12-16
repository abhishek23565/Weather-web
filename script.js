let lat;
let long;

// my API key
let API_KEY = "04ad848f605c8f97c141e8dcffa6881c";


// navbar data variables
let last = document.getElementById("last");
let input = document.getElementById("search");
let searchicon = document.querySelector(".icon");


// section data variables
let temp = document.getElementById("temp");
let locate = document.getElementById("loc");
let min_max = document.getElementById("min_max");
let map_loc = document.getElementById("map-loc");


// full forecast data variables
let fullforecast = document.querySelector(".full-forecast");
let rain = document.getElementById("rain");
let feels = document.getElementById("feels");
let weatther = document.getElementById("weatherD");
let humidity = document.getElementById("humidity");
let press = document.getElementById("press");
let dew = document.getElementById("dew");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let suninfo1 = document.getElementById("suninfo1");
let suninfo2 = document.getElementById("suninfo2");


// 8 day forecast data variables
let day8forecast = document.querySelector(".day8forecast");
let card = document.querySelectorAll(".card");
let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let card3 = document.getElementById("card3");
let card4 = document.getElementById("card4");
let card5 = document.getElementById("card5");
let card6 = document.getElementById("card6");
let card7 = document.getElementById("card7");
let card8 = document.getElementById("card8");


//  toggle button
seeforecast.addEventListener("click", function () {
    fullforecast.classList.toggle("display");
    day8forecast.classList.toggle("eightdayforecast");
});


// time and date code
let time = document.getElementById("time");
let dateEle = document.getElementById("date");
setInterval(() => {
    const dates = new Date();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = dates.getDate();
    let dated = date < 10 ? "0" + date : date;
    let month = dates.getMonth();
    let day = dates.getDay();
    let hour = dates.getHours();
    let format12hour = hour >= 13 ? hour % 12 : hour;
    let hours = format12hour < 10 ? "0" + format12hour : format12hour;
    let minute = dates.getMinutes();
    let minutes = minute < 10 ? "0" + minute : minute;
    let DaNi = hour >= 12 ? "PM" : "AM";
    time.innerText = hours + " : " + minutes + " " + DaNi;
    dateEle.innerText = days[day] + ", " + dated + " " + months[month];
}, 1000);



// conditional code for showing weather data
if (input.innerText == "") {
    navigator.geolocation.getCurrentPosition((data) => {
        lat = data.coords.latitude;
        long = data.coords.longitude;
        locate.innerText = "Your Location";
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(allData => {
            // console.log(allData);
            showWeatherData(allData);
            furthurForecast(allData);
        }
        );
    });
}


// code for searched data
searchicon.addEventListener("click", function () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`).then(response => response.json()).then(info => {
        // console.log(info);
        lat = info.coord.lat;
        long = info.coord.lon;
        locate.innerText = info.name + ", " + info.sys.country;
        min_max.innerText = info.main.temp_min + " / " + info.main.temp_max;
        if (info.sys.country == "IN") {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(allData => {
                // console.log(allData);
                showWeatherData(allData);
                furthurForecast(allData)
            })
            suninfo1.classList.remove("hide");
            suninfo2.classList.remove("hide");
            fullforecast.classList.remove("forcst");
        }

        else {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(allData => {
                // console.log(allData);
                showWeatherData(allData);
                furthurForecast(allData);
            })
            suninfo1.classList.add("hide");
            suninfo2.classList.add("hide");
            fullforecast.classList.add("forcst");
        }
    }
    );
    input.value = "";
}
);


// showing weather data on the UI
function showWeatherData(weatherData) {
    last.innerText = weatherData.timezone;
    let temperor = weatherData.current.temp + "° C";
    temp.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png" alt="weather icon>
    <h1 id="temporal" style="font-size:2.5rem">${temperor}</h1>
    <p class="details"><span id="weatherD">${weatherData.current.weather[0].main}</span></p>
    `;

    // full forecast data
    rain.innerText = weatherData.current.clouds + "%";
    feels.innerText = weatherData.current.feels_like + "° C";
    humidity.innerText = weatherData.current.humidity + "%";
    press.innerText = weatherData.current.pressure;
    dew.innerText = weatherData.current.dew_point + "° C";
    sunrise.innerText = window.moment(weatherData.current.sunrise * 1000).format("HH:mm a");
    sunset.innerText = window.moment(weatherData.current.sunset * 1000).format("HH:mm a");

}

// 8 day forecast functions and data
function furthurForecast(weatherInfo) {
    card2.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherInfo.daily[1].weather[0].icon}@2x.png" alt="weather icon>
        <div class="Day">${window.moment(weatherInfo.daily[1].dt * 1000).format("ddd")}</div>
        <p class="details"><span id="feels real">${weatherInfo.daily[1].weather[0].main}</span></p>
        <p class="details">Day<span id="feels real">${weatherInfo.daily[1].temp.day + "° C"}</span></p>
        <p class="details">Night<span id="feels real">${weatherInfo.daily[1].temp.night + "° C"}</span></p>
        `;

    card3.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherInfo.daily[2].weather[0].icon}@2x.png" alt="weather icon>
        <div class="Day">${window.moment(weatherInfo.daily[2].dt * 1000).format("ddd")}</div>
        <p class="details"><span id="feels real">${weatherInfo.daily[2].weather[0].main}</span></p>
        <p class="details">Day<span id="feels real">${weatherInfo.daily[2].temp.day + "° C"}</span></p>
        <p class="details">Night<span id="feels real">${weatherInfo.daily[2].temp.night + "° C"}</span></p>
        `;

    card4.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherInfo.daily[3].weather[0].icon}@2x.png" alt="weather icon>
        <div class="Day">${window.moment(weatherInfo.daily[3].dt * 1000).format("ddd")}</div>
        <p class="details"><span id="feels real">${weatherInfo.daily[3].weather[0].main}</span></p>
        <p class="details">Day<span id="feels real">${weatherInfo.daily[3].temp.day + "° C"}</span></p>
        <p class="details">Night<span id="feels real">${weatherInfo.daily[3].temp.night + "° C"}</span></p>
        `;

    card5.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherInfo.daily[4].weather[0].icon}@2x.png" alt="weather icon>
        <div class="Day">${window.moment(weatherInfo.daily[4].dt * 1000).format("ddd")}</div>
        <p class="details"><span id="feels real">${weatherInfo.daily[4].weather[0].main}</span></p>
        <p class="details">Day<span id="feels real">${weatherInfo.daily[4].temp.day + "° C"}</span></p>
        <p class="details">Night<span id="feels real">${weatherInfo.daily[4].temp.night + "° C"}</span></p>
        `;

    card6.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherInfo.daily[5].weather[0].icon}@2x.png" alt="weather icon>
        <div class="Day">${window.moment(weatherInfo.daily[5].dt * 1000).format("ddd")}</div>
        <p class="details"><span id="feels real">${weatherInfo.daily[5].weather[0].main}</span></p>
        <p class="details">Day<span id="feels real">${weatherInfo.daily[5].temp.day + "° C"}</span></p>
        <p class="details">Night<span id="feels real">${weatherInfo.daily[5].temp.night + "° C"}</span></p>
        `;

    card7.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherInfo.daily[6].weather[0].icon}@2x.png" alt="weather icon>
        <div class="Day">${window.moment(weatherInfo.daily[6].dt * 1000).format("ddd")}</div>
        <p class="details"><span id="feels real">${weatherInfo.daily[6].weather[0].main}</span></p>
        <p class="details">Day<span id="feels real">${weatherInfo.daily[6].temp.day + "° C"}</span></p>
        <p class="details">Night<span id="feels real">${weatherInfo.daily[6].temp.night + "° C"}</span></p>
        `;

    card8.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weatherInfo.daily[7].weather[0].icon}@2x.png" alt="weather icon>
        <div class="Day">${window.moment(weatherInfo.daily[7].dt * 1000).format("ddd")}</div>
        <p class="details"><span id="feels real">${weatherInfo.daily[7].weather[0].main}</span></p>
        <p class="details">Day<span id="feels real">${weatherInfo.daily[7].temp.day + "° C"}</span></p>
        <p class="details">Night<span id="feels real">${weatherInfo.daily[7].temp.night + "° C"}</span></p>
        `;

}


// code for map location

function mapLocation() {
    let map = new google.map.Map(map_loc, { zoom: 4, center: { lat, long } });
}


