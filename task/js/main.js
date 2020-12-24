document.getElementById('filter-button').addEventListener("click", () => {
    let arr = document.getElementById('text').innerHTML.split(' ');
    let substr = document.getElementById('user-substr').value;
    let regexp = new RegExp(`${substr}+\\d`);

    arr.forEach((word, index) => {
        while(word.match(regexp)) {
            let indexOfSubstr = word.match(regexp).index;
            word = arr[index] = word.substring(0, indexOfSubstr) + word.substring(indexOfSubstr + substr.length, word.length);
        }
    });    

    let result = arr.join(' ');
    document.getElementById('text').innerHTML = result;     
})


document.getElementById('add-text-button').addEventListener("click", () => {
    let new_text = document.getElementById('user-text').value;
    document.getElementById('text').innerHTML = new_text;
})
