import {
  fetchLoggedInUser,
  getFetchOptions,
  handleFetch,
  setNav,
} from "./global.js";

const redirectToLogin = () => window.location.assign("/login.html"); 

const main = async () => {
  const user = await fetchLoggedInUser();
  if (!user) return redirectToLogin();
  setNav(!!user);
}

const getPosts = async () => {
  // const user = await fetchLoggedInUser()
  // console.log(user.id)
  
  // console.log(posts)
  let data =  await handleFetch('/posts');
  console.log(data)
}

main()
getPosts();
