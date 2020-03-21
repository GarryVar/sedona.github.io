(function() {

// Глобальные переменные
  var searchBlock = document.querySelector('.hotel-search'),
      form = searchBlock.querySelector('.hotel-search__form'),
      inputEntry = form.querySelector('[name=entry]'),
      inputOut = form.querySelector('[name=out]'),
      inputAdult = form.querySelector('[name=adult]'),
      inputChild = form.querySelector('[name=child]'),
      quantityAdult = '',
      quantityChild = '',
      storageEntry = localStorage.getItem('inputEntry'),
      storageOut = localStorage.getItem('inputOut'),
      isStorageSupport = true,
      storage = '';


//Отлавливаем ошибку localStorage
  try {
    storageEntry = localStorage.getItem('inputEntry');
    storageOut = localStorage.getItem('inputOut');

  } catch (err) {
    isStorageSupport = false;
  }


  // Функция увеличения числа на 1
  function counterAddition(counter, inputValue) {
    if(inputValue.value >= 0) {
        counter = inputValue.value;
        counter++;
        inputValue.value = counter.toString();
    }
  };


  // Функция уменьшения числа на 1
  function counterSubtraction(counter, inputValue) {
    if (inputValue.value != 0) {
        counter = inputValue.value;
        counter--;
        inputValue.value = counter.toString();
    }
  };

  // Анимация ошибки
  function addErrorAnimation() {
    searchBlock.classList.add('hotel-search--error');
  };

  // Убрать анимацию ошибки
  function removeErrorAnimation() {
    searchBlock.classList.remove('hotel-search--error');
  };

  // Показать форму
  function hotelSearchShow() {
    searchBlock.classList.remove('hotel-search--hide');
  };

  // Скрыть форму
  function hotelSearchHide() {
    searchBlock.classList.add('hotel-search--hide');
  };

  hotelSearchHide();

  // Добавить или убавить кол-во взрослых и детей
  window.addEventListener('click', function(e){
    var elementTarget = e.target;

    if (elementTarget.classList.contains('hotel-search__adult-value--plus')) {
      counterAddition(quantityAdult, inputAdult);

    } else if (elementTarget.classList.contains('hotel-search__adult-value--minus')) {
      counterSubtraction(quantityAdult, inputAdult);

    } else if (elementTarget.classList.contains('hotel-search__child-value--plus')) {
      counterAddition(quantityChild, inputChild);

    } else if (elementTarget.classList.contains('hotel-search__child-value--minus')) {
      counterSubtraction(quantityChild, inputChild);

    } else if (elementTarget.classList.contains('button--search')) {

      e.preventDefault();

      if (searchBlock.classList.contains('hotel-search--hide')) {
        hotelSearchShow();
        removeErrorAnimation();

        if (storageEntry || storageOut) {
          inputEntry.value = storageEntry;
          inputOut.value = storageOut;
          // inputChild.focus();

        } else inputEntry.focus();


      } else {
        hotelSearchHide();
        removeErrorAnimation();
        }
    }
  });


  // Закрытие формы поиска через 'esc'
  window.addEventListener('keydown', function(e) {
    if (e.keyCode === 27) {
        e.preventDefault();
        hotelSearchHide();
    }
  });

  // Отправка формы
  form.addEventListener('submit', function(e) {
    if (!inputEntry.value || !inputOut.value) {
      e.preventDefault();

      removeErrorAnimation();
      searchBlock.offsetWidth = searchBlock.offsetWidth;
      addErrorAnimation();

    } else {

      if (isStorageSupport) {
          localStorage.setItem('inputEntry', inputEntry.value);
          localStorage.setItem('inputOut', inputOut.value);
      }
    }
  });
})();
