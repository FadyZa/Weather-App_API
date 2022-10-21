document.querySelector("form button").addEventListener("click",(e)=>{
    e.preventDefault()
    console.log("clicked")
    window.setTimeout(()=>{
        aside.style.opacity = 0;
        aside.style.transform = "scale(0)";
    },200)
    document.getElementById("err").style.display = "none";
    document.querySelector(".container aside").style.display = "none";
    console.log( document.querySelector(".container aside"));

    let regex = /\b[^\d\W]+\b/gi;
    let city = document.querySelector("form input").value;

    if(regex.test(city)){
        let api = `https://api.weatherapi.com/v1/current.json?key=8b7ed2ee7038491bbbb122742220504&q=${city}`;
        async function getData(callFunc){
            let Data = await fetch(api);
            let JsData = await Data.json();
            callFunc(JsData);        
        }
        getData(handlData);
    }
    else{
        handleErr("please enter a valid city")
    }
});

let aside = document.querySelector(".container aside");
let temp = document.getElementById("tempc")
let city = document.getElementById("city");
let condition = document.getElementById("condition");
let date = document.getElementById("date");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");


function handlData(myData){
    aside.style.display = "block"; 
    window.setTimeout(()=>{
        aside.style.opacity = 1;
        aside.style.transform = "scale(1)";
    },400)
    console.log(myData.location.region);
    temp.innerHTML = `${myData.current.temp_c}<sup>&#8451;</sup>`;
    city.innerText = myData.location.region;
    condition.innerHTML =`${myData.current.condition.text} <img width="35px" alt="weather condition" src="${myData.current.condition.icon}">`
    date.innerText = myData.current.last_updated;
    wind.innerText = `${myData.current.wind_kph} KM/H`;
    humidity.innerText = `${myData.current.humidity}%`
}

let err = document.getElementById("err");
function handleErr(text){
    err.style.display = "block";
    err.innerHTML = text;
    window.setTimeout(()=>{
        err.style.opacity = 1;
        err.style.transform = "scale(1)";
    },0)
}




