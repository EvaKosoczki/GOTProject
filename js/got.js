const gotObject = {
  init() {
    this.charDatas = [];
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
    this.charDatas = JSON.parse(response);
    this.killNedStark();
    this.createFlagPaths();
    const flagPaths = this.createFlagPaths();
    this.addFlagPaths(flagPaths);
    const stillAlive = this.isAlive(this.charDatas);
    this.sortStillAlive(stillAlive);
    this.showAlive(stillAlive);
  },
  killNedStark() {
    for (let i = 0; i < this.charDatas.length; i += 1) {
      if (this.charDatas[i].name === 'Ned Stark') {
        this.charDatas.splice(i, 1);
      }
    }
    return this.charDatas;
  },
  createFlagPaths() {
    const houseNOrg = [];
    const flagPaths = [];
    for (let i = 0; i < this.charDatas.length; i += 1) {
      if (this.charDatas[i].house || this.charDatas[i].organization) {
        if (this.charDatas[i].house !== undefined) {
          houseNOrg.push(this.charDatas[i].house);
        } else {
          houseNOrg.push(this.charDatas[i].organization);
        }
      }
    }
    const flagSet = new Set(houseNOrg);
    const flagArray = Array.from(flagSet);

    for (let i = 0; i < flagArray.length; i += 1) {
      flagPaths.push(`assets/houses/${flagArray[i]}.png`);
    }
    return flagPaths;
  },
  addFlagPaths(dataCreateFlagPaths) {
    for (let i = 0; i < this.charDatas.length; i += 1) {
      if (this.charDatas[i].house) {
        const house = this.charDatas[i].house;
        for (let j = 0; j < dataCreateFlagPaths.length; j += 1) {
          if ((dataCreateFlagPaths[j].indexOf(house)) !== -1) {
            this.charDatas[i].flagpath = dataCreateFlagPaths[j];
          }
        }
      }
    }
    for (let i = 0; i < this.charDatas.length; i += 1) {
      if (this.charDatas[i].organization) {
        const organization = this.charDatas[i].organization;
        for (let j = 0; j < dataCreateFlagPaths.length; j += 1) {
          if ((dataCreateFlagPaths[j].indexOf(organization)) !== -1) {
            this.charDatas[i].flagpath = dataCreateFlagPaths[j];
          }
        }
      }
    }
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
  sortStillAlive(dataisAlive) {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < dataisAlive.length - 1; i += 1) {
        for (let j = i + 1; j < dataisAlive.length; j += 1) {
          if (dataisAlive[i].name > dataisAlive[j].name) {
            const temp = [dataisAlive[i], dataisAlive[j]];
            dataisAlive[i] = temp[1];
            dataisAlive[j] = temp[0];
            swapped = true;
          }
        }
      }
    } while (swapped);
    return dataisAlive;
  },
  showAlive(dataisAlive) {
    let str = '';
    for (let i = 0; i < dataisAlive.length; i += 1) {
      str += `<div class="container__character">
               <img onclick="gotObject.showDetailedInfo()" class="img__character" src="${dataisAlive[i].portrait}" alt="${dataisAlive[i].name}pic">
               <span class="span__character">${dataisAlive[i].name}</span></div>`;
    }
    document.querySelector('.container').innerHTML = str;
  },
  writeInDisplayContainer(condition) {
    const stillAlive = this.isAlive(this.charDatas);
    let str = '';
    for (let i = 0; i < stillAlive.length; i += 1) {
      if (condition === stillAlive[i].name) {
        str += `<img class="detailed-char__img" src="${stillAlive[i].picture}" alt="${stillAlive[i].name}_pic">
                <div class="detailed-name__div"><span>${stillAlive[i].name}</span><img class="detailed-house__img" src="${stillAlive[i].flagpath}" alt="${stillAlive[i].name}_fpic"></div>
                <span class="detailed-bio__span">${stillAlive[i].bio}</span>`;
      }
    }
    document.querySelector('.datacontainer').innerHTML = str;
  },
  showDetailedInfo() {
    const nameInSpan = event.target.nextElementSibling.innerHTML;
    this.writeInDisplayContainer(nameInSpan);
  },
  searchOnclick() {
    let searchInputValue = document.querySelector('.search__input').value;
    document.querySelector('.search__input').value = '';
    const stringArray = searchInputValue.split(' ');
    const stringArrayMod = [];
    for (let i = 0; i < stringArray.length; i += 1) {
      let x = stringArray[i].toLowerCase();
      x = x.charAt(0).toUpperCase() + x.slice(1);
      stringArrayMod.push(x);
    }
    searchInputValue = stringArrayMod.join().replace(',', ' ');
    this.writeInDisplayContainer(searchInputValue);
  },
};
gotObject.init();