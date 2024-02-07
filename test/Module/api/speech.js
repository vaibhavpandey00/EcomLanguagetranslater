// google speech to text
const speech = require('@google-cloud/speech');
const fs = require('fs');
const util = require('util');
const path = require('path');

const client = new speech.SpeechClient({
    keyFilename: path.join(__dirname, 'config.json'),
});

async function transcribeAudio(audioPath, languageCode = 'en-US') {
    const file = fs.readFileSync(audioPath);
    const audioBytes = file.toString('base64');
    const audio = {
        content: audioBytes,
    };
    const config = {
        languageCode: languageCode,
    };
    const request = {
        audio: audio,
        config: config,
    };
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result
            .alternatives[0].transcript)
        .join('\n');
    return transcription;
}

module.exports = transcribeAudio;