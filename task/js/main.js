const matchFrom = (str, reg, fromIndex)  => {
    for (const match of str.matchAll(reg)) {
      if (match.index >= fromIndex) return match.index;
    } return -1;
}

document.getElementById('filter-button').addEventListener("click", () => {
    let arr = document.getElementById('text').innerHTML.split(' ');
    let substr = document.getElementById('user-substr').value;
    let regexp = new RegExp(`${substr}+\\d`, 'g');

    arr.forEach((word, index) => {
        if(word.match(regexp)) {
            let indexOfMatch = matchFrom(word, regexp, 0);
            word = arr[index] = word.substring(0, indexOfMatch) + word.substring(indexOfMatch + substr.length, word.length);
            while(matchFrom(word, regexp, indexOfMatch + 1) > 0) {
                indexOfMatch  = matchFrom(word, regexp, indexOfMatch + 1);
                word = arr[index] = word.substring(0, indexOfMatch) + word.substring(indexOfMatch + substr.length, word.length);
                }
    }});    

    let result = arr.join(' ');
    document.getElementById('text').innerHTML = result;     
})


document.getElementById('add-text-button').addEventListener("click", () => {
    let new_text = document.getElementById('user-text').value;
    document.getElementById('text').innerHTML = new_text;
})