import imagebackground from "./images/wallpaper.jpg";
const searchbtn = document.querySelector(".searchbtn");
const tempDisplay = document.querySelector(".temp_display");
const tempfeelContainer = document.querySelector(".feels");
const tempbtn = document.querySelector(".tempbtn");
let getLocation = document.querySelector("#search");
const cityError = document.querySelector("#search + span.error");
let tempObject;

const backgroundImage = () => {
    let myImage = new Image();
    myImage.src = imagebackground;
    myImage.setAttribute("alt", "photo by Mattew Macquarie");
    document.body.append(myImage);
}
const ctof = function (num) {
    let convertedNum = (Math.round(((parseInt(num) * 9 / 5) + 32) * 10) / 10);
    return convertedNum;
}
class Temp {
    constructor(temp, feel) {
        this.temp = temp;
        this.feel = feel;
    }
}

function addTempToClass(num, num2) {
    let tempInt = Math.round(num);
    let tempFeel = Math.round(num2);
    tempObject = new Temp(tempInt, tempFeel);
    tempbtn.setAttribute("id", `${tempObject.temp}`);
    tempbtn.setAttribute("class", `${tempObject.feel}`);
    console.log(tempObject);
}

function toggleTemp(num, num2) {
    const tempFeelParameter = document.querySelector(".tempfeel_parameter");
    const tempParameter = document.querySelector(".temp_parameter");
    const tempbtnParameter = document.querySelector(".tempbtn_parameter");
    let fahrenheitNum = ctof(num);
    let fahrenheitNumFeels = ctof(num2);
    if (tempObject.temp == num && tempObject.feel == num2) {
        tempObject.temp = fahrenheitNum;
        tempObject.feel = fahrenheitNumFeels;
        tempFeelParameter.textContent = "°F";
        tempParameter.textContent = "°F";
        tempbtnParameter.textContent = "°F";
    } else {
        tempObject.temp = num;
        tempObject.feel = num2;
        tempParameter.textContent = "°C";
        tempFeelParameter.textContent = "°C";
        tempbtnParameter.textContent = "°C";
    }
    tempDisplay.textContent = `${Math.round(tempObject.temp)}`;
    tempfeelContainer.textContent = `Feels like ${Math.round(tempObject.feel)}`;
    console.log(tempObject);
}

async function getWeatherApi(url) {
    const response = await fetch(url, {
        mode: "cors"
    });
    let responses = await response.json();
    return responses;
}

async function getTimeApi(url){
    const response = await fetch(url, {
        mode:"cors"
    });
    let responses = await response.json();
    return responses;
}

async function loadTimeJson(){
    let getLocation = document.querySelector("#search").value;
    const response = await getTimeApi(`https://timezone.abstractapi.com/v1/current_time/?api_key=e8066ba4e95f48e887508396672c695c&location=${getLocation}`,{
        mode:"cors"
    });
    let timeData = await response;
    return timeData;
}

async function loadJson() {
    let getLocation = document.querySelector("#search").value;
    let weatherApi = getWeatherApi(`https://api.openweathermap.org/data/2.5/weather?q=${getLocation}&units=metric&appid=faa4a0770c3a396ae2aa2262e23c2e0c`, {
        mode: "cors"
    });
    let weatherData = await weatherApi;
    return weatherData
}

async function getWeatherDescription() {
    const descriptionContainer = document.querySelector(".description_container");
    let returnedData = await loadJson();
    console.log(returnedData);
    let weatherDescription = returnedData.weather
    weatherDescription.forEach((data) => {
        descriptionContainer.textContent = (data.description);
    });
}

async function getCity() {
    const cityContainer = document.querySelector(".city_container");
    let returnedData = await loadJson();
    let cityName = returnedData.name;
    let cityCountry = returnedData.sys.country;
    cityContainer.textContent = `${cityName}.${cityCountry}`;
}

async function getDateTime(){
    const {format} = require('date-fns');
    let dateTimeContainer = document.querySelector(".dateTime");
    let returnedData = await loadTimeJson();
    let date = new Date(returnedData.datetime);
    let dateFormat = `${format(date, 'EEEE,MMMM do, yyyy hh:mm a')}`;
    dateTimeContainer.textContent = dateFormat;
   
}

async function getTemp() {
    let returnedData = await loadJson();
    let feelsLike = await getTempFeel();
    let tempNumber = returnedData.main;
    let temp = tempNumber.temp;
    let tempFeel = feelsLike.feels_like;
    tempDisplay.textContent = (Math.round(temp));
    addTempToClass(temp, tempFeel);
}

async function getTempFeel() {
    let returnedData = await loadJson();
    let feelsLike = returnedData.main;
    tempfeelContainer.textContent = (`Feels like ${Math.round(feelsLike.feels_like)}`);
    return feelsLike;
}

async function getHumidity() {
    const humidityContainer = document.querySelector(".humidity");
    let returnedData = await loadJson();
    let humidity = returnedData.main;
    humidityContainer.textContent = (`Humidity ${humidity.humidity}`);
}

async function getWind() {
    const windspeedContainer = document.querySelector(".wind");
    let speedValue = 3.6;
    let returnedData = await loadJson();
    let wind = returnedData.wind;
    windspeedContainer.textContent = (`Wind ${Math.round((wind.speed) * speedValue)}`);
}

function allComponents() {
    const mainContainer = document.getElementById("main_container");
    getDateTime();
    getWeatherDescription();
    getCity();
    getTemp();
    getTempFeel();
    getHumidity();
    getWind();
    tempbtn.style.padding="10px";
    tempbtn.style.display = "flex";
    tempbtn.style.justifyContent = "center";
    tempbtn.style.alignItems = "center";
    mainContainer.style.display = "flex";
}

searchbtn.addEventListener("click", () => {
    if (!getLocation.validity.valid) {
        showCityError();

    } else {
        allComponents();
    }
});

getLocation.addEventListener("input", () => {
    if (getLocation.validity.valid) {
        cityError.textContent = "";
        cityError.className = "error";
    } else {
        showCityError();
    }
});

tempbtn.addEventListener("click", (e) => {
    let className = e.target.className;
    toggleTemp(e.target.id, className);
});

function showCityError() {
    let getLocation = document.querySelector("#search");
    if (getLocation.validity.valueMissing) {
        cityError.textContent = "You should enter a City Name";
    }
    else if(getLocation.validity.tooShort){
        cityError.textContent = `Title name should atleast be ${getLocation.minLength} characters; Name entered is ${getLocation.value.length}.`;
    }
    cityError.className = "error active";
}
backgroundImage();