//сохраняем элементы в переменных
const container = document.querySelector('.container');                     //Выбираем контейнер, в котором будут находиться элементы
const songsContainer = container.querySelector('.songs-container');         //Выбираем контейнер для песен
const addButton = container.querySelector('.input__btn_action_add');        //Выбираем кнопку "Добавить"
const resetButton = container.querySelector('.input__btn_action_reset');    //Выбираем кнопку "Очистить плейлист"
const noSongsElement = container.querySelector('.no-songs');                //Выбираем элемент для отображения сообщения о том, что нет добавленных песен "Нет добавленных песен"

//Функция для отображения состояния с песнями в плейлисте
function renderHasSongs() {
  resetButton.removeAttribute('disabled');              //Убираем атрибут disabled у кнопки "Очистить плейлист", поскольку песни добавили
  resetButton.classList.remove('input__btn_disabled');  //Удаляем класс для стилизации отключенной кнопки (Очистить плейлист)
  noSongsElement.classList.add('no-songs_hidden');      //Скрываем сообщение о том, что нет добавленных песен
}

//Функция для отображения состояния без песен в плейлисте
function renderNoSongs() {
  resetButton.setAttribute('disabled', true);           //Добавляем атрибут disabled кнопке "Очистить плейлист"
  resetButton.classList.add('input__btn_disabled');     //Добавляем класс для стилизации отключенной кнопки
  noSongsElement.classList.remove('no-songs_hidden');   //Показываем сообщение о том, что нет добавленных песен "Нет добавленных песен"
}

// Функция добавления песни (исполнитель, название)
function addSong(artistValue, titleValue) {                                             
  const songTemplate = document.querySelector('#song-template').content;    //Получаем контент шаблона песни благодаря template
  const songElement = songTemplate.querySelector('.song').cloneNode(true);  //Клонируем элемент песни из шаблона

  // Заполняем данные об исполнителе и названии песни
  songElement.querySelector('.song__artist').textContent = artistValue;
  songElement.querySelector('.song__title').textContent = titleValue;

  // Добавляем обработчик события для кнопки "like"
  songElement.querySelector('.song__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('song__like_active');                     //Переключаем класс для стилизации активного "like"
});

  songsContainer.append(songElement);                                  //Добавляем элемент песни в контейнер песен
}

//Обработчик события для кнопки "Добавить"
addButton.addEventListener('click', function () {
  const artist = document.querySelector('.input__text_type_artist');    //Получаем значение поля "Исполнитель"
  const title = document.querySelector('.input__text_type_title');      //Получаем значение поля "Название"

  addSong(artist.value, title.value);                                   //Добавляем песню
  renderHasSongs();                                                     //Отображаем, что есть добавленные песни

  artist.value = '';                                                    //Очищаем поле "Исполнитель" после нажатия кнопки "Добавить"
  title.value = '';                                                     //Очищаем поле "Название" после нажатия кнопки "Добавить"
});

//Обработчик события для кнопки "Очистить плейлист"
resetButton.addEventListener('click', function () {
  const songs = document.querySelectorAll('.song')                      //Выбираем все элементы песен в плейлисте
  //Удаляем каждую песню из плейлиста
  for (let i = 0; i < songs.length; i++) {
    songs[i].remove();
  }

  renderNoSongs();                                                      //Отображаем, что нет добавленных песен после очистки плейлиста
});
