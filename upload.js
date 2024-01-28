const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const access_token = urlParams.get('access_token')
let selected_playlist = ''

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

function topTenPlaylists(json_file) {
    let playlists = [];
    const items = json_file.items;
    let x = 0;
    let i = 0;

    while (x < 10 && i < items.length) {
        let playlist = items[i];

        if (playlist.images.length <= 1) {
            playlists.push(new Playlist(playlist.name, playlist.id, playlist.images[0].url));
            // Update the image source using the playlist URL
            let imageElement = document.getElementById("image" + (x + 1));
            document.getElementById('p' + (x + 1)).innerHTML = playlist.name;
            if (imageElement) {
                imageElement.src = playlist.images[0].url;
            }
            x++;
        }
        i++;
    }
    localStorage.setItem('playlistCollection', JSON.stringify(playlists));
}

function selectPlaylist(num){
    const storedList = JSON.parse(localStorage.getItem('playlistCollection'));
    const selectedPlaylist = storedList[num-1]
    localStorage.setItem('playlistImage', selectedPlaylist.photoID)
    localStorage.setItem('selectedPlaylist', selectedPlaylist.id)
}