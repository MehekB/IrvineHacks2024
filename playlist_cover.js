let playlistID = localStorage.getItem('selectedPlaylist')
let canvas = localStorage.getItem('canvas')
let at = localStorage.getItem('access_token')
let dataURL = localStorage.getItem('dataURL').substring(23,localStorage.getItem('dataURL').length)
const apiUrl = `https://api.spotify.com/v1/playlists/${playlistID}/images`

async function createNewCover(){
    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
        'Authorization': "Bearer "+ at,
        "Content-type": "image/jpeg"
        },
        body: dataURL
    })
   
}

