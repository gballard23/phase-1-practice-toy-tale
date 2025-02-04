let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let container = document.querySelector('#toy-collection');

window.addEventListener('load', async function (){
  console.log('its loaded');
  

  let res = await fetch('http://localhost:3000/toys');
  let data = await res.json();

  console.log(data);

  for(let i = 0; i < data.length; i++){
    let newElement = document.createElement('div');
    newElement.classList.add('card');

    container.appendChild(newElement);

    let h2 = document.createElement('h2');
    h2.innerHTML = data[i].name;
    newElement.appendChild(h2);

    let img = document.createElement('img');
    img.src = data[i].image;
    newElement.appendChild(img);

    let p = document.createElement('p');
    p.innerHTML = data[i].likes;
    newElement.appendChild(p);

    let btn = document.createElement('button');
    let id = data[i].id;
    btn.innerHTML = 'Like';
    newElement.appendChild(btn);
    btn.setAttribute('id', id);
    

    img.classList.add('toy-avatar');
    btn.classList.add('like-btn');
    btn.addEventListener('click', handleLikes)

  }

  

})

const inputForm = document.querySelector('form');

inputForm.addEventListener('submit', async (e) => {
e.preventDefault


let toyName = document.getElementById('name').value;
let toyImage = document.getElementById('image').value;
  let newToy = {
    name: toyName,
    image: toyImage,
    likes: 0
  }

  addNewToy(newToy);


function addNewToy(newToy){
  fetch("http://localhost:3000/toys",{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

})



function handleLikes(event){
    
    let id = event.target.id;
  console.log(id)
  
  let likeNum = event.target.parentElement.querySelector('p');

  let cardLikes = parseInt(likeNum.innerHTML);
  console.log(cardLikes)

  newLikeNum = {
    "likes": cardLikes + 1
  }

  const patchJson = {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(newLikeNum)
  }
  fetch(`http://localhost:3000/toys/${id}`, patchJson)
  .then(res => res.json())
  .then(toyObj => likeNum.innerHTML = toyObj.likes)


}
  
