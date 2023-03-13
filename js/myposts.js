import { getPost, logoutListner, sessionCheck } from "./index.js";
let userId = localStorage.getItem("user-id");
const getBlogs = async () => {
    const res = await fetch(`http://localhost:3000/blog/?userId=${userId}`);
    return await res.json();
};
const displayBlog = (blogs) => {
    const blogPosts = document.querySelector("#blog-posts");
    const posts = blogs.map((blog) => getPost(blog, 85)).join("");
    blogPosts.innerHTML = posts;
    logoutListner();
};
export const startFunMyPost = async () => {
    sessionCheck();
    const blogs = await getBlogs();
    displayBlog(blogs);
};
