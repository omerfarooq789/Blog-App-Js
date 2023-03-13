const pswd = document.querySelector("#pswd");
const email = document.querySelector("#email");
export const getUsers = async (term) => {
    const res = await fetch("http://localhost:3000/users" + term);
    const users = await res.json();
    return users;
};
const inputChange = () => {
    email.addEventListener("keydown", changeClass);
    pswd.addEventListener("keydown", changeClass);
};
const changeClass = () => {
    if (email.classList.contains("is-invalid")) {
        email.classList.remove("is-invalid");
    }
    if (pswd.classList.contains("is-invalid")) {
        pswd.classList.remove("is-invalid");
    }
};
const signInBtn = document.querySelector("#signIn-bbtn");
signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const term = `?q=${email.value.trim()}`;
    const users = await getUsers(term);
    const aaa = loginCheck(users);
    inputChange();
    if (aaa === "horray") {
        localStorage.setItem("user-id", users[0].id.toString());
        window.location.replace("/");
    }
});
const loginCheck = (users) => {
    const invalidMsg = pswd.parentNode?.children[2];
    if (email.value.length === 0 ||
        users.length === 0 ||
        pswd.value.length === 0 ||
        users[0].pass !== pswd.value) {
        email.classList.add("is-invalid");
        pswd.classList.add("is-invalid");
        invalidMsg.innerHTML = "Email or Password is Incorrect";
    }
    else {
        return "horray";
    }
};
