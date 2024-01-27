//code verifier - randomly made code that fits a specific requirement
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  
const codeVerifier  = generateRandomString(64);

//transformation of code verifier to make the auth code using SHA-256 alg
const sha256 = async (plain) => {
const encoder = new TextEncoder()
const data = encoder.encode(plain)
return window.crypto.subtle.digest('SHA-256', data)
}

//returns base64 representation of digested translation
const base64encode = (input) => {
return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const generateCodeCallenge = async() => {
    const hashed = await (sha256(codeVerifier))
    const codeChallenge = base64encode(hashed);
    return codeChallenge
}

const codeChallenge = generateCodeCallenge()

function requestAuthorization(){
//makes auth code
  const clientId = '92715c01f1f145969e18198e7c7d7ef5';
  const redirectUri = 'http://localhost:5500/home.html';

  const scope = 'user-top-read user-read-private user-read-email';
  const authUrl = new URL("https://accounts.spotify.com/authorize")

  // generated in the previous step
  window.localStorage.setItem('code_verifier', codeVerifier);

  const params =  {
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

function onPageLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  return code
}



const getToken = async code => {

    // stored in the previous step
    let codeVerifier = localStorage.getItem('code_verifier');
  
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    }
  
    const body = await fetch(url, payload);
    const response =await body.json();
    
    localStorage.setItem('access_token', response.access_token);
  }
  
