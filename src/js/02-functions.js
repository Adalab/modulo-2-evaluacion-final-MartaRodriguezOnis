'use strict';

const renderAnimeFav = () => {
  let html = '';
  for (const eachFav of favourites) {
    html += `<li class="js_liFav liFav" id="${eachFav.id}">`;
    if (
      eachFav.img !==
      'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
    ) {
      html += `<img src="${eachFav.img}" alt="Imagen del anime ${eachFav.title}" class="imgFav">`;
    } else {
      html += `<img src=${Urlchange} alt="No hay imagen disponible" class="imgFav">`;
    }
    html += `<div class="divFavourites">`;
    html += `<h2 class="h2Fav">${eachFav.title}</h2>`;
    html += `<img src="./assets/images/cancelar.png" class="js_iconRemove iconFav" name="${eachFav.id}">`;
    html += `</div></li>`;
  }
  favouriteUl.innerHTML = html;
  listenerAnime();
  listenerIconFav();
  localStorage.setItem('favouritesLS', JSON.stringify(favourites));
};

const renderAnimeResult = () => {
  let html = '';
  let classFav = '';
  for (const eachAnime of results) {
    const favouriteIndex = favourites.findIndex(
      (fav) => eachAnime.id === fav.id
    );
    if (favouriteIndex !== -1) {
      classFav = 'favourite';
    } else {
      classFav = '';
    }
    html += `<li class="js_liAnime ${classFav} liResults" id="${eachAnime.id}">`;

    if (
      eachAnime.img !==
      'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
    ) {
      html += `<img src="${eachAnime.img}" alt="Imagen del anime ${eachAnime.title}" class="imgRes">`;
    } else {
      html += `<img src=${Urlchange}  alt="No hay imagen disponible" class="imgRes">`;
    }

    html += `<h2 class="${classFav}__title" h2Res>${eachAnime.title}</h2>`;
    html += `</li>`;
  }
  resultUl.innerHTML = html;
  listenerAnime();
  listenerIconFav();
};

const getDataApi = () => {
  const searchAnime = searchInput.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${searchAnime}`)
    .then((response) => response.json())
    .then((json) => {
      results = json.data.map(function (elem) {
        let returnProp = {
          img: elem.images.jpg.image_url,
          title: elem.title,
          id: elem.mal_id,
        };
        return returnProp;
      });
      msgSearch.classList.add('hidden');
      renderAnimeResult();
    });
};

// const renderAnimeFav = () => {
//   let html = '';
//   for (const eachFav of favourites) {
//     const liElem = document.createElement('li');
//     liElem.classList.add('js_liFav');
//     liElem.id = eachFav.id;

//     const imgElem = document.createElement('img');
//     imgElem.src = eachFav.img;
//     imgElem.alt = eachFav.title;
//     liElem.appendChild(imgElem);

//     const divElem = document.createElement('div');

//     const h2Elem = document.createElement('h2');
//     const h2Text = document.createTextNode(eachFav.title);
//     h2Elem.appendChild(h2Text);
//     divElem.appendChild(h2Elem);

//     const iconElem = document.createElement('img');
//     iconElem.src = './assets/images/cancelar.png';
//     iconElem.name = eachFav.id;
//     iconElem.classList.add('js_iconRemove');
//     divElem.appendChild(iconElem);

//     liElem.appendChild(divElem);
//     resultUl.appendChild(liElem);
