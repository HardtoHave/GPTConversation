async function sendMessage(message) {
    const apiKey = "your_api_key_here"; // Replace with your actual OpenAI API key
    const response = await fetch('https://api.aimlapi.com/chat/completions', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api key}`
        },
        body: JSON.stringify({
            "model": "mistralai/Mistral-7B-Instruct-v0.2",
            "messages": [
                { role: "system", content: "You are a travel agent. Be descriptive and helpful" },
                { role: "user", content: message }
            ],
            "temperature": 0.7,
            "max_tokens": 128
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");

    sendButton.addEventListener("click", async function() {
        const message = userInput.value;
        const userMessageHTML = `<div class="message user-message">${message}</div>`;
        chatMessages.innerHTML += userMessageHTML;

        const response = await sendMessage(message);
        const aiMessageHTML = `<div class="message ai-message">${response}</div>`;
        chatMessages.innerHTML += aiMessageHTML;

        userInput.value = "";
    });
});
