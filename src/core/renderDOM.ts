import Block from './Block';
// @ts-ignore
export default function renderDOM(block: Block) {
  const root = document.querySelector('#app');
  
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}


