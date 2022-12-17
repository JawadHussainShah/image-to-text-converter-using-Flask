const input = document.querySelector('input');
const log = document.getElementById('values');

input.addEventListener('input', updateValue);

function updateValue(e) {
	
  log.textContent = e.target.value.replace(/^.*\\/, "");


}
function preview_image(event) 
{
 var reader = new FileReader();
 reader.onload = function()
 {
  var output = document.getElementById('image_view');
  output.src = reader.result;
}
reader.readAsDataURL(event.target.files[0]);
}

// hide and show text div
hide = document.getElementById('text_preview');
hide.style.display = 'none'


text = document.getElementById('text').innerHTML

if (text!=0){
	hide.style.display = ''
}

// autoscroll///////////
function setFocusOnDivWithId(id) { 
  const scrollIntoViewOptions = { behavior: "smooth", block: "center" };
  document.getElementById(id).scrollIntoView(scrollIntoViewOptions); };
  
  setFocusOnDivWithId('text_preview')

//copy text to clipboard function
function myFunction() {
  const copyText = document.getElementById("text").textContent;
  const textArea = document.createElement('textarea');
  textArea.textContent = copyText;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  console.log('text in area!!!')
  console.log(copyText)
  if (textArea.value) {
    alert('text copied to clipboard!');}
    else{
      alert('No text found!')
    }
    textArea.style.display = 'none'
  }

  ////////counter section............
// DOM Element's
const counters = document.querySelectorAll('.counter');

/*** Using forEach() ***/

/*
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const speed = 5000;

        const inc = target / speed;

        if(count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    }

    updateCount();
})

*/

// ** Same functionality, now using for...of **

for(let n of counters) {
    const updateCount = () => {
        const target = + n.getAttribute('data-target');
        const count = + n.innerText;
        const speed = 5000;
        
        const inc = target / speed; 

        if(count < target) {
            n.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            n.innerText = target;
        }
    }

    updateCount();
}

// Nave BAr/////////////
// ---------horizontal-navbar-menu-----------
  