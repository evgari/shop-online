const createItemPagination = (hrefLink, textContent, active) => {
  const li = document.createElement('li');
  li.className = 'pagination__item';

  const a = document.createElement('a');
  a.className = 'pagination__link';
  a.textContent = textContent;
  a.href = hrefLink;

  if (active) {
    a.classList.add('pagination__link_active');
  }

  li.append(a);

  return li;
};


const pagination = (wrapper, pages, page, count) => {
  wrapper.textContent = '';

  const paginationList = document.createElement('ul');
  paginationList.className = 'pagination__list';

  const isNotStart = page - Math.floor(count / 2) > 1;
  const isEnd = page + Math.floor(count / 2) > pages;

  if (count > pages) {
    count = pages;
  }

  for (let i = 0; i < count; i++) {
    let n = i + 1;

    if (isNotStart) {
      if (isEnd) {
        n = pages - count + i + 1;
      } else {
        n = page - Math.floor(count / 2) + i;
      }
    }

    const url = new URL(location);
    url.searchParams.set('page', n);
    const li = createItemPagination(url, n, page === n);
    paginationList.append(li);
  }

  const firstItem = document.createElement('a');
  firstItem.classList.add('pagination__btn', 'pagination__btn_start');
  firstItem.href = isNotStart ? 'blog.html' : '';

  firstItem.innerHTML = `
    <svg class="pagination-icon">
      <use href="#arrow"></use>
    </svg>
  `;

  const lastItem = document.createElement('a');
  lastItem.classList.add('pagination__btn', 'pagination__btn_end');
  lastItem.href = isEnd ? '' : `blog.html?page=${pages}`;

  lastItem.innerHTML = `
  <svg class="pagination-icon">
    <use href="#arrow"></use>
  </svg>
`;

  wrapper.append(firstItem, paginationList, lastItem);
};

export const startPagination = (paginationWrapper, pages, page, count) => {
  pagination(paginationWrapper, pages, page, count);
};

