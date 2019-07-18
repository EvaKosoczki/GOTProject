let userDatas;

function getData(url, callbackFunc) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function getCharacters() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

getData('/json/got.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function isAlive(data) {
  const stillAlive = [];
  let result;
  for (let i = 0; i < data.length; i += 1) {
    const keys = Object.keys(data[i]);
    for (let j = 0; j < keys.length; j += 1) {
      if (keys[j] !== 'dead') {
        result = true;
      } else {
        result = false;
        break;
      }
    }
    if (result) {
      stillAlive.push(data[i]);
    }
  }
  return stillAlive;
}

function showAlive(dataisAlive) {
  let str = '';
  for (let i = 0; i < dataisAlive.length; i += 1) {
    str += `<div class="container__character">
            <img class="img__character" src="${dataisAlive[i].portrait}" alt="${dataisAlive[i].name}pic">
            <span class="span__character">${dataisAlive[i].name}</span></div>`;
  }
  document.querySelector('.container').innerHTML = str;
}

function successAjax(xhttp) {
  userDatas = JSON.parse(xhttp.responseText);
  const stillAlive = isAlive(userDatas);
  showAlive(stillAlive);
}