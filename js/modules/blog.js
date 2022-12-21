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

const createPostsNav = async () => {
  const {pagination} = await getPostsData();
  const postsNav = document.querySelector('.pagination__list');
  let postNav = '';

  for (let i = 1; i <= pagination.pages; i++) {
    const pageUrl = i === 1 ? 'blog.html' :
      `blog.html?page=${i}`;

    postNav += `
      <li class="pagination__item">
        <a href="${pageUrl}" class="pagination__link">${i}</a>
      </li>
    `;

    postsNav.innerHTML = postNav;
  }
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
            <img src="img/blogs/image-${Math
      .ceil(Math.random() * 12)}.png" alt="">
          </div>
          <div class="post__content">
            <h3 class="post__title">${posts[i].title}</h3>
            <div class="post__date gray-font">
              19 октября 2021, 10:23
            </div>
            <div class="post__info">
              <div class="post__views gray-font">
                <svg class="eye-icon">
                  <use href="#eye"></use>
                </svg>
                <span>3,6K</span>
              </div>
              <div class="post__comments gray-font">
                <svg class="comment-icon">
                  <use href="#comment"></use>
                </svg>
                <span>0</span>
              </div>
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
  const postPage = document.querySelector('.post-content');
  const postPageNav = document.querySelector('.breadcrumbs__link:last-child');
  let postContent = '';

  const pageParams = new URLSearchParams(location.search);
  const postId = pageParams.get('id');

  const responce = await fetch(`https://gorest.co.in/public-api/posts/${postId}`);
  const result = await responce.json();
  const post = result.data;

  postContent = `
    <h2 class="post-content__title">${post.title}</h2>  
    <p class="post-content__text">${post.body}</p>
  `;

  postPageNav.textContent = post.title;
  postPage.innerHTML = postContent;
};

const createPostInfo = async () => {
  const autorBlock = document.querySelector('.post__autor');

  const pageParams = new URLSearchParams(location.search);
  const postId = pageParams.get('id');

  const responce = await fetch(`https://gorest.co.in/public-api/users/${postId}`);
  const result = await responce.json();
  const autor = result.data;

  autorBlock.textContent = autor.name;
};

const init = async () => {
  const postNav = document.querySelector('.pagination__list');
  const postPage = document.querySelector('.blog-single-container__post');

  if (postNav) {
    createPostsNav();
    createPostsList();
  }

  if (postPage) {
    createPostPage();
    createPostInfo();
  }
};

init();
