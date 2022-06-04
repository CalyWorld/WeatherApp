import imagebackground from "./images/weather.jpg";
const searchbtn = document.querySelector(".searchbtn");
const mainContainer = document.getElementById("main_container");
const descriptionContainer = document.querySelector(".description_container");
const cityContainer = document.querySelector(".city_container");
const tempDisplay = document.querySelector(".temp_display");
const tempfeelContainer = document.querySelector(".feels");
const humidityContainer = document.querySelector(".humidity");
const windspeedContainer = document.querySelector(".wind");
const tempbtn = document.querySelector(".tempbtn");
const backgroundImage = () => {
    let myImage = new Image();
    myImage.src = imagebackground;
    myImage.setAttribute("alt", "photo by Vincenth Guth");
    document.body.append(myImage);
}
const ftoc = function (num) {
    let convertedNum = Math.round((parseInt(num) - 32) * (5 / 9) * 10) / 10;
    return convertedNum;
}
const ctof = function (num) {
    let convertedNum = (Math.round(((parseInt(num) * 9 / 5) + 32) * 10) / 10);
    return convertedNum;
}
class Temp {
    constructor(temp) {
        this.temp = temp;
    }
}
let tempObject;
function addTempToClass(num) {
    let tempInt = Math.round(num);
    tempObject = new Temp(tempInt);
    tempbtn.setAttribute("id", `${tempObject.temp}`);
    console.log(tempObject);
}

function toggleTemp(num){
    let fahrenheitNum = ctof(num);
    if(tempObject.temp == num){
        tempObject.temp = `${fahrenheitNum}`;
    }else{
        tempObject.temp = num;
    }
    tempDisplay.textContent = `${Math.round(tempObject.temp)}`;
    console.log(tempObject);
}

async function getWeatherApi(url) {
    const response = await fetch(url, {
        mode: "cors"
    });
    let responses = await response.json();
    return responses;
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
    let returnedData = await loadJson();
    console.log(returnedData);
    let weatherDescription = returnedData.weather
    weatherDescription.forEach((data) => {
        descriptionContainer.textContent = (data.description);
    });
}
async function getCity() {
    let returnedData = await loadJson();
    let cityName = returnedData.name;
    cityContainer.textContent = (cityName);
}

async function getTemp() {
    let returnedData = await loadJson();
    let tempNumber = returnedData.main;
    let temp = tempNumber.temp
    tempDisplay.textContent = (Math.round(temp));
    addTempToClass(temp);
}

async function getTempFeel() {
    let returnedData = await loadJson();
    let feelsLike = returnedData.main;
    tempfeelContainer.textContent = (`Feels like ${feelsLike.feels_like}`);
}

async function getHumidity() {
    let returnedData = await loadJson();
    let humidity = returnedData.main;
    humidityContainer.textContent = (`Humidity ${humidity.humidity}%`);
}

async function getWind() {
    let returnedData = await loadJson();
    let wind = returnedData.wind;
    windspeedContainer.textContent = (`Wind ${wind.speed}KM/hr`);
}
function allComponents() {
    getWeatherDescription();
    getCity();
    getTemp();
    getTempFeel();
    getHumidity();
    getWind();
}
searchbtn.addEventListener("click", allComponents);
tempbtn.addEventListener("click", (e) => {
    toggleTemp(e.target.id);
});
backgroundImage();