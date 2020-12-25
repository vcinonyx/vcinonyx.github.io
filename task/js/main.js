document.getElementById('filter-button').addEventListener("click", () => {
    let arr = document.getElementById('text').innerHTML.split(' ');
    let substr = document.getElementById('user-substr').value;
    let regexp = new RegExp(`${substr}+\\d`, 'g');

    arr.forEach((word, index) => {
        console.log(regexp);
        if(word.match(regexp)) {
            let indexOfMatch = matchFrom(word, regexp, 0);
            word = arr[index] = word.substring(0, indexOfMatch) + word.substring(indexOfMatch + substr.length, word.length);
            while(matchFrom(word, regexp, indexOfMatch + 1) > 0) {
                indexOfMatch  = matchFrom(word, regexp, indexOfMatch + 1);
                word = arr[index] = word.substring(0, indexOfMatch) + word.substring(indexOfMatch + substr.length, word.length);
                }
            }
        }
    );    

    let result = arr.join(' ');
    console.log(result);
    document.getElementById('text').innerHTML = result;     
})

function matchFrom(str, reg, fromIndex) {
    for (const match of str.matchAll(reg)) {
      if (match.index >= fromIndex) return match.index;
    } return -1;
  }

document.getElementById('add-text-button').addEventListener("click", () => {
    let new_text = document.getElementById('user-text').value;
    document.getElementById('text').innerHTML = new_text;
})