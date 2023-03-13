import { BlogType, getPost, logoutListner, sessionCheck } from "./index.js";

let userId = localStorage.getItem("user-id");

const getBlogs = async (): Promise<BlogType[]> => {
  const res: Response = await fetch(
    `http://localhost:3000/blog/?userId=${userId}`
  );
  return await res.json();
};

const displayBlog = (blogs: BlogType[]): void => {
  const blogPosts = document.querySelector("#blog-posts") as HTMLDivElement;
  const posts: string = blogs.map((blog) => getPost(blog, 85)).join("");
  blogPosts.innerHTML = posts;
  logoutListner();
};
export const startFunMyPost = async (): Promise<void> => {
  sessionCheck();
  const blogs: BlogType[] = await getBlogs();
  displayBlog(blogs);
};
