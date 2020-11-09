
// task 1
swapText('.header > h1','.footer > h1');

document.querySelector('.header > h1').onclick = 
    function() {
        swapText('.header > h1','.footer > h1');
    };
    
document.querySelector('.footer > h1').onclick = 
    function() {
        swapText('.header > h1','.footer > h1');
    };


// task 2
CircleArea(20, 'block3');

// task 3
document.querySelector('#numberButton').addEventListener('click',   () => {
    let MaxDigitNumber = FindMaxDigitAmount('numberInput');
    setCookie('MaxDigitNumber', MaxDigitNumber, 2);
    alert(`Max digit number is ${MaxDigitNumber}`);
})

window.addEventListener("load", () => {    
    if(getCookie('MaxDigitNumber')){
        document.querySelector('#numInput').style="display:none;";
        setTimeout(() => {
            if(confirm(`Some Cookies have been added\n${document.cookie}\nIf you click "OK" cookies will be cleared`))
            {
                deleteCookie();
                alert('Cookies have been cleared');
                location.reload();
            }
            else {
                location.reload();
            }
        }, 100);
    }   
})

//#region task 4
// task 4
if(localStorage.getItem('BackgroundColor')) {
    document.querySelector('#block2').style.background = localStorage.getItem('BackgroundColor');
    document.querySelector('#colorInput').setAttribute('value', localStorage.getItem('BackgroundColor'))
  }

document.querySelector('#colorInput').addEventListener('change', function() {
    document.querySelector('#block2').style.background = this.value;
    localStorage.setItem('BackgroundColor', this.value);
  })
//#endregion task 4

// task 5
document.querySelector('#numberInput').onblur =
    function() {
        document.getElementById("numberInput").style.background = "red";
    }

document.querySelector('#numberInput').onfocus =
    function() {
        document.getElementById("numberInput").style.background = "white";
    }

// task 6
// document.querySelectorAll('.text-content').forEach(block => { loadHtml('#' + block.parentNode.id); });
document.addEventListener("DOMContentLoaded", () => {
    for(let i = 1; i < 6; i++) {
    loadHtml('#'+'block'+i);

    if(localStorage.getItem('#block' + i + '-text')) {
        document.querySelector('#block'+i+" > .form-input").style = "display:none;";
    }
    
    if(localStorage.getItem('#block' + i + '-html')) {
        document.querySelector('#block'+i+" > .form-input").style = "display:none;";    
    }
}})


document.querySelectorAll('.form-input-text').forEach(form =>
    {
        form.onsubmit = function(event)
        {event.preventDefault();onsubmitFormInput(form,'text');}
    });

document.querySelectorAll('.form-input-html').forEach(form =>
    {
        form.onsubmit = function(event)
        { event.preventDefault();
            onsubmitFormInput(form,'html');}
    });

document.querySelectorAll('.btn-reset').forEach(btn =>
    { btn.onclick = function(event)
        {buttonClickReset(btn);}
    });


function changeVisibilityOnClick(displayMode, path){
    document.querySelectorAll(path)
    .forEach(content => {content.style.display = displayMode;});
}

function onsubmitFormInput(form, formType) {
    let blockId = form.parentNode.parentNode.id;
    let newHtml = document.querySelector('#' + blockId +
        '> .form-input > .form-input-' + formType + ' > textarea[name="input-' + formType + '"]').value;

    if(!isValidHTML(newHtml)){
        formType = "text";
    }
        
    localStorage.setItem('#' + blockId + '-' + formType, newHtml);
    if (formType == 'text')
        localStorage.removeItem('#' + blockId + '-html', newHtml);
    if (formType == 'html')
        localStorage.removeItem('#' + blockId + '-text', newHtml);

    changeVisibilityOnClick('none','#' + blockId + '> .form-input');
    document.querySelector('#' + blockId + '> .form-input >.form-input-html').reset();
    document.querySelector('#' + blockId + '> .form-input >.form-input-text').reset();
    loadHtml('#' + blockId);
}


function loadHtml(blockName){
    if(localStorage.getItem(blockName + '-text') || localStorage.getItem(blockName + '-html')) {
        document.querySelectorAll(blockName + '>*:not(.form-input)').forEach(c => c.outerHTML = '');
        document.querySelector(blockName +'> .btn-reset').style.display = 'block';
        document.querySelector(blockName +'> .btn-reset').innerHTML = 'Reset';
    }

    if(localStorage.getItem(blockName + '-text')) {
        var tc = document.createElement('div');
        tc.className = 'text-content';
        var p = document.createElement('p');
        p.innerText = localStorage.getItem(blockName + '-text');
        tc.appendChild(p);
        document.querySelector(blockName).appendChild(tc);
    }

    if(localStorage.getItem(blockName + '-html')){   
        document.querySelector(blockName).innerHTML +=  localStorage.getItem(blockName + '-html'); 
        document.querySelector(blockName +'>.btn-reset').onclick = function(event){buttonClickReset(this);};
        document.querySelector(blockName + '>.form-input > .form-input-text').onsubmit = function(event)
            {event.preventDefault();onsubmitFormInput(this,'text');};
        document.querySelector(blockName + '>.form-input > .form-input-html').onsubmit = function(event)
            { event.preventDefault();onsubmitFormInput(this,'html');};
    } 
}

function buttonClickReset(button){
    if(localStorage.getItem('#' + button.parentNode.id + '-text'))
        localStorage.removeItem('#' + button.parentNode.id + '-text');
    if(localStorage.getItem('#' + button.parentNode.id + '-html'))
        localStorage.removeItem('#' + button.parentNode.id + '-html');
    location.reload();
}


function isValidHTML(html){
    if(html.includes("<")) {
    const doc = document.createElement('div');
    doc.innerHTML = html;
    return doc.innerHTML === html;
    }
    else {
        return false;
    }
}


function swapText(block1, block2){
    let temp = document.querySelector(block1).innerHTML;
    document.querySelector(block1).innerHTML = document.querySelector(block2).innerHTML;
    document.querySelector(block2).innerHTML = temp;
}

function FindMaxDigitAmount(inputId) {
    let number = document.getElementById(inputId).value;
    let arr = Array.from(number).sort();
    let max = arr.slice(-1)[0];
    let counter = 0;
    arr.forEach(element => {
        if(max==element){
            counter++;
        } 
    });
    return counter;
}

function CircleArea(radius, outputId){
    let area = Math.PI*Math.pow(radius, 2);
    document.getElementById(outputId).insertAdjacentHTML("beforeend", 
    `<p><strong>R = ${radius}<br>AREA = ${area}</strong></p>`
    );
}

function setCookie(name, data, expDays){
    const d = new Date();
    d.setDate(d.getDate() + expDays);
    document.cookie = `${name}=${data};expires=${d.toUTCString()};path=/`;
}
   
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function deleteCookie() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  }