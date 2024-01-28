let playlistID = localStorage.getItem('selectedPlaylist')
let at = localStorage.getItem('access_token')
let dataURL = localStorage.getItem('dataURL')
const apiUrl = `https://api.spotify.com/v1/playlists/${playlistID}/images`

console.log("PLAYLIST ID", playlistID)
console.log("access token:",at)
console.log("data url",dataURL)
console.log("api url",apiUrl)

//use api for customize playlist cover
async function createNewCover(){
    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer `+ at,
        "Content-type": "image/jpeg"
        },
        body: new URLSearchParams({
            data: dataURL
        })
    })
    const res = (await response.json())
    console.log("stuff!!------",res)
    console.log("new playlist id:",playlistID)
}

