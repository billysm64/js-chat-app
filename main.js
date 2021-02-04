const BASE_URL = `https://tiny-taco-server.herokuapp.com/api/v1/chats/`;

// -------- SHOW CHAT DATA ----------

const generateHTML = (data) => {
  // console.log('data', data);

  const source = document.getElementById("chat-messages").innerHTML; //grab innerHTML for source tag
  const template = Handlebars.compile(source); //returns a compiled function
  const context = data; //put the data object here
  const html = template(context);
  document.querySelector(".container").innerHTML = html;

};

fetch(BASE_URL)
  .then(response => response.json())
  .then(data => generateHTML({key: data}));


//

let reloadPage = false;

function sendChat() {
  chatMessage = document.getElementById('chatmsg').value
  usernameMessage = document.getElementById('username').value
  if ((chatMessage === "") || (usernameMessage === "")) {
    alert("Please enter a value for both the chat and the username.")
  } else {
    let chat = {
      "text": chatMessage,
      "username": usernameMessage,
    };
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(chat),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Bad post request');
        }
        return response.json()
      })
      .then(data => {
        alert("Congratulations! You have sent a chat message!")
        window.location.reload(true);
      })
      .catch(error => console.log('Error:', error))
  }
}

function deleteChat() {
  chatID = document.getElementById('hiddenidp').textContent;
  console.log(chatID)
  fetch(`${BASE_URL}${chatID}/`, {
    method: 'DELETE',
  })//fetch a specific item
    .then(response => {
      if (!response.ok) {
        throw new Error('Bad delete request');
      }
    })
    .catch(error => console.log('Error:', error))
    .finally(() => {
      alert("Congratulations! You have deleted a message!");
      window.location.reload(true);
    });
};

// function deleteChat() {
//   fetch(`${BASE_URL}/25/`) {
//     method: 'DELETE',
//   })//fetch a specific item
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Bad delete request');
//       }
//     }
//     .catch(error => console.log('Error:', error))
//     .finally(() => console.log("Yeah, baby!"));
// }
