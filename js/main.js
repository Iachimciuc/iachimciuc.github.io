const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

chatForm.addEventListener('submit', async event => {
  event.preventDefault();
  const message = chatInput.value;
  chatInput.value = '';

  const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      prompt: message,
      max_tokens: 100
    })
  });
  const json = await response.json();
  const responseMessage = json.choices[0].text;

  const messageContainer = document.createElement('div');
  messageContainer.innerHTML = `
    <div>You: ${message}</div>
    <div>ChatGPT: ${responseMessage}</div>
  `;
  chatContainer.appendChild(messageContainer);
  chatContainer.scrollTop = chatContainer.scrollHeight;
});

