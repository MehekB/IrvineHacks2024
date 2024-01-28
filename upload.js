const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const access_token = urlParams.get('access_token')

function wow(){
    const canvas = document.getElementById("My Canvas");
    //convert canvas to dataurl
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
}

async function getPlaylists(){
    console.log('getting api')
    let at = localStorage.getItem('access_token');
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: {
        'Authorization': "Bearer "+ at,
        'Content-Type': 'application/json'
        },
    })
    console.log('getting api 2')
    const res = (await response.json())
    console.log(res)
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
    let playlists = new Set()
    const items = json_file.items
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
    console.log(playlists)
    return playlists
}


