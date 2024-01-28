let playlistID = localStorage.getItem('selectedPlaylist')
let at = localStorage.getItem('access_token')
let dataURL = localStorage.getItem('dataURL').substring(23,localStorage.getItem('dataURL').length)
console.log('DATA URL--------',dataURL)
const apiUrl = `https://api.spotify.com/v1/playlists/${playlistID}/images`

async function createNewCover(){
    // try{
        console.log(at)
    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
        'Authorization': "Bearer "+ at,
        "Content-type": "image/jpeg"
        },
        body: dataURL
    })
    console.log(response)
}

