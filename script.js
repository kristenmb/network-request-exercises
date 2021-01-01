const getButton = document.querySelector("#get");
const addButton = document.querySelector("#post");
const deleteButton = document.querySelector("#delete");

getButton.addEventListener('click', async() => {
  const dataDisplay = document.querySelector("#data-display");
  const animalList = await animals;
  const tempInfo = document.querySelector("#temp");
  tempInfo.classList.add('hidden');
  animalList.forEach(animal => {
    dataDisplay.innerHTML += `
    <h2>${animal.id}. ${animal.name}</h2>
    <p>Diet: ${animal.diet}</p>
    <p>Fun Fact: ${animal.fun_fact}</p>
  `
  });
})

addButton.addEventListener('click', addNewAnimal);
deleteButton.addEventListener('click', removePost);

const animals = fetch("http://localhost:3001/api/v1/animals")
  .then(response => response.json())
  .then (animals => animals)        

function addNewAnimal() {
  let nameInput = document.querySelector("#name");
  let dietInput = document.querySelector("#diet");
  let factInput = document.querySelector("#fact");
  let idInput = document.querySelector("#idNum");
  let newAnimal = `{
    "id": "${idInput.value}", 
    "name": "${nameInput.value}", 
    "diet": "${dietInput.value}", 
    "fun_fact": "${factInput.value}"
  }`
  postAnimal(newAnimal);
  clearInput(idInput, nameInput, dietInput, factInput);
}

function postAnimal(newPost) {
  fetch("http://localhost:3001/api/v1/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newPost
    })
      .then((response) => response.json())
      .then(animal => animal)
}

function clearInput(first, second, third, fourth) {
  first.value = "";
  second.value = "";
  third.value = "";
  fourth.value = "";
}

function removePost() {
  const deleteInput = document.querySelector("#delete-name");
  let id = deleteInput.value;
  fetch(("http://localhost:3001/api/v1/animals/" + id), {
    method: 'DELETE',
  })
    .then(response => response.json()); 
 
  clearInput(deleteInput);  
}