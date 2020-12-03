

// const form = document.querySelector('.form-input-text'); 
// form.addEventListener('submit', logSubmit);

function logSubmit(){
    let text = document.getElementById('myTextArea').value;
    console.log(text);
    let node = document.createElement('li');
    node.appendChild(document.createTextNode(text));
    document.querySelector('ol').appendChild(node);
}
document.addEventListener('submit', () =>
        {
            logSubmit();
            document.querySelector('#sort-form').reset();
        }
    );