// GET HTML ELEMENTS
let aside = document.querySelector(".container aside");
let temp = document.getElementById("tempc")
let city = document.getElementById("city");
let condition = document.getElementById("condition");
let date = document.getElementById("date");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let err = document.getElementById("err");

/////////////////////////////////////////////////////
document.querySelector("form button").addEventListener("click",(e)=>{
    e.preventDefault()
    // clear any previous styles with smooth transitions
    window.setTimeout(()=>{
        aside.style.opacity = 0;
        aside.style.transform = "scale(0)";

    },200);
    document.getElementById("err").style.display = "none";
    document.querySelector(".container aside").style.display = "none";

    // regular exp to make sure that user entered a valid city without numbers or Chars
    let regex = /\b[^\d\W]+\b/gi;
    let city = document.querySelector("form input").value;

    if(regex.test(city)){
        let api = `https://api.weatherapi.com/v1/current.json?key=8b7ed2ee7038491bbbb122742220504&q=${city}`;
        async function getData(callFunc){
            let Data = await fetch(api);
            let JsData = await Data.json();
            callFunc(JsData);        
        };
        // a call back function send data to a check function to check validation before show it to the user
        getData(checkData);
    }
    // make sure again and again that the user entered a valid city noty empty input
    else if (city == ""){
        handleErr("please Enter Your Location");
    }
    else {
        handleErr("please Enter A Valid Location")
    }
});


/////////////////////////////////////////////////////
// validation checker for the data
function checkData(myData) {
    // check if there are any errors
    if (myData.error){
        if(myData.error.code == 1006){
            handleErr(myData.error.message) // means no location found with user input
        }
        else if(myData.error.code == 2008){
            handleErr("Sorry! Can Not Connect To Server ") // there is error with the API KEY
        }
        else if (myData.error.code == 1005){
            handleErr(myData.error.message) // API key is invalid or not provided.
        }
        else if (myData.error.code == 1002){
            handleErr(myData.error.message) // API URL is invalid.
        }
        else{
            handleErr("Unknown Erorr!")
        }
    }
    else {
        handlData(myData);
    }
};

/////////////////////////////////////////////////////
// HANDLE ERRORS
function handlData(myData){
    // fill the html elements with the valid data
    temp.innerHTML = `${myData.current.temp_c}<sup>&#8451;</sup>`;
    city.innerText = myData.location.region;
    condition.innerHTML =`${myData.current.condition.text} <img width="35px" alt="weather condition" src="${myData.current.condition.icon}">`
    date.innerText = myData.current.last_updated;
    wind.innerText = `${myData.current.wind_kph} KM/H`;
    humidity.innerText = `${myData.current.humidity}%`   
    aside.style.display = "block"; 

    // make some animation and transition with the result show
    window.setTimeout(()=>{
        aside.style.opacity = 1;
        aside.style.transform = "scale(1)";
        aside.classList.add("animate__animated","animate__fadeInTopRight")
    },400);
};

/////////////////////////////////////////////////////
// HANDLE ERRORS
// handle html element to show the error message
function handleErr(text){
    // fill the html elements with the valid data
    err.innerHTML = text;
    err.style.display = "block";
    // make some animation and transition with the error show
    window.setTimeout(()=>{
        err.style.opacity = 1;
        err.style.transform = "scale(1)";
        err.classList.add("animate__animated","animate__tada")
    },100)
};
