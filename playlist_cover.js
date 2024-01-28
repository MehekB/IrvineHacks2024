let newCover = localStorage.getItem('cover')
let at = localStorage.getItem('access_token')
let dataURL = localStorage.getItem('imageDataURL')
const apiUrl = `https://api.spotify.com/v1/playlists/${newCover}/images`


console.log(newCover.photoID)
//use api for customize playlist cover
async function createNewCover(){
    const reseponse = await fetch(apiUrl, {
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
    console.log(newCover.photoID)
}


