import {ArtistResource} from "@/types/artist";

const API_KEY = "8eb0d93c2b7fb65a4b108c9403475d78"
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=8eb0d93c2b7fb65a4b108c9403475d78&format=json`

function getMusicData(){
    return fetch (`${URL}`, {
        method : 'GET',
        headers: {
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.topartists.artist)
    .then(artists => artists.map((artists: ArtistResource) => {
        return {
            id : artists.mbid,
            name : artists.name,
            image : artists.image[0]['#text']
        }
    }))
}

export {getMusicData}

