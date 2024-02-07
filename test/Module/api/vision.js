const vision = require('@google-cloud/vision');
const path = require('path');
async function extractText(imagePath) {
    const client = new vision.ImageAnnotatorClient({
        keyFilename: path.join(__dirname, 'config.json'),
    });

    // Performs text detection on the image file
    const [result] = await client.textDetection(imagePath);
    const detections = result.fullTextAnnotation.text;
    return detections;
}

// extractText('./src/vertex/image.jpeg').then(console.log);


module.exports = extractText;