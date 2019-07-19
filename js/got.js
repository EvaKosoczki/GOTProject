const gotObject = {
  init() {
    this.userDatas = [];
    this.getData('/json/got.json');
  },
  getData(url) {
    const request = new XMLHttpRequest();
    request.onload = () => {
      this.callbackFunc(request.responseText);
    };
    request.onerror = () => {
      console.log('Hiba a fájl betöltődésékor');
    };
    request.open('GET', url, true);
    request.send();
  },
  callbackFunc(response) {
    this.userDatas = JSON.parse(response);
    const stillAlive = this.isAlive(this.userDatas);
    this.showAlive(stillAlive);
  },
  isAlive(data) {
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
  },
  showAlive(dataisAlive) {
    let str = '';
    for (let i = 0; i < dataisAlive.length; i += 1) {
      str += `<div class="container__character">
               <img onclick="showDetailedInfo()" class="img__character" src="${dataisAlive[i].portrait}" alt="${dataisAlive[i].name}pic">
               <span class="span__character">${dataisAlive[i].name}</span></div>`;
    }
    document.querySelector('.container').innerHTML = str;
  },
};
gotObject.init();
// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */