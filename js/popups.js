function popik() {
   const populLinks = document.querySelectorAll('.popup-link');
   const body = document.querySelector('body');
   const lockPadding = document.querySelectorAll(".lock-padding");

   //
   const headerWrap = document.querySelector('.header__wrapper')
   //

   let unlock = true;

   const timeout = 800;

   if (populLinks.length > 0) {
      for (let index = 0; index < populLinks.length; index++) {
         const popupLink = populLinks[index];
         popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
            //(popupLink.dataset.pid)
            apartOpen(popupLink.dataset.pid)
         });
      }
   }
   const popupCloseIcon = document.querySelectorAll('.close-popup');
   if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
         const el = popupCloseIcon[index];
         el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
         });
      }
   }

   function popupOpen(curentPopup) {
      if (curentPopup && unlock) {
         const popupActive = document.querySelector('.popup.open');
         if (popupActive) {
            popupClose(popupActive, false);
         } else {
            bodyLock();
         }
         curentPopup.classList.add('open');
         curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
               popupClose(e.target.closest('.popup'));
            }
         });
      }
   }
   function popupClose(popupActive, doUnlock = true) {
      if (unlock) {
         popupActive.classList.remove('open');
         if (doUnlock) {
            bodyUnLock();
         }
      }
   }

   function bodyLock() {
      const LockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = LockPaddingValue;
         }
      }
      body.style.paddingRight = LockPaddingValue;
      headerWrap.style.paddingRight = LockPaddingValue;
      body.classList.add('lock');

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);
   }

   function bodyUnLock() {
      setTimeout(function () {
         if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
               const el = lockPadding[index];
               el.style.paddingRight = '0px';
            }
         }
         body.style.paddingRight = '0px';
         headerWrap.style.paddingRight = '0px';
         body.classList.remove('lock');
      }, timeout);

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);
   }

   document.addEventListener('keydown', function (e) {
      if (e.which === 27) {
         const popupActive = document.querySelector('.popup.open');
         popupClose(popupActive);
      }
   });

   (function () {
      if (!Element.prototype.closest) {
         Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
               if (node.matches(css)) return node;
               else node = node.parentElement;
            }
            return null;
         }
      }
   })();
   (function () {
      if (!Element.prototype.matches) {
         Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
      }
   })();

   function apartOpen(index) {
      let apartTitle = document.querySelector('.popup-apart__title')
      let apartFloor = document.querySelector('.popup-apart__floor')
      let apartSpace = document.querySelector('.popup-apart__space')
      let apartPrice = document.querySelector('.popup-apart__price')
      let apartImage = document.querySelectorAll('.slider-popup__img')
      const arrayTitle = [2, 3, 2, 2, 3, 2, 2, 3, 4, 3, 4, 4]
      const arrayFloor = [10, 5, 2, 5, 3, 3, 6, 7, 1, 2, 8, 5]
      const arraySpace = [56, 64, 74, 74, 77, 83, 93, 100, 145, 80, 124, 100]
      const arrayPrice = ['32 500 000', '35 950 000', '36 600 000', '38 600 000', '44 000 000', '49 500 000', '55 000 000', '57 000 000', '58 000 000', '58 000 000', '59 000 000', '67 000 000']
      apartTitle.textContent = `${arrayTitle[index - 1]}-комнатная квартира`
      apartFloor.textContent = `${arrayFloor[index - 1]} этаж`
      apartSpace.textContent = `${arraySpace[index - 1]} m2`
      apartPrice.textContent = `${arrayPrice[index - 1]} ₽`
      apartImage[0].style.backgroundImage = `url("img/popups/${index}/1.jpg")`
      apartImage[1].style.backgroundImage = `url("img/popups/${index}/2.jpg")`
      apartImage[2].style.backgroundImage = `url("img/popups/${index}/3.jpg")`
   }
}

popik() 