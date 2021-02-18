'use strict'
// random math

function getRandomInt(min, max) {
  return Math.floor(Math.random() * max); //The maximum is exclusive and the minimum is inclusive
}

//Global variables
let totalCicks = 0;
let clicksAllowed = 5;//change lower for debugging
let allPics = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');
let pictureIndexArray = [];
let uniquePictureCount = 6;
//console.log(imageOne);
//console.log(imageTwo);
//consle.log(imageThree);

function Picture(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allPics.push(this);
}

new Picture('bag');
new Picture('banana');
new Picture('bathroom');
new Picture('boots');
new Picture('breakfast');
new Picture('bubblegum');
new Picture('chair');
new Picture('cthulhu');
new Picture('dog-duck');
new Picture('dragon');
new Picture('pen');
new Picture('pet-sweep');
new Picture('scissors');
new Picture('shark');
new Picture('sweep', 'png');
new Picture('tauntaun');
new Picture('unicorn');
new Picture('usb', 'gif');
new Picture('water-can');
new Picture('wine-glass');



function getRandomIndex() {
  return Math.floor(Math.random() * allPics.length);
}

function renderPictures() {
  while (pictureIndexArray.length < uniquePictureCount) {
    let randomNumber = getRandomIndex();
    while (!pictureIndexArray.includes(randomNumber)) {
      //let randomNumber = getRandomIndex();
      pictureIndexArray.unshift(randomNumber);
    }
  }
  //console.log(pictureIndexArray);
  let firstPictureIndex = pictureIndexArray.pop();
  let secondPictureIndex = pictureIndexArray.pop();
  let thirdPictureIndex = pictureIndexArray.pop();
  //gonna have to use index array for lab
  //maybe name indexArray
  //chek to see if theindex is included in that array
  //pop those results from the array or shift perhaps?


  imageOne.src = allPics[firstPictureIndex].src;
  imageOne.title = allPics[firstPictureIndex].name;
  imageOne.alt = allPics[firstPictureIndex].src
  allPics[firstPictureIndex].views++;

  imageTwo.src = allPics[secondPictureIndex].src;
  imageTwo.title = allPics[secondPictureIndex].name;
  imageTwo.alt = allPics[secondPictureIndex].src
  allPics[secondPictureIndex].views++;

  imageThree.src = allPics[thirdPictureIndex].src;
  imageThree.title = allPics[thirdPictureIndex].name;
  imageThree.alt = allPics[thirdPictureIndex].src
  allPics[thirdPictureIndex].views++;
}


function handleClick(event) {
  if (event.target === myContainer) {
    alert('please choose a picture')
  }
  totalCicks++;
  let pictureClicked = event.target.title;
  for (let i = 0; i < allPics.length; i++)
    if (pictureClicked === allPics[i].name) {
      allPics[i].clicks++
    }

  //console.log(pictureClicked.name);

  renderPictures();
  if (totalCicks === clicksAllowed) {
    //remove event listener
    myContainer.removeEventListener('click', handleClick);
    //renderResults();
  }

}

renderPictures();
let pictureNames = [];
let pictureViews = [];
let pictureClicks = [];
for (let i = 0; i <allPics.length; i++){
  pictureNames.push(allPics[i].name);
  pictureViews.push(allPics[i].views);
  pictureClicks.push(allPics[i].clicks);
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'],
    datasets: [{
      label: '# of Views',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor:'purple',
      borderColor: 'purple',
      borderWidth: 1
    },{
      label: '# of Clicks',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'orange',
      borderColor: 'orange',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

myContainer.addEventListener('click', handleClick);