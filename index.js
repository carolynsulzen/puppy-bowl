const state = {
  everyPuppy:[],
}
const main = document.querySelector(`main`);

const allPlayers = async ()=>{
  const response = await fetch (`https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-MT-WEB-PT/players`);
  const responseData = await response.json();
  const allPuppies = responseData.data.players;
  state.everyPuppy = allPuppies;
  console.log(state.everyPuppy);

  renderAllNames();
}

const renderAllNames = ()=>{
  const ul = document.createElement(`ul`);
  const puppyNames = state.everyPuppy.map((singlePuppy)=>{
    return `<li>${singlePuppy.name}</li>`
  });
  ul.innerHTML = puppyNames.join(``);
  main.append(ul);
  //event listener
 ul.addEventListener(`click`,(event=>{
  if(event.target.tagName === `LI`){
    renderSinglePuppy(event.target.innerText);
  }
 }))
 
};


const renderSinglePuppy = (clickedPuppyName)=>{
const foundPuppy = state.everyPuppy.find((puppy)=>{
    return puppy.name === clickedPuppyName
  });

const detailHTML = 
`<h2>${clickedPuppyName}</h2>
<img src="${foundPuppy.imageUrl}" alt = "puppy image" width = 300px length= 300px/>
<h2>${foundPuppy.breed}</h2>
<h2>Status: ${foundPuppy.status}</h2>

<button>Back</button>`;

main.innerHTML = detailHTML
const button = document.querySelector(`button`);
button.addEventListener(`click`, ()=>{
  // document.body.innerHTML = ``;
  location.reload();
  renderAllNames();
});


}
allPlayers()