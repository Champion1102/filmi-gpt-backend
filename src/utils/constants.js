import {REACT_APP_GEMINI_KEY, REACT_APP_OMDB_KEY, REACT_APP_TMDB_KEY} from '../secret.js'

export const API_OPTIONS =  {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + REACT_APP_TMDB_KEY
    }
  };

  export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780/"


  export const SUPPORTED_LANGUAGES = [
    {identifier: "en",name:"English"},
    {identifier: "hindi",name:"Hindi"},
    {identifier: "marathi",name:"Marathi"},
    {identifier: "spanish",name:"Spanish"},
    {identifier:"japanese",name:"Japanese" }]


  export const GEMINI_KEY = REACT_APP_GEMINI_KEY;
  // export const GEMINI_KEY = "AIzaSyAqP1oB5lWM_eKFfwhtr-m0h_Nzr1bv_zM"
  export const OMDB_KEY = REACT_APP_OMDB_KEY;
