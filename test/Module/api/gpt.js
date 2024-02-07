const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

class GPTApi {
    constructor(apiKeyFilePath = path.resolve(__dirname, 'keys.txt')) {
        this.apiKeyFilePath = apiKeyFilePath;
        this.apiKeys = this.loadApiKeys();
        this.currentApiKeyIndex = 0;
        this.initializeClient();
    }

    loadApiKeys() {
        const filePath = path.resolve(__dirname, this.apiKeyFilePath);
        return fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);
    }

    rotateApiKey() {
        const currentKey = this.apiKeys[this.currentApiKeyIndex];
        this.apiKeys.push(this.apiKeys.shift()); // Move the first key to the end
        this.currentApiKeyIndex = (this.currentApiKeyIndex + 1) % this.apiKeys.length;
        return currentKey;
    }

    async initializeClient() {
        this.client = new OpenAI({
            apiKey: this.rotateApiKey().trim()
        });
    }

    async ask(input, model = 'gpt-3.5-turbo', filePath = null) {
        let messages = Array.isArray(input) ? input : [{ role: 'user', content: input }];
        await this.initializeClient();
        try {
            const chatCompletion = await this.client.chat.completions.create({
                model: model,
                messages: messages,
                stream: !!filePath,
            });

            if (filePath) {
                for await (const chunk of chatCompletion) {
                    fs.appendFileSync(filePath, chunk.choices[0]?.delta?.content || '');
                }
                console.log(`Wrote to ${filePath}`);
            } else {
                return chatCompletion.choices[0].message.content;
            }
        } catch (error) {
            console.error('Error during chat completion:', error);
            throw error;
        }
    }
    async translate(text, language, model = 'gpt-3.5-turbo', filePath = null) {
        return await this.ask("Translate the following text to " + language + ",just reply the following text to that language only, no further instructions or info needed, : \n\n" + text, model, filePath);
    }
}

module.exports = GPTApi;





