const logoutBtn = document.querySelector("#signOut-btn");
const loginBtn = document.querySelector("#signIn-btn");
const signUpBtn = document.querySelector("#signUp-btn");
export const getPost = ({ id, title, body }, limit = body.length) => {
    const description = body.slice(0, limit);
    return `<div class="col-10 col-lg-3" id="col-change">
    <div class="card  h-100">
    <img class="card-img-top" src="https://picsum.photos/300/200?random=${id}" height="200"  alt="Card image cap"/>
    <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">
    ${description}
    </p>
    <a type="button" class="btn btn-primary float-end read-more" onclick="route()" id="${id}" href="/Read_More">Read More</a>
    </div>
    </div>
    </div>`;
};
export const logoutListner = () => {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user-id");
        window.location.replace("/");
    });
};
export const myPosts = () => {
    const myposts = document.querySelector("#my-posts");
    myposts.addEventListener("click", () => {
        const session = localStorage.getItem("user-id");
        window.location.replace(`./myposts.html?id=${session}`);
    });
};
// export const readMore = () => {
//   const readmore = document.querySelectorAll<HTMLButtonElement>(".read-more");
//   readmore.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const btnId = btn.id;
//       const session = localStorage.getItem("user-id");
//       if (session) {
//         window.location.replace(`./details.html?id=${btnId}`);
//       } else {
//         loginBtn.click();
//       }
//     });
//   });
// };
export const sessionCheck = () => {
    const session = localStorage.getItem("user-id");
    if (session) {
        const navList = document.querySelector("#nav-hidden");
        signUpBtn.style.display = "none";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        navList.style.display = "flex";
    }
};
