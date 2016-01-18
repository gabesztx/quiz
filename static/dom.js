const sideEffectNode = document.createElement('h3');
sideEffectNode.setAttribute('style', 'background-color: pink; padding: 0; margin: 0');
sideEffectNode.textContent = 'Lorem Impsumr';

document.body.appendChild(sideEffectNode);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(()=> {
    sideEffectNode.parentNode.removeChild(sideEffectNode);
  });
}
