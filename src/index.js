const searchbtn = document.querySelector(".searchbtn");

const backgroundImage = ()=>{
    let myImage = new Image();
    myImage.src = image;
    Document.body.append(myImage.src);
}
backgroundImage();
async function getWeatherApi(url){
    const response = await fetch(url, {
        mode: "cors"
      });
      let responses = await response.json();
      return responses;
}

async function loadJson(){
    let getLocation = document.querySelector("#search").value;
    let weatherApi =  getWeatherApi(`https://api.openweathermap.org/data/2.5/weather?q=${getLocation}&units=metric&appid=faa4a0770c3a396ae2aa2262e23c2e0c`,{
        mode:"cors"
    });
    let weatherData = await weatherApi;
    console.log(weatherData)
}

searchbtn.addEventListener("click", loadJson);