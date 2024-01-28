const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const access_token = urlParams.get('access_token')

function wow(){
    const canvas = document.getElementById("My Canvas");
    //convert canvas to dataurl
    const dataURL = canvas.toDataURL();
}

async function getPlaylists(){
    let at = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: {
        'Authorization': "Bearer "+ at,
        'Content-Type': 'application/json'
        },
    })
    const res = (await response.json())
    topTenPlaylists(res)
  }

class Playlist{
    constructor(name, id, photoID){
        this.name = name
        this.id = id
        this.photoID = photoID
    }
}
function topTenPlaylists(json_file){
    let playlists = new Set() //set storing all the playlist objects
    const items = json_file.items //
    let x = 0
    let i = 0
    while(x<10){
        playlist = items[i]
        if (playlist.images.length <=1){
            playlists.add(new Playlist(playlist.name, playlist.id, playlist.images[0].url))
            x++
        }
        i++
    }
    return playlists
}


