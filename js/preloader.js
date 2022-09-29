// Прелоадер
const preloader = () => {
  const preloader = document.querySelector(".preloder");
  // показываем прелоадер при загрузке страницы
  preloader.classList.add("active");
  // через 500 милисекунд после загрузки страницы отключаем
  setTimeout(() => {
    preloader.classList.remove("active");
  }, 500);
};

preloader();
