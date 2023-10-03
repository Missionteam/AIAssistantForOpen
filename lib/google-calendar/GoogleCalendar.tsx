// 1.パッケージを読み込む
import ApiCalendar from "react-google-calendar-api";
import { addDays } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { useEffect,useRef } from "react";
 




function GoogleCalendar() {
  const  config  =  { 
    "clientId" : process.env.NEXT_PUBLIC_ClientId , 
    "apiKey" : process.env.NEXT_PUBLIC_ApiKey ,
    "scope" : "https://www.googleapis.com/auth/calendar" , 
    "discoveryDocs" : [ 
      " https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest" 
    ] 
  }
  const apiCalendar = useRef(new ApiCalendar(config));

  function signin(){
    apiCalendar.current.handleAuthClick();
    console.log(apiCalendar.current.sign);
  }
  function signout(){
    apiCalendar.current.handleSignoutClick();
    console.log(apiCalendar.current.sign);
  }
  
  function checkSignin(){
    console.log('feel');
    console.log(apiCalendar);
    console.log(apiCalendar.current.sign);
  }
  function getEvents(){
    apiCalendar.current.listUpcomingEvents(10)
    .then(({result}:{result:any}) => {
      console.log(result.items);
    })
    .catch((error:any) => {
      console.log(error);
    });
  }
  return (
    <div className="App">
      <button onClick={() => signin()}>Sign In</button>
      <button onClick={() => signout()}>Sign Out</button>
      <button onClick={() => checkSignin()}>Get Events</button>
      <button onClick={() => getEvents()}>Get Events</button>
      
    </div>
  );
}

export default GoogleCalendar;