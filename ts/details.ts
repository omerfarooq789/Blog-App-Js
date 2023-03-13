import { BlogType, getPost, logoutListner, sessionCheck } from "./index.js";

const getBlogs = async (session: string): Promise<BlogType> => {
  const res: Response = await fetch(`http://localhost:3000/blog/${session}`);
  return await res.json();
};

const displayBlog = (blog: BlogType): void => {
  const blogPosts = document.querySelector("#blog-posts") as HTMLDivElement;
  blogPosts.innerHTML = getPost(blog);
  changebtn();
  logoutListner();
};
const changebtn = () => {
  const colChange = document.querySelector("#col-change") as HTMLDivElement;
  const btnChange = document.querySelector(".read-more") as HTMLDivElement;
  btnChange.classList.remove("float-end");
  btnChange.innerHTML = "Edit";
  colChange.className = "col text-center";
};
export const startFunDetails = async (session: string): Promise<void> => {
  sessionCheck();
  const blog: BlogType = await getBlogs(session);
  displayBlog(blog);
};
