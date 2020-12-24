document.getElementById('filter-button').addEventListener("click", () => {

    let arr = document.getElementById('text').innerHTML.split(' ');
    let substr = document.getElementById('user-substr').value;
    let regexp = new RegExp(`${substr}+\\d`);

    arr.forEach((word, index) => {
        arr[index] = word.match(regexp)? word.replace(substr, '') : word;
    });
    
    let result = arr.join(' ');
    document.getElementById('text').innerHTML = result;     
})


document.getElementById('add-text-button').addEventListener("click", () => {
    let new_text = document.getElementById('user-text').value;
    document.getElementById('text').innerHTML = new_text;
})
