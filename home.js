const clientId = '92715c01f1f145969e18198e7c7d7ef5';
const clientSecret = "7bb3f9a893ad41ab973ff267a9e12e02";
const redirectUri = 'https://mehekb.github.io/IrvineHacks2024/home.html';
const scope = 'playlist-modify-public playlist-modify-private user-top-read user-read-private user-read-email playlist-read-private ugc-image-upload';
const authUrl = new URL("https://accounts.spotify.com/authorize")

//code verifier - randomly made code that fits a specific requirement
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier = generateRandomString(64);

// transformation of code verifier to make the auth code using SHA-256 alg
function sha256(plain) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function pkce_challenge_from_verifier(v) {
  hashed = await sha256(v);
  base64encoded = base64urlencode(hashed);
  return base64encoded;
}

async function requestAuthorization() {

  window.localStorage.setItem('code_verifier', codeVerifier);

  const codeChallenge = await pkce_challenge_from_verifier(codeVerifier)

  const params = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: encodeURI(redirectUri),
  }
  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code')

const getToken = async code => {

  let codeVerifierFromStorage = localStorage.getItem('code_verifier');
  
  const base64Credentials = btoa(clientId + ':' + clientSecret);
  
  const payload = {
    method: 'post',
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code', code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifierFromStorage
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + base64Credentials
    }
  }
  const response = await fetch("https://accounts.spotify.com/api/token", payload);
  const data = await response.json();

  localStorage.setItem('access_token', data.access_token);
  if(data.access_token) window.location.href = 'upload.html?access_token=' + data.access_token
}

getToken(code)