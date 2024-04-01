/*
const list = (resource) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const data = JSON.parse(request.responseText); // Parse JSON string to object
          resolve(data);
        } else {
          reject('Error getting resource');
        }
      }
    });
    request.open('GET', resource);
    request.send();
  });
};

list('db.json').then((data) => {
  console.log('Done', data);
}).then((data => {
  console.log('part 1', data);
})).catch((err) => {
  console.log('Rejected', err);
});
*/
const theList = document.getElementById('films');
fetch (`http://localhost:3000/films`)
.then (res => res.json()) //parses the JSON data into an object
.then (data => {
  data.forEach((filmData => {
    theList.insertAdjacentHTML('beforeend', `<li>${filmData.title}</li>`);
  }))
})
theList.onclick = (e) => {
  if (e.target.tagName === 'li'){
    let posterPic = document.querySelector('#poster');
    let movie = data.find(filmData => filmData.title === e.target.innerText)
    if (movie){
      posterPic.src = movie.poster
    }
  }
}
