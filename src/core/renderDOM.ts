import Block from './Block';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function renderDOM(block: Block) {
  const root = document.querySelector('#app');
  
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}


