function repeatedCharacterCount(sira) {
  let characterCount = {};

  for (let i = 0; i < sira.length; i++) {
    let character = sira[i];
    if (characterCount[character]) {
      characterCount[character] += 1;
    } else {
      characterCount[character] = 1;
    }
  }

  return characterCount;
}

const text = "Salam Dunya!";
const repeateds = repeatedCharacterCount(text);
console.log(repeateds);
