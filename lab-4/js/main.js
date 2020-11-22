//task1
const task1blocks = ['.box-1','.box-2','.box-3'];
const task2blocks = ['.header', '.footer'];

async function swapContent(contentBlocksNames, delay = 0) {    
    // зчитуємо вміст блоків
    let blocksHtml = [];
    contentBlocksNames.forEach(classname => {
        blocksHtml.push(document.querySelector(classname).innerHTML);
    });

    for (let index = 0; index < blocksHtml.length - 1; index++)
    {
        await sleep(delay);
        document.querySelector(contentBlocksNames[index+1]).innerHTML = blocksHtml[index];
        // delay +=5000; чтобы каждый раз +5 секунд
    }

    await sleep(delay);
    document.querySelector(contentBlocksNames[0]).innerHTML = blocksHtml[blocksHtml.length-1];
}

const sleep = msec => new Promise(resolve => {
    setTimeout(resolve, msec);
  });


// task 2

function changeColor(delay) {

    setInterval(() => { document.querySelector('.box-2') .style = `color:${getRandomColor()}`}, delay);
    
    document.querySelector('#numberInput').onfocus = function() {
        document.getElementById("numberInput").style.background = "white";
    }

    document.querySelector('#numberInput').onblur = () => {
        document.getElementById("numberInput").style.background = "red"; 
        var randColor = getRandomColor();
        task2blocks.forEach(class_name =>   
            {
                let box  = document.querySelector(class_name);   
                setTimeout(() => {
                box.style.color = randColor;
                if(box.childNodes){
                let childs = box.childNodes;
                childs.forEach(child => {
                    child.color = randColor;
                    })
                }}, delay);
            });
        }
    }


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// task 3

async function addCommitsToBlock(blockName){

    let username = document.querySelector('#git-commits-form > input[name="username"]').value;
    let repositoryName = document.querySelector('#git-commits-form > input[name="repository-name"]').value;
    let response = await fetch(`https://api.github.com/repos/${username}/${repositoryName}/commits`);
    
    let div = document.createElement('div');
    div.id = "commits-content";
    div.style.height = "20%";
    div.style.overflow = "auto";

    let ul = document.createElement('ul');
    if (response.ok) 
    {
        response.json().then(data => data.forEach(c => 
            {
                let li = document.createElement('li');
                li.textContent = `${c.commit.author.name} : ${c.commit.message}`;
                ul.append(li);
            }));
        div.append(ul);
    }
    
    else 
    {
        let p = document.createElement('p');
        p.textContent = `Error : ${response.status}(${response.statusText})`;
        p.style = 'display:border-box; background:red; padding = 1em;';
        div.append(p);
    }

    document.querySelector(blockName).appendChild(div);
}


document.addEventListener('submit', function(event)
    {
        if(event?.target.id == 'git-commits-form')
        {
            event.preventDefault();
            if(document.querySelector('#commits-content'))
            {
                document.querySelector('#commits-content').remove();
            }
            addCommitsToBlock('#' + document.querySelector('#git-commits-form').parentNode.id);
            document.querySelector('#git-commits-form').reset();
        }
        if(event?.target.id == 'sort-form')
        {
            event.preventDefault();
            if(document.querySelector('#sort-content'))
            {
                document.querySelector('#sort-content').remove();
            }
            sortListOfValuesToBlock('#' + document.querySelector('#sort-form').parentNode.id);
            document.querySelector('#sort-form').reset();
        }
    });


function A(callback1, callback2) {
    console.log("I am an A function")
    callback1();
    callback2();
}

function B() {
    console.log("I am a B function");
}

function C() {
    console.log("I am a C function");
}


function sortListOfValuesToBlock(blockName)
{
    let inputList = document.querySelector('#sort-form > input[name="list-of-values"]').value;
    let numberList = inputList.match(/\d+/g).map(Number);

    if(!numberList)
        console.log('Error: no number in the list');
    else{
        console.log('Unsorted list: ');
        console.log(numberList.slice());
        console.log('Sorted list: ')
        console.log(insertionSort(numberList));
    }
}


function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            let current = inputArr[i];
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}


swapContent(task1blocks, 5000);
changeColor(5000);
A(B, C);
