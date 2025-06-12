import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('seepdeek.openChatPanel', () => {
		const panel = vscode.window.createWebviewPanel(
			'seepdeekChat',
			'SeepDeek Chat Panel',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		panel.webview.html = getWebviewContent();
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
/*html*/
	return ` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SeepDeek Chat</title>
  <style>
    * {
      box-sizing: border-box;
      font-family: "Segoe UI", sans-serif;
    }

    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #1e1e1e;
      color: white;
    }

    header {
      padding: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      border-bottom: 1px solid #333;
      background: #262626;
    }

    #chat-area {
      flex-grow: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .message {
      margin: 1rem 0;
      padding: 0.8rem;
      border-radius: 0.5rem;
      max-width: 80%;
    }

    .user {
      background: #007acc;
      align-self: flex-end;
    }

    .bot {
      background: #333;
      align-self: flex-start;
    }

    #input-area {
      display: flex;
      padding: 1rem;
      border-top: 1px solid #333;
      background: #262626;
    }

    input[type="text"] {
      flex-grow: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      margin-right: 0.5rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #007acc;
      color: white;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <header>SeepDeek Chat</header>
  <div id="chat-area"></div>
  <div id="input-area">
    <input type="text" id="user-input" placeholder="Type your message..." />
    <button onclick="sendMessage()">Send</button>
  </div>

  <script>
    const chatArea = document.getElementById('chat-area');
    const input = document.getElementById('user-input');

    function addMessage(content, className) {
      const div = document.createElement('div');
      div.className = 'message ' + className;
      div.textContent = content;
      chatArea.appendChild(div);
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    function sendMessage() {
      const msg = input.value.trim();
      if (!msg) return;

      addMessage(msg, 'user');
      input.value = '';

      // Dummy bot reply
      setTimeout(() => {
        addMessage("You said: " + msg, 'bot');
      }, 500);
    }

    input.addEventListener("keydown", function(event) {
      if (event.key === "Enter") sendMessage();
    });
  </script>
</body>
</html>


`;
//html
}
