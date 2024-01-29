const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const access_token = urlParams.get('access_token')
let at = localStorage.getItem('access_token');

console.log('-------------------'+ access_token)
async function getPlaylists(){
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: {
        'Authorization': "Bearer "+ at,
        'Content-Type': 'application/json'
        },
    })
    const res = (await response.json())
    getUsername(res)
}

async function getUsername(json_file) {
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + at
        }
    })
    const res = (await response.json())
    topTenPlaylists(json_file, res.display_name)
}

class Playlist{
    constructor(name, id, photoID){
        this.name = name
        this.id = id
        this.photoID = photoID
    }
}

function topTenPlaylists(json_file, user) {
    let playlists = [];
    const items = json_file.items;
    let x = 0;
    let i = 0;
    while (x < 10 && i < items.length) {
        let playlist = items[i];
        if (playlist.owner.display_name ===  user) {
            console.log('True')
            playlists.push(new Playlist(playlist.name, playlist.id, playlist.images[0].url));
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
    console.log('---------------',selectedPlaylist)
}