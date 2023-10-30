import gsap from 'gsap'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'components/pageBlocks/map'
import 'components/pageBlocks/filterPopup'
import { initCustomSwiper } from 'features/slider/customSwiper'
import { createSwiperPagination } from 'features/slider/pagination'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createCircleSVG, renderArc } from 'features/arcProgress'
import { adaptiveValue } from 'features/adaptive'

void function () {
  const gallerySwiperEl = document.querySelector('.gallery__swiper')
  if (!gallerySwiperEl) return

  createSwiperPagination(
    document.querySelector('.gallery .slider-pagination'),
    initCustomSwiper(
      new Swiper('.gallery__swiper', {
        navigation: {
          nextEl: '.page-viewer__right',
          prevEl: '.page-viewer__left',
        },
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        modules: [ Navigation, Autoplay ],
      }),
    ),
  )
}()

// Hero of project animation
void function () {
  const projectHeader = document.querySelector('.project-header')
  if (!projectHeader || matchMedia('(max-width: 1200px)').matches) return

  const animation = gsap.timeline()
    .from('.project-header__image img', {
      duration: 5,
      scale: 1.4,
    }, 0)
    .textAppearing('.project-header__title', {}, 0)
    .fadeUp('.project-header__actions', { yPercent: 120 }, '<0.4')
    .fadeUp('.project-header__list__item', {}, '<0.4')
    .from('.project-header__list', {
      duration: 1.5,
      '--before-width': '0%',
    }, '<0.4')

  gsap.utils.toArray('.project-header__list__item').forEach(item => {
    animation.from(item as HTMLElement, {
      '--after-height': '0%',
    }, '<0.15')
  })
}()

// .idea animations
void function () {
  const aboutProject = document.querySelector('.idea')
  if (!aboutProject || matchMedia('(max-width: 1200px)').matches) return

  const animation = gsap.timeline()
    .fadeUp('.idea .title', { yPercent: 140 }, 0)
    .textAppearing('.idea__title', {
      duration: 1,
      alternate: true,
    }, 0)
    .fade('.idea__middle', {}, '<0.7')
    .fade('.idea__left', {}, '<0.7')

  new ScrollTrigger({
    scroller: '[data-scroll-container]',
    animation,
    trigger: aboutProject,
    start: 'top+=20% bottom',
  })

  const parallax = gsap.timeline()
    .to('.idea__middle', { yPercent: 10 }, 0)
    .to('.idea__left', { yPercent: 6 }, 0)

  const fadeUp = gsap.timeline()
    .pause()
    .textAppearing('.quote__title', {
      duration: 1,
      alternate: true,
    }, 0)
    .fadeUp('.quote__quotation', { yPercent: 150 }, 0)

  new ScrollTrigger({
    animation: parallax,
    scroller: '[data-scroll-container]',
    trigger: aboutProject,
    scrub: 1.8,
    start: 'center center',
    end: '+=800 top',
    onUpdate(scroll) {
      if (scroll.progress >= 0.35) fadeUp.resume()
    },
  })

  const listAnimation = gsap.timeline()
    .fadeUp('.idea__list__item :is(span, p)', { yPercent: 150 }, 0)
    .from('.idea__list__item', {
      duration: 1.2,
      '--after-width': '0%',
    }, '<0.4')

  new ScrollTrigger({
    animation: listAnimation,
    scroller: '[data-scroll-container]',
    trigger: '.idea__list',
    start: 'top center',
  })
}()

// Gallery animations
void function () {
  const gallery = document.querySelector('.gallery')
  if (!gallery || matchMedia('(max-width: 1200px)').matches) return

  const animation = gsap.timeline()
    .fadeUp('.gallery .title', { yPercent: 150 }, 0)
    .fadeUp('.gallery .slider-pagination', {}, 0)

  new ScrollTrigger({
    scroller: '[data-scroll-container]',
    animation,
    trigger: gallery,
    start: 'top+=30% center',
  })
}()

// Location animation
void function () {
  const location = document.querySelectorAll('.location')
  if (!location || matchMedia('(max-width: 1200px)').matches) return

  const animation = gsap.timeline()
    .fadeUp('.location .title', { yPercent: 150 }, 0)
    .textAppearing('.location__title > span:first-child', {}, 0)
    .fade('.location .map', { duration: 1 }, '<0.4')

  new ScrollTrigger({
    scroller: '[data-scroll-container]',
    animation,
    trigger: location,
    start: 'top+=20% bottom',
  })

  const benefitsFadeUp = gsap.timeline().fadeUp('.location .benefits', {})

  new ScrollTrigger({
    scroller: '[data-scroll-container]',
    animation: benefitsFadeUp,
    trigger: '.location .benefits',
    start: 'center bottom',
  })
}()

// Building summary animations
void function () {
  const summary = document.querySelector('.building-summary')
  if (!summary || matchMedia('(max-width: 1200px)').matches) return

  const animation = gsap.timeline()
    .fadeUp('.building-summary .title:not(.docs .title)', { yPercent: 150 }, 0)
    .textAppearing('.building-summary__title', {
      duration: 1,
      alternate: true,
    }, 0)

  new ScrollTrigger({
    scroller: '[data-scroll-container]',
    animation,
    trigger: summary,
    start: 'top+=20% bottom',
  })

  function startBuildingProgress() {
    const el = summary!.querySelector<HTMLElement>('.building-summary__progress p')
    const num = parseInt(String(el?.textContent))
    if (!num || !el) return

    const svg = createCircleSVG('building-summary__svg-progress')
    summary!.querySelector('.building-summary__progress-indicator')?.append(svg.svg)
    renderArc(svg.path, 0, adaptiveValue(120))

    let iterator = 0
    el.innerText = '0%'

    const interval = setInterval(() => {
      ++iterator
      el.innerText = `${iterator}%`
      renderArc(svg.path, 360 * (iterator / 100), adaptiveValue(120))

      if (iterator >= num) clearInterval(interval)
    }, 35)
  }

  const animationCenter = gsap.timeline()
    .fade('.building-summary__gallery', {
      onStart: startBuildingProgress
    }, '<0.4')
    .fadeUp('.building-summary__status', {}, '<0.4')
    .fadeUp('.building-summary__month-list__item :is(span, img)', { yPercent: 150 }, '<0')
    .from('.building-summary__month-list__item', { '--after-width': '0%' }, '<0.4')


  new ScrollTrigger({
    scroller: '[data-scroll-container]',
    animation: animationCenter,
    trigger: '.building-summary__title',
    start: 'center+=5% center',
  })
}()

// Docs animations
void function() {
  const docs = document.querySelector('.docs')
  if (!docs || matchMedia('(max-width: 1200px)').matches) return

  const animation = gsap.timeline()
    .fadeUp('.docs .title', { yPercent: 150 })

  const cards: {
    [index: string]: Element[]
  } = {}

  document.querySelectorAll<HTMLElement>('.docs__item').forEach(card => {
    card.offsetTop in cards ? cards[card.offsetTop].push(card) : cards[card.offsetTop] = [card]
  })

  Object.values(cards).forEach((line, lineNum) => {
    line.forEach((card, cardIndex) => {
      animation.fadeUp(card, {}, cardIndex === 0 ? `<${lineNum * 0.5}` : '<0')
    })
  })

  new ScrollTrigger({
    scroller: '[data-scroll-container]',
    animation,
    trigger: docs,
    start: 'top+=30% center',
  })
}()

new Swiper('.gallery-popup__swiper', {
  navigation: {
    nextEl: '.gallery-popup__right',
    prevEl: '.gallery-popup__left',
  },

  modules: [ Navigation, Autoplay ],
})

new Swiper('.gallery-popup__mobile-swiper', {})