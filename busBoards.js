import fetch from "node-fetch";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const prompt = require("prompt-sync")();

let userPostcode = prompt("Please insert a postcode: ").toUpperCase();

while (!userPostcode.match(/^(GIR 0AA|[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2})$/)) {
    userPostcode = prompt("Please try again: ").toUpperCase();
}

let postcodeBody;
let coordinateBody;
let longitude;
let latitude;
let stopPoint1;
let stopPoint2;
let result;

async function getCoordinate() {
    
    try {
        const response = await fetch(`https://api.postcodes.io/postcodes/${userPostcode}`);
        postcodeBody = await response.json();
        if (response.status !== 200) {
            throw "Error";
        } 
        
        const fetchPromise = new Promise((resolve) => {
            setTimeout(() => {
              resolve(postcodeBody);
            }, 1000);
          });

        const result = await fetchPromise;

        coordinateBody = result;
        longitude = coordinateBody["result"]["longitude"];
        latitude = coordinateBody["result"]["latitude"]; 

        } catch (error) {
            console.log(error);
        }
}

async function get2StopPoints(longitude, latitude) { 

    let stopPointsBody;

    try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=NaptanPublicBusCoachTram`);
        stopPointsBody = await response.json();
        // if (response.status !== 200) {
        //     throw "Error";
        // }
        
        const fetchPromise = new Promise((resolve) => {
            setTimeout(() => {
              resolve(stopPointsBody);
            }, 1000);
          })

        result = await fetchPromise;
        
        try {
            stopPoint1 = result["stopPoints"][0]["naptanId"];
            stopPoint2 = result["stopPoints"][1]["naptanId"];
            if (!result["stopPoints"][0]) {
                throw "Error"
            }
         } catch (error) {
                console.log("There seem to be no TFL bus stops near you.");
            }
        } catch (error) {
    console.log(error);
}
}

function getFiveBuses(body, stopPoint, index) {

        //creates array of arrays containing bus line name and its relative time to station
        const busArr = [];
        for (let bus of body) {
        busArr.push([bus["lineName"], bus["timeToStation"]]); 
        }
        
        //sorts the bus array in ascending order
        busArr.sort(function(a, b) {
            return a[1] - b[1];
        });

        //prints out the next 5 buses at the chosen stop (converting seconds in minutes)
        for (let i = 0; i < 5; i++) {
        console.log(`The Bus number ${busArr[i][0]} is due at ${result["stopPoints"][index]["commonName"]} (${result["stopPoints"][index]["indicator"]}) in ${Math.floor(busArr[i][1] / 60)} minutes`);
        }
}

async function getStopInfo(stopPoint, index) {

    let body;

    try {
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopPoint}/Arrivals`);
        body = await response.json();
        if (response.status !== 200) {
            throw "Error";
        }
        // console.log(body);
        getFiveBuses(body, stopPoint, index);
    } catch (error) {
        console.log(error);
    }

}

getCoordinate().then(() => {
    get2StopPoints(longitude, latitude).then(() => {
    getStopInfo(stopPoint1, 0);
    if (stopPoint2) {
       getStopInfo(stopPoint2, 1); 
    }
    } )
});