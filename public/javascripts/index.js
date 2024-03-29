(function(){
  const getPathUrl = () => document.location.hash.substr(1);
  const setPathUrl = (hash) => document.location.hash = hash;
  const slideWidth = document.querySelector('.slides').offsetWidth;
  let currentSlideNumber = getPathUrl() || 0;

  const getSlides = () => document.querySelectorAll(`.slide`)
  const getSlide = (slide) => document.querySelector(`.slide[data-pos='${slide}']`)
  const getNotSlide = (slide) => document.querySelectorAll(`.slide:not([data-pos='${slide}'])`)
  const getCurrentSlide = () => getSlide(currentSlideNumber)
  const getNotCurrentSlide = () => getNotSlide(currentSlideNumber)
  const maxSlide = getSlides().length - 1
  const minSlide = 0
  const nextSlide = () => { maxSlide < currentSlideNumber + 1 || currentSlideNumber ++ ; updateSlide() }
  const prevSlide = () => { minSlide > currentSlideNumber - 1 || currentSlideNumber -- ; updateSlide() }

  const updateSlide = () => {
    setPathUrl(currentSlideNumber);
    getSlides().forEach((slide) => {
      slide.style.left = `${(slide.dataset.pos - currentSlideNumber) * slideWidth}px`
    })
    getCurrentSlide().querySelectorAll('[data-animate]').forEach((ele) => {
      if(typeof ele.dataset.delay === 'undefined') {
        ele.classList.add(ele.dataset.animate, 'animated')
      } else {
        ele.style.animationDelay = `${ele.dataset.delay}ms`
        ele.classList.add(ele.dataset.animate, 'animated')
      }
    })
  }

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 39:
        nextSlide()
        break;
      case 37:
        prevSlide()
        break;
      default:
    }
  })

  updateSlide()
})()
