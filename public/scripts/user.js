/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  logOutHandler,
  updateUsernameHandler,
  setNav,
} from './global.js';

const isAuthError = (err) => (err.status === 401 || err.status === 403);
const redirectToLogin = () => window.location.assign('/login.html');
const renderUsername = (username) => {
  document.querySelector('#username').textContent = username;
};

const main = async () => {
  const user = await fetchLoggedInUser();
  if (!user) return redirectToLogin();

  const logoutForm = document.querySelector('#logout-form');
  const updateUsernameForm = document.querySelector('#username-form');

  logoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    logOutHandler();
  });

  updateUsernameForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const [response, err] = await updateUsernameHandler(event.target);

    if (err) return isAuthError(err) ? redirectToLogin() : alert('Something went wrong');
    renderUsername(response.username);

    event.target.reset();
  });

  updateUsernameForm.dataset.userId = user.id;

  setNav(!!user);
  renderUsername(user.username);
};

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

addEventListener("DOMContentLoaded", async (event) => {
  let posts = await getPosts();
  for (let post of posts) {
    let user = await fetchLoggedInUser();
    if (post.user_id === user["id"]) {
      
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
    pContent.innerText = `@${post.username}: ${post.caption}`;
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
    // footerEdit.href = '/';
    footerDelete.classList.add('card-footer-item');
    footerDelete.innerText = 'Delete';
    footerDelete.href = '/user.html';

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
            pContent.innerText = `@${post.username}: ${e.target[0].value}` 
            e.target[0].value = '';
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

    }
  }
});

main();
