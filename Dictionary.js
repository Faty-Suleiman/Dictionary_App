const sound = document.querySelector('#sound')
const button = document.querySelector('#search-btn')
const result = document.querySelector('#res')
const err = document.querySelector('#error')

let time = ()=>{
    let cur_date = new Date()
    let cur_hour = new Date().getHours()
    let cur_minute = new Date().getMinutes()
    let cur_second = new Date().getSeconds()
  
    setInterval(()=>{
     cur_second = new Date().getSeconds()
     if(cur_second >= 60){
      cur_minute += 1
      cur_second = 0
     };
     if(cur_minute >= 60){
      cur_hour += 1
     }
     if(cur_hour >= 24){
      cur_hour = 0;
     }
     document.querySelector('#time').textContent = ` ${cur_hour}:${cur_minute}:${cur_second}`
    }, 1000)
    
  }
  time();

button.addEventListener('click', (e)=>{
    e.preventDefault()
    let input = document.querySelector('#inp-word').value
    let time = document.querySelector('#time')
    fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${input.toLowerCase()}`)
.then((response)=>response.json())
.then((data)=>{
console.log(data)
console.log(data[0].meanings[0].antonyms)


result.innerHTML = `
<div class="word">
<h3>${input}</h3>
<button id="sound">
<i class="fas fa-volume-up"></i>
</button>
</div>
<div class="details">
<p>${data[0].meanings[0].partOfSpeech}</p>
<p>/${data[0].phonetic}/</p>
</div>
<p class = "word-meaning">
    ${data[0].meanings[0].definitions[0].definition}</p>
<p class="word-example">
Example: ${data[0].meanings[0].definitions[0].example || ""}</p>
<p class= "synonyms">
Synonyms: ${data[0].meanings[0].synonyms || ""}</p>
<p class= "antonyms">
Antonyms: ${data[0].meanings[0].antonyms || ""}</p>`

document.querySelector('#sound').addEventListener('click', (e)=>{
    e.preventDefault();
    e.target.classList.contains('#sound')
    console.log('sound')})


// .catch((error) => {
//  err.textContent = `Couldn't Find The Word`;
})
.catch(error => error ? err.textContent= 'Sorry pal, we couldn\'t find definitions for the word you were looking for, You can try the search again at later time or head to the web instead': null)
});






