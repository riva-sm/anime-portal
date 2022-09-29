const detailData = () => {
  const preloader = document.querySelector(".preloder");
  // Создаем категории жанров в меню
  const renderGanreList = (ganres) => {
    const dropdownBlock = document.querySelector(".header__menu .dropdown");

    ganres.forEach((ganre) => {
      dropdownBlock.insertAdjacentHTML(
        "beforeend",
        `
             <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
        `
      );
    });
  };

  // Детальная информация об аниме
  const renderAnimeDetails = (array, itemId) => {
    const animeObj = array.find((item) => item.id == itemId);
    const imageBlock = document.querySelector(".anime__details__pic");
    const viewsBlock = imageBlock.querySelector(".view");
    const titleBlock = document.querySelector(".anime__details__title span");
    const subtitleBlock = document.querySelector(".anime__details__title h3");
    const descriptionBlock = document.querySelector(".anime__details__text p");
    const widgetList = document.querySelectorAll(
      ".anime__details__widget ul li"
    );
    const breadcrumb = document.querySelector(".breadcrumb__links span");
    if (animeObj) {
      imageBlock.dataset.setbg = animeObj.image;
      viewsBlock.insertAdjacentHTML(
        "beforeend",
        `<i class="fa fa-eye"></i> ${animeObj.views}</div>
    `
      );
      titleBlock.textContent = animeObj.title;
      subtitleBlock.textContent = animeObj["original-title"];
      descriptionBlock.textContent = animeObj.description;

      widgetList[0].insertAdjacentHTML(
        "beforeend",
        `
      <span>Date aired:</span>${animeObj.date}
      `
      );
      widgetList[1].insertAdjacentHTML(
        "beforeend",
        `
      <span>Status:</span> ${animeObj.rating}
      `
      );
      widgetList[2].insertAdjacentHTML(
        "beforeend",
        `
      <span>Genre:</span> ${animeObj.tags.join(", ")}
      `
      );

      breadcrumb.textContent = animeObj.ganre;

      document.querySelectorAll(".set-bg").forEach((elem) => {
        // добавляем к элементам с датаатрибутом путь к изображениям
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
      });
      setTimeout(() => {
        preloader.classList.remove("active");
      }, 500);
    } else {
      console.log("Аниме не найдено!");
    }
    console.log(animeObj);
  };

  // получаем данные в формате json из базы данных
  fetch("https://anime-site-e9b72-default-rtdb.firebaseio.com/anime.json")
    .then((response) => response.json())
    .then((data) => {
      const ganres = new Set(); // опредеяем данную переменную как коллекцию
      const ganreParams = new URLSearchParams(window.location.search).get(
        "itemId"
      );

      // перебираем данные из db.json, добавляем к жанрам жанр, рендерим и выводим все жанры
      data.forEach((item) => {
        ganres.add(item.ganre);
      });

      if (ganreParams) {
        renderAnimeDetails(data, ganreParams);
      } else {
        console.log("Аниме не найдено!");
      }
      renderGanreList(ganres); // Жанры аниме
    });
};

detailData();
