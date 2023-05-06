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

// const likeOptions = async () => {
//   let body = `{"user_id": "1", "post_id": "3"}`
//   await getFetchOptions(body)
// }
const getLikes = async (id) => {
  let likeAmount = await handleFetch(`api/posts/${id}/likes/`);
  return likeAmount[0]["like_count"];
}
const addPost = async (user_id, img_url,caption) =>{
  const body = {
    user_id,
    img_url,
    caption,
  };
  // let body = "{`user_id`:" + user["id"] +  ",`post_id`:" +  post.id + `}`;
  let posts = await handleFetch(`api/posts`, getFetchOptions(body))
  return posts;
}
const getUser = async () => {
  let user = await fetchLoggedInUser();
  return user;
}

let postForm = document.querySelector("#signup");
postForm.addEventListener("submit", async (e)=>{
  e.preventDefault();
  let user = await getUser();
  console.log(e.target[1].value)
  await addPost(user,e.target[0].value, e.target[1].value)
  console.log(await addPost(user["id"],e.target[0].value, e.target[1].value))
})
addEventListener("DOMContentLoaded", async (event) => {
  let posts = await getPosts();
  for(let post of posts){
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
    const getLiked = async (user_id,post_id) => {
      let likeTable = await handleFetch(`api/users/${user_id}/posts/${post_id}/likes`);
      return likeTable;
    }
    let likesData =  await getLiked(user["id"], post.id);
    console.log("hello",likesData)
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
    if(likesData[0] === false){
      footerLike.innerText = 'Unlike';
    } else {
      footerLike.innerText = 'Like';
    }
    // footerLike.href = '';
    footerLike.setAttribute("id", `likes-${post.id}`)
    footerEdit.classList.add('card-footer-item');
    footerEdit.innerText = 'Edit';
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
    footer.append(footerEdit);
    footer.append(footerDelete);
    postDiv.append(cardDiv);

    const removeLikes = async (user_id, post_id) => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log(`api/users/${user_id}/posts/${post_id}/likes`)
      let removed = await handleFetch(`api/users/${user_id}/posts/${post_id}/likes`,options)
      return removed;
      }

    let likesButton = document.querySelector(`#likes-${post.id}`)
    likesButton.addEventListener("click", async (e)=>{
        if(footerLike.innerText === "Like"){
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
    footerDelete.addEventListener("click", async (e)=>{
    await removePosts(post.id)

    })
    //create post
  }
});


let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navDiv").style.top = "0";
  } else {
    document.getElementById("navDiv").style.top = "-175px";
  }
  prevScrollpos = currentScrollPos;
}

main()
getPosts();
