import { logoutListner, sessionCheck } from "./index.js";
const postBlog = async (newBlog) => {
    await fetch("http://localhost:3000/blog", {
        method: "POST",
        body: JSON.stringify(newBlog),
        headers: { "Content-Type": "application/json" },
    });
};
const submitBlog = () => {
    const submitPost = document.querySelector("#submit-post");
    submitPost.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const title = document.querySelector("#title");
        const body = document.querySelector("#blog-body");
        if (title.value === "" || body.value === "") {
            title.classList.add("is-invalid");
            body.classList.add("is-invalid");
        }
        else {
            const session = localStorage.getItem("user-id");
            const newBlog = {
                title: title.value,
                body: body.value,
                userId: Number(session),
            };
            await postBlog(newBlog);
            window.location.replace("/");
        }
    });
};
export const startFunAdd = async () => {
    sessionCheck();
    submitBlog();
    logoutListner();
};
