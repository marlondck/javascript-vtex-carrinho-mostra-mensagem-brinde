window.addEventListener('load', event => {
  function initBrinde() {

    let cartVazio = document.querySelector('.empty-cart-content');
    let valorTotal = document.querySelector('[data-bind="text: totalLabel"]').innerText;
    const cartContainer = document.querySelector('#cartLoadedDiv');
    let paragraph = document.createElement('p');
    paragraph.setAttribute('data-brinde', 'show-brinde');

    const valorBrinde = 130.00;
    let valorFinal = Number(valorTotal.replace('R$ ', '').replace(',', '.'));

    let faltamXparaBrinde = (valorFinal - valorBrinde ).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    const removeParagrafo = () => {
      const paragrafoJaExiste = document.querySelector('[data-brinde="show-brinde"]');
      if(paragrafoJaExiste) {
        paragrafoJaExiste.remove()
      }
    }

    if(cartVazio.style.display === 'block') {
      removeParagrafo()
    }

    const insertParagrafoNoDOM = (message) => {
      paragraph.innerText = message;
      paragraph.style = 'padding: 8px 15px; background-color: #ffd400; display: inline;font-weight: bold;'
      cartContainer.insertAdjacentElement('afterend', paragraph);
    }

 
    if(valorFinal < valorBrinde) {
      removeParagrafo()
      insertParagrafoNoDOM(`Adicione mais ${faltamXparaBrinde.replace('-R', 'R')} em produtos para ganhar um brinde.`)
    }

    if(valorFinal >= valorBrinde) {
      removeParagrafo()
    }

       
  }

  initBrinde()
  
// })

function buscaTotalLabel() {
  let tableCartEvent = document.querySelector('[data-bind="text: totalLabel"]');
  return tableCartEvent
}

// window.addEventListener('DOMContentLoaded', event => {
  if(window.location.pathname === '/checkout') {
    

    if(buscaTotalLabel() != null) {
      let mutationObserverBrinde = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          initBrinde()
        });
      });
      
      mutationObserverBrinde.observe(buscaTotalLabel(), {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
      });
    }
  }
})
