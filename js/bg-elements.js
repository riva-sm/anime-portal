const bgElements = () => {
  // находим все элементы с классом бэкграунда
  const elements = document.querySelectorAll(".set-bg");
  // перебираем все найденные элементы с классом бэкграунда в цикле
  elements.forEach((elem) => {
    // добавляем к элементам с датаатрибутом путь к изображениям
    elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
  });
};

bgElements();
