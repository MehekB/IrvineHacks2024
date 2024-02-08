function captureBoard(){
    html2canvas(document.body).then(canvas => {
        // Set the dimensions of the area you want to crop
        const left = 20;   // Adjust these values as needed
        const top = 95;
        const width = 1040;
        const height = 1040;

        // Create a new canvas to hold the cropped image
        const croppedCanvas = document.createElement('canvas');
        const context = croppedCanvas.getContext('2d');
        croppedCanvas.width = width;
        croppedCanvas.height = height;

        // Crop the image
        context.drawImage(canvas, left, top, width, height, 0, 0, width, height);

        // Convert the cropped canvas to a data URL
        const imageDataURL = croppedCanvas.toDataURL('image/jpeg');
        localStorage.setItem('dataURL', imageDataURL)
        window.location.href = "playlist_cover.html"
    });
}