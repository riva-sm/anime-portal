const categoriesData = () => {
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

  // Фильтруем аниме по жанру
  const renderAnimeList = (array, ganres) => {
    // находим блок аниме по жанрам
    const wrapper = document.querySelector(".product-page .product__list");

    ganres.forEach((ganre) => {
      // Создаем блок категорий, формируем верстку
      const productBlock = document.createElement("div");
      // Создаем блок карточек аниме
      const listBlock = document.createElement("div");
      // фильтр карточек аниме по жанру, оставляем только те карточки, которые соответствуют данному жанруы
      const list = array.filter((item) => item.tags.includes(ganre));

      listBlock.classList.add("row");
      productBlock.classList.add("mb-5");
      //  Формируем верстку категорий/жанров аниме

      productBlock.insertAdjacentHTML(
        "beforeend",
        `
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="section-title">
                    <h4>${ganre}</h4>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="btn__all">
                    <a href="/categories.html?ganre=${ganre}" class="primary-btn"
                      >View All <span class="arrow_right"></span
                    ></a>
                  </div>
                </div>
              </div>
      `
      );
      // перебираем все внутренние элементы контейнера, формируем верстку карточек аниме по жанрам
      list.forEach((item) => {
        // Создаем список с тегами аниме
        const tagsBlock = document.createElement("ul");

        item.tags.forEach((tag) => {
          tagsBlock.insertAdjacentHTML(
            "beforeend",
            `
              <li>${tag}</li>
          `
          );
        });

        listBlock.insertAdjacentHTML(
          "beforeend",
          `
               <div class="col-lg-4 col-md-6 col-sm-6">
                  <div class="product__item">
                    <div
                      class="product__item__pic set-bg"
                      data-setbg="${item.image}"
                    >
                      <div class="ep">${item.rating} / 10</div>
                      <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                    </div>
                    <div class="product__item__text">
                    ${tagsBlock.outerHTML}
                      <h5>
                        <a href="/anime-details.html?itemId=${item.id}"
                          >${item.title}</a
                        >
                      </h5>
                    </div>
                  </div>
                </div>
        `
        );
      });
      productBlock.append(listBlock); // вставляем карточки в контейнер
      wrapper.append(productBlock); // вставляем жанры в контейнер
      wrapper.querySelectorAll(".set-bg").forEach((elem) => {
        // добавляем к элементам с датаатрибутом путь к изображениям
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
      });
    });
  };

  // Фильтруем топ 5 аниме по количеству просмотров
  const renderTopAnime = (array) => {
    const wrapper = document.querySelector(".filter__gallery");
    // формируем карточку аниме
    array.forEach((item) => {
      wrapper.insertAdjacentHTML(
        "beforeend",
        `
            <div class="product__sidebar__view__item set-bg mix day years" data-setbg="${item.image}">
                <div class="ep">${item.rating} / 10</div>
                <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                <h5>
                    <a href="/anime-details.html">${item.title}</a>
                </h5>
            </div>
      `
      );
    });
    wrapper.querySelectorAll(".set-bg").forEach((elem) => {
      // добавляем к элементам с датаатрибутом путь к изображениям
      elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
    });
  };

  // получаем данные в формате json из базы данных
  fetch("https://anime-site-e9b72-default-rtdb.firebaseio.com/anime.json")
    .then((response) => response.json())
    .then((data) => {
      const ganres = new Set(); // опредеяем данную переменную как коллекцию
      const ganreParams = new URLSearchParams(window.location.search).get(
        "ganre"
      );

      // перебираем данные из db.json, добавляем к жанрам жанр, рендерим и выводим все жанры
      data.forEach((item) => {
        ganres.add(item.ganre);
      });
      // отсортировываем аниме по количеству просмотров от большего к меньшему, отрезаем от массива лишнее, оставляем только первые 5
      renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));
      if (ganreParams) {
        renderAnimeList(data, [ganreParams]);
      } else {
        renderAnimeList(data, ganres); // Аниме по жанрам
      }
      renderGanreList(ganres); // Жанры аниме
    });
};

categoriesData();
