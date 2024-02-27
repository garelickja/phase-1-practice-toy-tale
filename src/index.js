const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection= document.querySelector("#toy-collection");
let addToy = false;

function getToys() {
  return fetch("http://localhost:3000/toys")
    .then(res => res.json());
}

function postToy(toy_data) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(renderToys);
}

function updateLikes(event) {
  event.preventDefault();
  let more = parseInt(event.target.previousElementSibling.textContent) + 1;
  
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      'Content-type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(res => res.json())
  .then(() => {
      event.target.previousElementSibling.textContent = `${more} likes`;
  });
}

function renderToys(toy) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;
  toyCollection.append(card);
  card.querySelector(".like-btn").addEventListener("click", updateLikes);
}

addBtn.addEventListener('click', () => {
    addToy = !addToy;
    toyForm.style.display = addToy ? "block" : "none";
});

toyForm.addEventListener('submit', event => {
  event.preventDefault();
  postToy(event.target);
});

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy);
  })
})






