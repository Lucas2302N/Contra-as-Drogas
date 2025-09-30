document.addEventListener('DOMContentLoaded', () => {
  const controls = document.querySelectorAll('.control');
  const gallery = document.querySelector('.gallery');
  const wrapper = document.querySelector('.gallery-wrapper');

  let items = Array.from(document.querySelectorAll('.item1'));
  if (!items.length) return;

  let currentItem1 = 0;
  const maxItems = items.length;

  // lê gap do CSS de forma segura
  function readGap() {
    const style = getComputedStyle(gallery);
    // 'gap' é suportado; fallback 0
    return parseFloat(style.gap || style.columnGap || 0) || 0;
  }

  function updateMeasurements() {
    // re-ler itens (útil se trocar conteúdo dinamicamente)
    items = Array.from(document.querySelectorAll('.item1'));
    const gap = readGap();
    const itemWidth = items[0].getBoundingClientRect().width;
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    return { gap, itemWidth, wrapperWidth };
  }

  function updateCarousel() {
    if (!items.length) return;
    const { gap, itemWidth, wrapperWidth } = updateMeasurements();

    // destaque
    items.forEach(it => it.classList.remove('current-item1'));
    items[currentItem1].classList.add('current-item1');

    // cálculo para centralizar
    const offset = (wrapperWidth - itemWidth) / 2;
    const translateX = -currentItem1 * (itemWidth + gap) + offset;

    gallery.style.transform = `translateX(${translateX}px)`;
  }

  controls.forEach(control => {
    control.addEventListener('click', () => {
      if (control.classList.contains('arrow-left')) {
        currentItem1 = (currentItem1 - 1 + maxItems) % maxItems;
      } else {
        currentItem1 = (currentItem1 + 1) % maxItems;
      }
      updateCarousel();
    });
  });

  // garante centralizar depois que tudo (imagens) carregar
  window.addEventListener('load', updateCarousel);
  window.addEventListener('resize', updateCarousel);

  // tentativa inicial rápida
  updateCarousel();
});