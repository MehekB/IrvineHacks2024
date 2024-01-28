function captureBoard(){
    const canvas = document.getElementById('drawing-board-canvas-wrapper');
    
    // Convert canvas to dataURL and log to console
    console.log(canvas)
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
    // Logs data:image/png;base64,wL2dvYWwgbW9yZ...

    // Convert to Base64 string
    const base64 = getBase64StringFromDataURL(dataURL);
    console.log(base64);
}