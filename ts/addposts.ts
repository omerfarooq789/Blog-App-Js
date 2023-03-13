import { logoutListner, sessionCheck } from "./index.js";

type NewBlogType = {
  title: string;
  body: string;
  userId: number;
};

const postBlog = async (newBlog: NewBlogType): Promise<void> => {
  await fetch("http://localhost:3000/blog", {
    method: "POST",
    body: JSON.stringify(newBlog),
    headers: { "Content-Type": "application/json" },
  });
};

const submitBlog = () => {
  const submitPost = document.querySelector(
    "#submit-post"
  ) as HTMLButtonElement;
  submitPost.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const title = document.querySelector("#title") as HTMLInputElement;
    const body = document.querySelector("#blog-body") as HTMLTextAreaElement;
    if (title.value === "" || body.value === "") {
      title.classList.add("is-invalid");
      body.classList.add("is-invalid");
    } else {
      const session = localStorage.getItem("user-id");
      const newBlog: NewBlogType = {
        title: title.value,
        body: body.value,
        userId: Number(session),
      };
      await postBlog(newBlog);
      window.location.replace("/");
    }
  });
};

export const startFunAdd = async (): Promise<void> => {
  sessionCheck();
  submitBlog();
  logoutListner();
};
