import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  const pictureRows = rows.filter((row) => row.querySelector('picture'));
  const contentRow = rows.find(
    (row) => !row.querySelector('picture') && row.textContent.trim(),
  );

  // Keep one image only, so phones never download the desktop image
  const isDesktop = window.matchMedia('(width >= 900px)').matches;
  const keep = isDesktop ? pictureRows[0] : (pictureRows[1] || pictureRows[0]);

  const children = [];

  if (keep) {
    const bg = document.createElement('div');
    bg.className = 'banner-image';
    moveInstrumentation(keep, bg);
    bg.append(keep.querySelector('picture'));
    children.push(bg);
  }

  if (contentRow) {
    const cell = contentRow.firstElementChild;
    const content = document.createElement('div');
    content.className = 'banner-content';
    moveInstrumentation(cell, content);
    content.append(...cell.childNodes);
    children.push(content);
  }

  block.replaceChildren(...children);
}
