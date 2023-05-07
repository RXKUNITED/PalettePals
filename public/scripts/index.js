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
  let data = await handleFetch('api/posts');
  return data[0];
}

// const likeOptions = async () => {
//   let body = `{"user_id": "1", "post_id": "3"}`
//   await getFetchOptions(body)
// }
const getLikes = async (id) => {
  let likeAmount = await handleFetch(`api/posts/${id}/likes/`);
  return likeAmount[0]["like_count"];
}
const addPost = async (user_id, img_url, caption, username) => {
  const body = {
    user_id,
    img_url,
    caption,
    username
  };
  // let body = "{`user_id`:" + user["id"] +  ",`post_id`:" +  post.id + `}`;
  let posts = await handleFetch(`api/posts`, getFetchOptions(body))
  return posts;
}
const getUser = async () => {
  let user = await fetchLoggedInUser();
  return user;
}

// let postForm = document.querySelector("#signup");
// postForm.addEventListener("submit", async (e)=>{
//   e.preventDefault();
//   let user = await getUser();
//   console.log(e.target[1].value)
//   await addPost(user,e.target[0].value, e.target[1].value)
//   console.log(await addPost(user["id"],e.target[0].value, e.target[1].value))
// })
addEventListener("DOMContentLoaded", async (event) => {
  let posts = await getPosts();
  for (let post of posts) {
    let user = await fetchLoggedInUser();
    // console.log(user["id"])
    let likes = await getLikes(post.id);
    const addLikes = async () => {
      const body = {
        user_id: user["id"],
        post_id: post.id,
      };
      // let body = "{`user_id`:" + user["id"] +  ",`post_id`:" +  post.id + `}`;
      let likes = await handleFetch(`api/likes`, getFetchOptions(body))
      return likes;
    }
    const getLiked = async (user_id, post_id) => {
      let likeTable = await handleFetch(`api/users/${user_id}/posts/${post_id}/likes`);
      return likeTable;
    }
    let likesData = await getLiked(user["id"], post.id);

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
    if (likesData[0] === false) {
      footerLike.innerText = 'Unlike';
    } else {
      footerLike.innerText = 'Like';
    }
    // footerLike.href = '';
    footerLike.setAttribute("id", `likes-${post.id}`)
    footerEdit.classList.add('card-footer-item', 'edit-button');
    footerEdit.setAttribute('data-target', 'edit-modal')
    // footerEdit.href = '#';
    footerDelete.classList.add('card-footer-item');
    footerDelete.innerText = 'Delete';
    footerDelete.href = '/';

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

    if (post.user_id === user["id"]) {
      footerEdit.innerText = 'Edit';
      footerEdit.setAttribute("id", `edit-${post.id}`)
      footer.append(footerEdit);
      footer.append(footerDelete);
      postDiv.append(cardDiv);
      const updatePost = async (caption) => {
        const body = {
          caption,
        };
        const updateOptions = getFetchOptions(body, 'PATCH');
        let updatedPost = await handleFetch(`api/posts/${post.id}`, updateOptions)
        return updatedPost;

      }
      let updateButton = document.querySelector(`#edit-${post.id}`);
      let editModal = document.getElementById('edit-modal');
      updateButton.addEventListener("click", (e) => {
        if (editModal.classList.contains('is-active')) {
          editModal.classList.remove('is-active');
        }
        else {
          editModal.classList.add('is-active')
          let editForm = document.getElementById("editForm");
          editForm.addEventListener("submit", async (e)=>{
            e.preventDefault();
            console.log(post.id)
            await updatePost(e.target[0].value)
            // console.log(await updatePost(post.id, e.target[0].value))
            // console.log(e.target[0].value)
          })
        }
        // updatePost(post.id, caption)

      })
    } else {
      postDiv.append(cardDiv);
    }


    const removeLikes = async (user_id, post_id) => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      let removed = await handleFetch(`api/users/${user_id}/posts/${post_id}/likes`, options)
      return removed;
    }

    let likesButton = document.querySelector(`#likes-${post.id}`)
    likesButton.addEventListener("click", async (e) => {
      if (footerLike.innerText === "Like") {
        await addLikes();
        let newLike = await getLikes(post.id);
        likeCount.innerText = `Likes: ` + newLike;
        footerLike.innerText = "Unlike";
      } else if (footerLike.innerText === "Unlike") {
        await removeLikes(user["id"], post.id);
        let newLike = await getLikes(post.id);
        likeCount.innerText = `Likes: ` + newLike;
        footerLike.innerText = "Like";
      }

    })
    //delete post
    const removePosts = async (id) => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      let removed = await handleFetch(`api/posts/${id}`, options)
      return removed;
    }
    footerDelete.addEventListener("click", async (e) => {
      await removePosts(post.id)

    })

    //create post
  }
});


let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navDiv").style.top = "0";
  } else {
    document.getElementById("navDiv").style.top = "-175px";
  }
  prevScrollpos = currentScrollPos;
}

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .closeModal') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

const imgTextBox = document.getElementById("imgTextBox");
const imgPlaceHolder = document.getElementById("imgPlaceHolder");
const imageCache = new Map();

function isValidUrl(url) {
  const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
  return urlPattern.test(url);
}

function checkImage(url) {
  if (imageCache.has(url)) {
    imgPlaceHolder.src = imageCache.get(url).src;
    return;
  }

  const image = new Image();
  image.onload = function () {
    imgPlaceHolder.src = url;
    imageCache.set(url, image);
  };
  image.onerror = function () {
    console.error("Invalid image URL");
  };
  image.src = url;
}

function debounce(func, wait) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, arguments), wait);
  };
}

const debouncedCheckImage = debounce(checkImage, 500);

imgTextBox.addEventListener("input", function () {
  const imgUrl = imgTextBox.value.trim();
  if (isValidUrl(imgUrl)) {
    debouncedCheckImage(imgUrl);
  } else {
    console.error("Invalid URL format");
  }
});

let imageResets = document.getElementsByClassName('resetImage');
// for(let button of imageResets){
//   button.addEventListener('click', () => {
//       imgPlaceHolder.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
//       imgTextBox.value = '';
//   })
// }

let postForm = document.getElementById('postForm');
postForm.addEventListener('submit', async (e) => {
  let user = await getUser();
  await addPost(user["id"], e.target[0].value, e.target[1].value, user["username"])
  //   console.log(await addPost(user["id"],e.target[0].value, e.target[1].value))
})

// let editButton = document.getElementsByClassName('edit-button');
// for (let button of editButton) {
//   button.addEventListener('click', () => {
    
//   })
// }

main()
getPosts();
