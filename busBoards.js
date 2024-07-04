//GOAL: ask the user for a stop code, and print a list of the next five buses at that stop code, with their routes, destinations, and the time until they arrive in minutes.
//You only need access to the "Core datasets"
//?app_key=9b19a4b125774e6085105a2cabd9fc28
//test stop code: 490008660N
//stop type of tfl api: NaptanPublicBusCoachTram
//implement error handling

import fetch from "node-fetch";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const prompt = require("prompt-sync")();

const userPostcode = prompt("Please insert a postcode: ");

let postcodeBody;
let coordinateBody;
let longitude;
let latitude;

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

getCoordinate().then(() => {
    console.log(longitude);
    console.log(latitude);
    get2StopPoints(longitude, latitude);
});

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

        const result = await fetchPromise;

        // console.log(result);

        const stopPoint1 = result["stopPoints"][0]["naptanId"];
        const stopPoint2 = result["stopPoints"][1]["naptanId"];

        console.log(stopPoint1, stopPoint2);

} catch (error) {
    console.log(error);
}
}

// function getFiveStops(body) {

//         //creates array of arrays containing bus line name and its relative time to station
//         const busArr = [];
//         for (let bus of body) {
//         busArr.push([bus["lineName"], bus["timeToStation"]]); 
//         }
        
//         //console.log(busArr);

//         //sorts the bus array in ascending order
//         busArr.sort(function(a, b) {
//             return a[1] - b[1];
//         });

//         //console.log(busArr);

//         //prints out the next 5 buses at the chosen stop (converting seconds in minutes)
//         for (let i = 0; i < 5; i++) {
//         console.log(`The Bus number ${busArr[i][0]} is due at ${userStop} in ${Math.floor(busArr[i][1] / 60)} minutes`);
//         }
// }

// async function getStopInfo() {

//     let body;

//     try {
//         const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${userStop}/Arrivals`);
//         body = await response.json();
//         if (response.status !== 200) {
//             throw "Error";
//         }
//         // console.log(body);
//         getFiveStops(body);
//     } catch (error) {
//         console.log(error);
//     }

// }

// getStopInfo();