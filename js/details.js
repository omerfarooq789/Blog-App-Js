import { getPost, logoutListner, sessionCheck } from "./index.js";
const getBlogs = async (session) => {
    const res = await fetch(`http://localhost:3000/blog/${session}`);
    return await res.json();
};
const displayBlog = (blog) => {
    const blogPosts = document.querySelector("#blog-posts");
    blogPosts.innerHTML = getPost(blog);
    changebtn();
    logoutListner();
};
const changebtn = () => {
    const colChange = document.querySelector("#col-change");
    const btnChange = document.querySelector(".read-more");
    btnChange.classList.remove("float-end");
    btnChange.innerHTML = "Edit";
    colChange.className = "col text-center";
};
export const startFunDetails = async (session) => {
    sessionCheck();
    const blog = await getBlogs(session);
    displayBlog(blog);
};
