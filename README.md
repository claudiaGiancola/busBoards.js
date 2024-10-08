﻿# busBoards.js

Using TFL REST APIs to get live data about busses and directions at given postcodes.
My goal was to make a program that allowed the user to input a postcode and returned a list of the incoming buses at the closest bus stops, with the additional possibility for the user to get directions from their location to the desired bus stop.  

Goals:
- Using REST APIs
- Error handling
- Using Postman to manage API requests while testing

### Setup
Register at the TFL API portal: https://api-portal.tfl.gov.uk/signup
Only need access to the "Core datasets".

This app uses the StopPoint API (https://api-portal.tfl.gov.uk/api-details#api=StopPoint&operation=Forward_Proxy) and the Journey Planner (https://api.tfl.gov.uk/swagger/ui/index.html#!/Journey/Journey_JourneyResults).

If you have any trouble with requests loading indefinitely now or at later points in the exercise, check that the request has the domain name “api.tfl.gov.uk”, not “api.digital.tfl.gov.uk” (the site might generate the second one, and it might not work)

Supply your "Application Key" together with your request.
You can find these by going to the TfL API Portal (https://api-portal.tfl.gov.uk/) and clicking on "Profile" - two keys should be listed (either work). If it isn’t go to “Products” and select “500 Requests per min”, then enter the name you want and click subscribe, after this the keys will be listed on “Profile”. Now edit the URL to add these as querystring parameters: `?app_key=123` (replacing the key appropriately). Check that you still get the same response back.

### Incremental updates 
- I accessed and navigated a REST API (the TFL one) to find the “GET” request URL and then fetched the data in my JavaScript application using asynchronous functions and the await operator.
- I interpreted the response JSON file using the Postman API Client to clarify and organise the data, so that I could effectively isolate the information I needed.
- Throughout the several steps of the program, I made sure to throw and catch errors so that I could maintain a clear communication with the user and suggest them, if possible, to adjust their input to get the desired result.
