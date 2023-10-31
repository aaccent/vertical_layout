import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import 'components/ui/quickFilter'
import 'components/pageBlocks/filter'
import 'components/pageBlocks/map'
import 'components/pageBlocks/blog'
import './sections/hero-index'
import './sections/partners'

void function () {
  const seoBlock = document.querySelector<HTMLElement>('.seo-block')

  if (!seoBlock) return

  const text = seoBlock.querySelector<HTMLElement>('.seo-block__text')
  let seoBlockParagraph = seoBlock.querySelector<HTMLElement>('.seo-block__text p')

  if (!text || !seoBlockParagraph) return

  text.style.height = `${seoBlockParagraph.getBoundingClientRect().height}px`

  window.addEventListener('resize', () => {
    text.style.height = `${seoBlockParagraph!.getBoundingClientRect().height}px`
    seoBlock.classList.remove('seo-block_open')
  })

  const calcSeoBlockTextHeight = (seoBlock: any) => {
    let height = 0
    seoBlock.querySelectorAll('p').forEach((text: HTMLElement) => {
      height += text.getBoundingClientRect().height
    })
    return height
  }


  document.querySelector('.seo-block__expand')?.addEventListener('click', () => {
    if (seoBlock.classList.contains('seo-block_open')) {
      seoBlock.classList.remove('seo-block_open')
      text.style.height = `${seoBlockParagraph!.getBoundingClientRect().height}px`
      return
    }
    const height = calcSeoBlockTextHeight(seoBlock)

    text.style.height = `${height}px`
    seoBlock.classList.add('seo-block_open')
  })
}()


void function () {
  const animation = gsap.timeline()
    .to('.our-projects__middle-image', { y: 50 })
    .to('.our-projects__right', { y: 50 })

  new ScrollTrigger({
    animation, trigger: '.our-projects', start: 'center center', end: '+=500 center', scrub: 2,
  })
}