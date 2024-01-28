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
            if (imageElement) {
                imageElement.src = playlist.images[0].url;
            }
            x++;
        }
        i++;
    }
    localStorage.setItem('playlistCollection', playlists)
}

function selectPlaylist(num){
    const selectedPlaylist = localStorage.getItem('playlistCollection')[num-1]
    localStorage.setItem('selectedPlaylist', selectedPlaylist)
}
//uses playlist id to change the cover image
//home --> upload --> drawing_board --> cover_image