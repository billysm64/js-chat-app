const BASE_URL = `https://tiny-taco-server.herokuapp.com/api/v1/chats/`;

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

let chat = {
  "id": 17,
  "text": "Shucks, I'd like to ketch the feller what invented Music lessons!",
  "username": "Bobby Bumps",
};
//
// fetch(BASE_URL, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(chat),
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Bad post request');
//     }
//     return response.json()
//   })
//   .then(data => console.log('Success. Todo created!'))
//   .catch(error => console.log('Error:', error));
