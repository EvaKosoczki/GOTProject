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

function successAjax(xhttp) {
  userDatas = JSON.parse(xhttp.responseText);
  isAlive(userDatas);
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