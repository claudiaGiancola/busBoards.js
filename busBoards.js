//GOAL: ask the user for a stop code, and print a list of the next five buses at that stop code, with their routes, destinations, and the time until they arrive in minutes.
//You only need access to the "Core datasets"
//?app_key=9b19a4b125774e6085105a2cabd9fc28
//test stop code: 490008660N

import fetch from "node-fetch";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const prompt = require("prompt-sync")();

const userStop = prompt("Please insert stop code: ");

fetch(`https://api.tfl.gov.uk/StopPoint/${userStop}/Arrivals`)
    .then(response => response.json())
    .then(body => console.log(body));