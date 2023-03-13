import { getPost, logoutListner, sessionCheck } from "./index.js";
let blogList;
const loginBtn = document.querySelector("#signIn-btn");
const signUpBtn = document.querySelector("#signUp-btn");
const getBlogs = async () => {
    const res = await fetch("http://localhost:3000/blog");
    const blogs = await res.json();
    blogList = blogs;
};
const setupListners = () => {
    const altSignUp = document.querySelector("#alt-singUp");
    const altLogin = document.querySelector("#alt-singIn");
    loginBtn.addEventListener("click", () => {
        const inputs = document.querySelectorAll("#signInForm input");
        inputs.forEach((input) => {
            input.value = "";
            if (input.classList.contains("is-invalid")) {
                input.classList.remove("is-invalid");
            }
        });
    });
    signUpBtn.addEventListener("click", () => {
        const inputs = document.querySelectorAll("#signUpForm input");
        const hiddenForm = document.querySelector("#hidden-form");
        const emailForm = document.querySelector("#email-form");
        const formBtn = document.querySelector("#signupbtn");
        emailForm.style.display = "block";
        hiddenForm.style.display = "none";
        formBtn.innerHTML = "Next";
        inputs.forEach((input) => {
            input.value = "";
            if (input.classList.contains("is-valid")) {
                input.classList.remove("is-valid");
            }
            if (input.classList.contains("is-invalid")) {
                input.classList.remove("is-invalid");
            }
        });
    });
    altSignUp.addEventListener("click", () => {
        signUpBtn.click();
    });
    altLogin.addEventListener("click", () => {
        loginBtn.click();
    });
    logoutListner();
};
const displayBlogs = () => {
    const blogPosts = document.querySelector("#blog-posts");
    const posts = blogList.map((blog) => getPost(blog, 85)).join("");
    blogPosts.innerHTML = posts;
    setupListners();
};
export const startFun = async () => {
    sessionCheck();
    await getBlogs();
    displayBlogs();
};
// startFun();
