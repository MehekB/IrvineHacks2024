function captureBoard(){
    console.log('?')
    // Get the canvas and context
    const canvas = document.getElementById('drawing-board-canvas');
    const context = canvas.getContext('2d');

    // Get the image
    const sourceImage = document.getElementById('sourceImage');

    // Set the dimensions you want to capture
    const captureWidth = 100;
    const captureHeight = 100;

    // Draw a portion of the image onto the canvas
    context.drawImage(sourceImage, 50, 50, captureWidth, captureHeight, 0, 0, captureWidth, captureHeight);

    // Convert the canvas content to data URL
    const imageDataURL = canvas.toDataURL('image/png');

    // Do something with the imageDataURL, such as displaying it or sending it to a server
    console.log(imageDataURL);
}