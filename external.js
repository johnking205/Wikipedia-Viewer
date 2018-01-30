function displayResults(myResponse) {
  const myDiv = document.getElementById('results');
  myDiv.innerHTML = '';
  if (!Object.prototype.hasOwnProperty.call(myResponse, 'query')) {
    myDiv.innerHTML = `<h1 style='text-align: center'>No results for "${document.getElementById('query').value}"</h1>`;
    return;
  }
  const { pages } = myResponse.query;
  const pageKeys = Object.keys(pages);
  // For each page from the api, create a new div for each
  // entry and insert the search result info in the div and
  // put it in the results div
  // clear the results div for new entries
  for (let i = 0; i < pageKeys.length; i += 1) {
    // create the link
    const entryLink = document.createElement('a');
    entryLink.setAttribute('href', `https://en.wikipedia.org/?curid=${pages[pageKeys[i]].pageid}`);
    entryLink.setAttribute('target', '_blank');
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'entry');
    // add the image
    const image = document.createElement('img');
    try {
      image.src = pages[pageKeys[i]].thumbnail.source;
    } catch (error) {
      image.src = 'images/unknownImage.png';
    }
    newDiv.appendChild(image);
    // add the link-encapuslated title
    const title = document.createElement('h1');
    entryLink.innerText = pages[pageKeys[i]].title;
    title.appendChild(entryLink);
    newDiv.appendChild(title);
    // add the preview description
    const description = document.createElement('p');
    description.innerText = pages[pageKeys[i]].extract;
    newDiv.appendChild(description);
    // add the complete entry div into the results div
    myDiv.appendChild(newDiv);
  }
}
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "wikiRequest" }] */
function wikiRequest() {
  const myRequest = new XMLHttpRequest();
  const myRequestURL = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&exlimit=max&explaintext&exintro&exsentences=2&origin=*&gsrsearch=${encodeURIComponent(document.getElementById('query').value)}`;
  myRequest.onreadystatechange = function handleStateChange() {
    if (myRequest.readyState === 4) {
      if (myRequest.status === 200) {
        const myResponse = JSON.parse(myRequest.responseText);
        displayResults(myResponse);
      } else {
        alert('There was an error');
      }
    }
  };
  myRequest.open('GET', myRequestURL);
  myRequest.send();
}
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "enterHandler" }] */
function enterHandler(event) {
  if (event.keyCode === 13) {
    wikiRequest();
  }
}
