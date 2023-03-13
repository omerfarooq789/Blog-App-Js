import { getPost, logoutListner, sessionCheck } from "./index.js";
export type BlogType = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
let blogList: BlogType[];
const loginBtn = document.querySelector("#signIn-btn") as HTMLButtonElement;
const signUpBtn = document.querySelector("#signUp-btn") as HTMLButtonElement;

const getBlogs = async (): Promise<void> => {
  const res: Response = await fetch("http://localhost:3000/blog");
  const blogs: BlogType[] = await res.json();
  blogList = blogs;
};

const setupListners = () => {
  const altSignUp = document.querySelector("#alt-singUp") as HTMLAnchorElement;
  const altLogin = document.querySelector("#alt-singIn") as HTMLAnchorElement;

  loginBtn.addEventListener("click", () => {
    const inputs =
      document.querySelectorAll<HTMLInputElement>("#signInForm input");
    inputs.forEach((input) => {
      input.value = "";
      if (input.classList.contains("is-invalid")) {
        input.classList.remove("is-invalid");
      }
    });
  });
  signUpBtn.addEventListener("click", () => {
    const inputs =
      document.querySelectorAll<HTMLInputElement>("#signUpForm input");
    const hiddenForm = document.querySelector("#hidden-form") as HTMLDivElement;
    const emailForm = document.querySelector("#email-form") as HTMLDivElement;
    const formBtn = document.querySelector("#signupbtn") as HTMLButtonElement;
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
const displayBlogs = (): void => {
  const blogPosts = document.querySelector("#blog-posts") as HTMLDivElement;
  const posts: string = blogList.map((blog) => getPost(blog, 85)).join("");
  blogPosts.innerHTML = posts;

  setupListners();
};

export const startFun = async (): Promise<void> => {
  sessionCheck();
  await getBlogs();
  displayBlogs();
};
// startFun();
