'use strict'
// random math

function getRandomInt(min, max) {
  return Math.floor(Math.random() * max); //The maximum is exclusive and the minimum is inclusive
}

//Global variables
let totalCicks = 0;
let clicksAllowed = 25;//change lower for debugging
let allPicks = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
//console.log(imageOne);
//console.log(imageTwo);
//console.log(imageThree);

function Picture(name, fileExtension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allPicks.push(this);
}

new Picture('');
new Picture('');
new Picture('', 'png');
new Picture('');
new Picture('');
new Picture('');
new Picture('', 'png');
new Picture('');
new Picture('');

function getRandomIndex(){
  return Math.floor(Math.random() * allPicks.length);
}

function renderPictures(){
  let firstPictureIndex = getRandomIndex();
  let secondPictureIndex = getRandomIndex();
  let thirdPictureIndex = getRandomIndex();
  //gonna have to use index array for lab
  //maybe name indexArray
  //check to see if theindex is included in that array
  //pop those results from the array or shift perhaps?
  while (firstPictureIndex === secondPictureIndex){
    secondPictureIndex = getRandomIndex();
  }

  imageOne.src = allPicks[firstPictureIndex].src;
  imageOne.title = allPicks[firstPictureIndex].src;
  imageOne.alt = allPicks[firstPictureIndex].src
  allPicks[firstPictureIndex].views++;

  imageTwo.src = allPicks[secondPictureIndex].src
  imageTwo.title = allPicks[secondPictureIndex].src
  imageTwo.alt = allPicks[secondPictureIndex].src
  allPicks[secondPictureIndex].views++;

  imageThree.src = allPicks[thirdPictureIndex].src
  imageThree.title = allPicks[thirdPictureIndex].src
  imageThree.alt = allPicks[thirdPictureIndex].src
  allPicks[thirdPictureIndex].views++;
}

function renderResults() {
  //"picture had 3 votes nd was seen 6 times"
  let myList = document.querySelector('ul');
  for (let i = 0; i < allPicks.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allPicks.name} was viewed ${allPicks[i].views} times and clicked ${allPicks[i].clicks} times`;
    myList.appendChild(li);
  }
}

function handleClick(event){
  if (event.target === myContainer){
    alert ('please choose a picture')
  }
  totalCicks++;
  let pictureClicked = event.target.title;
  for (let i = 0; i < allPicks.length; i++)
    if(pictureClicked === allPicks[i].name){
      allPicks[i].clicks++
    }

  //console.log(pictureClicked);

  renderPictures();
  if (totalCicks === clicksAllowed){
    //remove event listener
    myContainer.removeEventListener('click', handleClick);
    renderResults();
  }

}

function handleButtonClick(event){
  if (totalCicks === clicksAllowed){
    renderResults();
  }
}

renderPictures();

myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);