const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const access_token = urlParams.get('access_token')

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

/*
function topTenPlaylists(json_file){
    let playlists = new Set()
    const items = json_file.items
    let x = 0
    let i = 0
    while(x < 10){
        playlist = items[i]
        if (playlist.images.length <= 1){
            playlists.add(new Playlist(playlist.name, playlist.id, playlist.images[0].url))
            console.log("image"+x)
            alert(console.log(playlist.images[0].url))
            document.getElementById("image"+(x+1)).src=playlist.images[0].url
            x++
        }
        i++
    }
    console.log(playlists)
    return playlists
}

/*
function topTenPlaylists(json_file) {
    playlist = json_file.items[0]

    let playlists = new Set()
  //  const items = json_file.items[0]
   // playlists.add(new Playlist(playlists.name, playlists.id, playlists.images[0].url))
    console.log("image1")
    document.getElementById("image1").src = playlist.url
}
*/

function topTenPlaylists(json_file) {
    let playlists = new Set();
    const items = json_file.items;
    let x = 0;
    let i = 0;

    while (x < 10 && i < items.length) {
        let playlist = items[i];

        if (playlist.images.length <= 1) {
            playlists.add(new Playlist(playlist.name, playlist.id, playlist.images[0].url));

            // Update the image source using the playlist URL
            let imageElement = document.getElementById("image" + (x + 1));
            if (imageElement) {
                imageElement.src = playlist.images[0].url;
            }

            console.log("image" + x);
            console.log(playlist.images[0].url);

            x++;
        }

        i++;
    }

    console.log(playlists);
    return playlists;
}


