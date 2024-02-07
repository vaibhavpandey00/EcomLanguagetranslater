const extractText = require("./api/vision");
const transcribeAudio = require("./api/speech");
const gpt = require("./api/gpt");
const api = new gpt();

(async()=>{
    
    await api.ask("what is 2+2").then(console.log);
    console.log("-------------------")
    await api.translate("who are you", "hindi").then(console.log);
    console.log("-------------------")
    await transcribeAudio("sample-4.mp3").then(console.log);
    console.log("-------------------")
    // @google-cloud/vision
    await extractText("image.jpeg").then(console.log);
    console.log("-------------------")
})();