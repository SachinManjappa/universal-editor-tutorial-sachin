import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [quoteRow, bylineRow, imageRow] = [...block.children];

  const blockquote = document.createElement('blockquote');
  const quoteCell = quoteRow.firstElementChild;
  moveInstrumentation(quoteCell, blockquote);
  blockquote.append(...quoteCell.childNodes);

  const footer = document.createElement('div');
  footer.className = 'quote-author';

  const picture = imageRow?.querySelector('picture');
  if (picture) {
    const imageWrap = document.createElement('div');
    imageWrap.className = 'quote-author-image';
    imageWrap.append(picture);
    footer.append(imageWrap);
  }

  const [nameEl, roleEl] = bylineRow?.querySelectorAll('p') ?? [];
  const info = document.createElement('div');
  info.className = 'quote-author-info';

  if (nameEl) {
    nameEl.className = 'quote-author-name';
    info.append(nameEl);
  }
  if (roleEl?.textContent.trim()) {
    roleEl.className = 'quote-author-role';
    info.append(roleEl);
  }

  footer.append(info);
  block.replaceChildren(blockquote, footer);
}
