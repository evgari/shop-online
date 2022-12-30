import {startPagination} from './pagination.js';

const getPostsData = async () => {
  const pageParams = new URLSearchParams(location.search);
  const postPage = pageParams.get('page');

  const responce = await fetch(`https://gorest.co.in/public-api/posts?page=
    ${postPage === null ? 1 : postPage}`);
  const result = await responce.json();

  return {
    posts: result.data,
    pagination: result.meta.pagination,
  };
};

const createPostsList = async () => {
  const {posts} = await getPostsData();
  const postsList = document.querySelector('.posts-list');
  let postItem = '';

  for (let i = 0; i < posts.length; i++) {
    postItem += `
      <li class="posts-list__item">
        <article class="post">
          <div class="post__image">
            <img src="img/image-1.png" alt="">
          </div>
          <div class="post__content post-info">
            <h3 class="post-info__title">${posts[i].title}</h3>
            <div class="post-info__date info-text">
              22 октября 2021, 12:45
            </div>
            <div class="post-info__props">
              <span class="info-text post-info__prop">
                <svg class="info-icon">
                  <use href="#eye"></use>
                </svg>
                1.2K
              </span>
              <span class="info-text post-info__prop">
                <svg class="info-icon">
                  <use href="#comment"></use>
                </svg>
                0
              </span>
            </div>
          </div>
          <a href="blog-single.html?id=${posts[i].id}" class="post__link"></a>
        </article>
      </li>
    `;

    postsList.innerHTML = postItem;
  }
};

const createPostPage = async () => {
  const postPage = document.querySelector('.blog-single__content');
  const postPageNav = document
      .querySelector('.breadcrumbs__item:last-child .breadcrumbs__link');
  let postContent = '';

  const pageParams = new URLSearchParams(location.search);
  const postId = pageParams.get('id');

  const responce = await fetch(`https://gorest.co.in/public-api/posts/${postId}`);
  const result = await responce.json();
  const post = result.data;

  postContent = `
    <h2 class="blog-single__title">${post.title}</h2>  
    <p class="blog-single__text">${post.body}</p>
  `;

  postPageNav.textContent = post.title;
  postPage.innerHTML = postContent;
};

const createPostInfo = async () => {
  const autorBlock = document.querySelector('.post-info__author');

  const pageParams = new URLSearchParams(location.search);
  const postId = pageParams.get('id');

  const responce = await fetch(`https://gorest.co.in/public-api/users/${postId}`);
  const result = await responce.json();
  const autor = result.data;

  autorBlock.textContent = autor.name;
};

const init = async () => {
  const postNav = document.querySelector('.pagination');
  const postPage = document.querySelector('.blog-single');
  const {pagination} = await getPostsData();

  if (postNav) {
    startPagination(postNav, pagination.pages, pagination.page, 3);
    createPostsList();
  }

  if (postPage) {
    createPostPage();
    createPostInfo();
  }
};

init();

