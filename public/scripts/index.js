import {
  fetchLoggedInUser,
  getFetchOptions,
  handleFetch,
  setNav,
} from "./global.js";

const postDiv = document.querySelector('#postDiv');

const redirectToLogin = () => window.location.assign("/login.html"); 

const main = async () => {
  const user = await fetchLoggedInUser();
  if (!user) return redirectToLogin();
  setNav(!!user);
}

const getPosts = async () => {
  let data =  await handleFetch('api/posts');
  return data[0];
}

const getLikes = async (id) => {
  let likeAmount = await handleFetch(`api/posts/${id}/likes/`);
  return likeAmount[0]["like_count"];
}

addEventListener("DOMContentLoaded", async (event) => {
  let posts = await getPosts();
  for(let post of posts){
    let likes = await getLikes(post.id);

    let cardDiv = document.createElement('div');
    let imageDiv = document.createElement('div');
    let cardFigure = document.createElement('figure');
    let image = document.createElement('img')
    let cardContent = document.createElement('div');
    let content = document.createElement('div');
    let pContent = document.createElement('p');
    let footer = document.createElement('footer');
    let footerLike = document.createElement('a');
    let footerEdit = document.createElement('a');
    let footerDelete = document.createElement('a');
    let likeCount = document.createElement('p')
    likeCount.innerText = `Likes: ` + likes;;

    cardDiv.classList.add("card");
    imageDiv.classList.add("card-image");
    cardFigure.classList.add("image");
    cardContent.classList.add("card-content");
    content.classList.add("content");
    footer.classList.add("card-footer");
    image.src = post.img_url;
    pContent.innerText = `${post.username}: ${post.caption}`;
    footerLike.classList.add('card-footer-item');
    footerLike.innerText = 'Like';
    footerLike.href = '#';
    footerEdit.classList.add('card-footer-item');
    footerEdit.innerText = 'Edit';
    footerEdit.href = '#';
    footerDelete.classList.add('card-footer-item');
    footerDelete.innerText = 'Delete';
    footerDelete.href = '#';

    cardDiv.classList.add('my-4');

    cardDiv.append(imageDiv);
    imageDiv.append(cardFigure);
    cardFigure.append(image);
    cardDiv.append(cardContent);
    cardContent.append(content);
    content.append(pContent);
    content.append(likeCount);
    cardDiv.append(footer);
    footer.append(footerLike);
    footer.append(footerEdit);
    footer.append(footerDelete);
    postDiv.append(cardDiv);
  }
});




main()
getPosts();
