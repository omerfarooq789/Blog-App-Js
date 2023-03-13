const loginBtn = document.querySelector("#signIn-btn");
const urlPageTitle = "JS Blog App";
let session = "";
const route = (event = window.event) => {
    event.preventDefault();
    const target = event.target;
    window.history.pushState({}, "", target.href);
    const active = document.querySelector(".active");
    if (active && active.classList.contains("active")) {
        active.classList.remove("active");
    }
    if (target.id === "logo") {
        const home = document.querySelector("#home");
        home.classList.add("active");
    }
    if (target.classList.contains("read-more")) {
        const localSession = localStorage.getItem("user-id");
        if (localSession) {
            session = target.id;
        }
        else {
            loginBtn.click();
            return;
        }
    }
    handleLocation();
};
const routes = {
    404: {
        template: "/templates/404.html",
        title: "404 | " + urlPageTitle,
        description: "Page not found",
        scripts: "",
        id: "",
    },
    "/": {
        template: "/templates/index.html",
        title: "Home | " + urlPageTitle,
        description: "This is the home page",
        scripts: ["./home.js", "./signUp.js", "./logIn.js"],
        id: "home",
    },
    "/Add_Blogs": {
        template: "/templates/addposts.html",
        title: "Add Blogs | " + urlPageTitle,
        description: "This is the Add Blogs page",
        scripts: ["./addposts.js"],
        id: "add-blog",
    },
    "/My_Blogs": {
        template: "/templates/myposts.html",
        title: "My Blogs | " + urlPageTitle,
        description: "This is the My Blogs page",
        scripts: ["./myposts.js"],
        id: "my-blog",
    },
    "/Read_More": {
        template: "/templates/details.html",
        title: "Details | " + urlPageTitle,
        description: "This is the My Details page",
        scripts: ["./details.js"],
        id: "",
    },
};
const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const active = document.querySelector(".active");
    if (active && active.classList.contains("active")) {
        active.classList.remove("active");
    }
    const addActive = document.getElementById(route.id);
    if (addActive) {
        addActive.classList.add("active");
    }
    const html = await fetch(route.template).then((data) => data.text());
    const div = document.getElementById("content");
    div.innerHTML = html;
    route.scripts.forEach(async (script) => {
        const module = await import(script);
        if (module) {
            if (script === "./home.js") {
                module.startFun();
            }
            else if (script === "./addposts.js") {
                module.startFunAdd();
            }
            else if (script === "./myposts.js") {
                module.startFunMyPost();
            }
            else if (script === "./details.js") {
                module.startFunDetails(session);
            }
        }
    });
    document.title = route.title;
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
};
window.onpopstate = handleLocation;
handleLocation();
