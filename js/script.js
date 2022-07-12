function ibg() {

   let ibg = document.querySelectorAll(".ibg");
   for (let i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
}
ibg();


const iconMenu = document.querySelector('.header__burger');
const iconItem = document.querySelector('.menu__list')
if (iconMenu) {
   const menuBody = document.querySelector('.menu__body');
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
   iconItem.addEventListener('click', (e) => {
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
      document.body.classList.toggle('_lock');
   })
}


new Swiper('.bg-slider__body', {
   slidesPerView: 1,
   loop: true,
   autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInterection: false
   },
   speed: 800,
   effect: 'fade'
})
new Swiper('.the-best__slider_one', {
   slidesPerView: 1,
   loop: true,
   autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInterection: false
   },
   speed: 800,
   effect: 'fade',
   navigation: {
      nextEl: '.the-best__arrow_next',
      prevEl: '.the-best__arrow_prev'
   },

})
new Swiper('.the-best__slider_two', {
   slidesPerView: 1,
   loop: true,
   autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInterection: false
   },
   speed: 800,
   effect: 'fade',
   navigation: {
      nextEl: '.the-best__arrow_two_next',
      prevEl: '.the-best__arrow_two_prev'
   }
})
new Swiper('.popup-apart__slider', {
   slidesPerView: 1,
   // loop: true,
   // autoplay: {
   //    delay: 5000,
   //    stopOnLastSlide: false,
   //    disableOnInterection: false
   // },
   // speed: 800,
   effect: 'fade',
   navigation: {
      nextEl: '.popup-apart__arrow_prev',
      prevEl: '.popup-apart__arrow_next'
   },
   // pagination: {
   //    el: '.swiper-pagination',
   //    type: 'fraction'
   // }
})
new Swiper('.slider-about__container', {
   slidesPerView: 1,
   pagination: {
      el: '.slider-about__pagination',
      clickable: true,
   }
})

function interval() {
   const intervalFill = document.querySelectorAll('.interval__fill')
   const intervalTablet = document.querySelectorAll('.interval__tablet')
   for (let i = 0; i < intervalFill.length; i++) {
      let value = parseInt(intervalTablet[i].textContent)
      intervalFill[i].style.width = (value / 10) + '%'
      intervalTablet[i].style.left = `calc(${value / 10}% - 15px)`
   }
}
interval()

const headerElement = document.querySelector('.header')

const callback = function (entries, observer) {
   if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll')
   } else {
      headerElement.classList.add('_scroll')
   }
}

const headerObserver = new IntersectionObserver(callback)
headerObserver.observe(headerElement)

const button = document.querySelector('.apartments__btn')
window.onload = function () {
   document.addEventListener("click", documentActions);
   function documentActions(e) {
      const targetElement = e.target;
      if (targetElement.classList.contains('apartments__btn')) {
         getProducts(targetElement);
         e.preventDefault();
      }
   }
}
async function getProducts(button) {
   if (!button.classList.contains('_hold')) {
      button.classList.add('_hold');
      const file = "js/apartaments.json";
      let response = await fetch(file, {
         method: "GET"
      });
      if (response.ok) {
         let result = await response.json();
         loadProducts(result);
         button.classList.remove('_hold');
         button.remove();
      } else {
         alert("Ошибка");
      }
   }
}
function loadProducts(date) {
   const productItems = document.querySelector('.apartments__body')
   date.products.forEach(item => {
      const productId = item.id
      const productTitle = item.title
      const productImage = item.image
      const productPrice = item.price
      const productSize = item.size

      let tempale = `
   <a href="#popup-apart" data-pid="${productId}" class="apartments__item popup-link">
      <div class="apartments__row">
         <div class="apartments__image ibg">
            <img src="img/appar/${productImage}.jpg" alt="">
         </div>
      </div>
      <div class="apartments__name">${productTitle}-комнатная квартира</div>
      <div class="apartments__value">${productSize} м<sup>2</sup></div>
      <div class="apartments__price">${productPrice} ₽</div>
   </a>
   `
      productItems.insertAdjacentHTML('beforeend', tempale)
   });
   ibg()
   popik()
}



function gallery() {
   const container = document.querySelectorAll('.gallery__body .ibg')
   const popup = document.querySelector('.gallery__popup')

   if (popup) {
      container.forEach(img => {
         img.onclick = () => {
            popup.classList.add('active')
            document.querySelector('.gallery__popup img').src = img.childNodes[1].getAttribute('src')
         }
      })

      document.querySelector('.gallery__popup span').onclick = () => {
         popup.classList.remove('active')
      }
   }
}
gallery()


const animItems = document.querySelectorAll('._anim')
if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll)
   function animOnScroll() {
      for (let i = 0; i < animItems.length; i++) {
         const animItem = animItems[i]
         const animItemHeight = animItem.offsetHeight
         const animItemOffset = offset(animItem).top
         const animStart = 4

         let animItemPoint = window.innerHeight - animItemHeight / animStart
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('_active')
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }
   animOnScroll()
}

//////////////


window.addEventListener('load', windowLoad)

function windowLoad() {
   function digitsCountersInit(digitsCountersItems) {
      let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll('[data-digits-counter]')
      if (digitsCounters) {
         digitsCounters.forEach(digitsCounter => {
            digitsCounterAnimate(digitsCounter)
         })
      }
   }
   function digitsCounterAnimate(digitsCounter) {
      let startTimestamp = null
      const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000
      const startValue = parseInt(digitsCounter.innerHTML)
      const startPosition = 0
      const step = (timestamp) => {
         if (!startTimestamp) startTimestamp = timestamp
         const progress = Math.min((timestamp - startTimestamp) / duration, 1)
         digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue))
         if (progress < 1) {
            window.requestAnimationFrame(step)
         }
      }
      window.requestAnimationFrame(step)
   }
   // digitsCountersInit()

   let options = {
      threshold: 0.3
   }

   let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            const targetElement = entry.target
            const digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]')
            if (digitsCountersItems.length) {
               digitsCountersInit(digitsCountersItems)
            }
            observer.unobserve(targetElement)
         }
      })
   }, options)

   let sections = document.querySelectorAll('.bottom-interval__body')
   if (sections.length) {
      sections.forEach(section => {
         observer.observe(section)
      })
   }
}

const mapSection = document.querySelector('.map-section')
if (mapSection) {
   ymaps.ready(init);

   function init() {
      let map = new ymaps.Map("map", {
         center: [55.79015125439365, 37.57072748811339], // ваши данные
         zoom: 17
      });

      let placemark = new ymaps.Placemark([55.7900243117922, 37.570115944458], {}, {

      })

      map.controls.remove('geolocationControl'); // удаляем геолокацию
      map.controls.remove('searchControl'); // удаляем поиск
      map.controls.remove('trafficControl'); // удаляем контроль трафика
      map.controls.remove('typeSelector'); // удаляем тип
      map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
      map.controls.remove('zoomControl'); // удаляем контрол зуммирования
      map.controls.remove('rulerControl'); // удаляем контрол правил
      map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

      map.geoObjects.add(placemark)
   }
}

/////
const formSection = document.querySelector('.form-section')
if (formSection) {
   document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('form')
      form.addEventListener('submit', formSend)

      async function formSend(e) {
         e.preventDefault()
         let error = formValudate(form)
      }
      function formValudate(e) {
         let error = 0
         let formReq = document.querySelectorAll('._req')
         for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i]
            formRemoveError(input)
            if (input.classList.contains('_email')) {
               if (emailTest(input)) {
                  formAddError(input)
                  error++
               }
            } else if (input.getAttribute("type") === 'checkbox' && input.checked === false) {
               formAddError(input)
               error++
            } else {
               if (input.value === '') {
                  formAddError(input)
                  error++
               }
            }
         }
      }
      function formAddError(input) {
         input.parentElement.classList.add('_error')
         input.classList.add('_error')
      }
      function formRemoveError(input) {
         input.parentElement.classList.remove('_error')
         input.classList.remove('_error')
      }
      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]w+)*(\.\w{2,8})+$/.test(input.value)
      }
   })
}