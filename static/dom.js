//import style from './less/App.less';
const sideEffectNode = document.createElement('div');
sideEffectNode.textContent = 'Lorem Ipsum1';
document.body.appendChild(sideEffectNode);
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(()=> {
    sideEffectNode.parentNode.removeChild(sideEffectNode);
  });
}
