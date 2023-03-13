import { getUsers } from "./index.js";
const pattern = {
    name: /^[A-Za-z]{3,}$/,
    email: /^([a-z\d\.-_]+)@(?!(?:gmail|hotmail|yahoo)\.com)([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    pswd: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
};
const inputs = document.querySelectorAll("#signUpForm input");
inputs.forEach((input) => {
    input.addEventListener("keyup", async () => {
        const invalidMsg = input.parentNode?.children[2];
        const name = input.name;
        const regex = pattern[name];
        if (input.id === "cpswd") {
            const pswd = document.querySelector("#spswd");
            if (input.value === pswd.value) {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            }
            else {
                input.classList.add("is-invalid");
                invalidMsg.innerHTML = "Password Doesnot Match";
            }
        }
        else if (regex.test(input.value)) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        else {
            if (input.classList.contains("is-valid")) {
                input.classList.remove("is-valid");
            }
            input.classList.add("is-invalid");
            if (input.id === "semail") {
                const reg = /(?<=[@])(gmail|hotmail|yahoo)(?=[\.(com)])/;
                if (input.value.length === 0) {
                    invalidMsg.innerHTML = "Please Enter your Email (example@domain.com)";
                }
                else if (reg.test(input.value)) {
                    invalidMsg.innerHTML = `Gmail/Hotmail/Yahoo are not allowed`;
                }
                else {
                    invalidMsg.innerHTML = ".com cannot contain numbers";
                }
            }
            else if (input.name === "name") {
                const reg = /\d/;
                if (reg.test(input.value)) {
                    invalidMsg.innerHTML = `Name Shouldn't have numbers`;
                }
                else if (input.value.length !== 0) {
                    invalidMsg.innerHTML = `${input.id} Must be 3 characters long`;
                }
                else {
                    invalidMsg.innerHTML = `Please Enter your ${input.id}`;
                }
            }
            else if (input.id === "spswd") {
                const regone = /[A-Z]+/;
                const regtwo = /\d+/;
                const regthree = /[!@#$%^&*]+/;
                if (regone.test(input.value) === false) {
                    invalidMsg.innerHTML = "Password Must Contain one Capital Letter";
                }
                else if (regtwo.test(input.value) === false) {
                    invalidMsg.innerHTML = "Password Must Contain one Number";
                }
                else if (regthree.test(input.value) === false) {
                    invalidMsg.innerHTML = "Password Must Contain one Special Character";
                }
                else if (input.value.length < 8 || input.value.length > 15) {
                    invalidMsg.innerHTML = "Password Must be between 8-15 character long";
                }
            }
        }
    });
});
const signupBtn = document.querySelector("#signupbtn");
signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    const hiddenForm = document.querySelector("#hidden-form");
    const emailForm = document.querySelector("#email-form");
    const email = document.querySelector("#semail");
    if (target.innerHTML.trim() === "Next") {
        const invalidMsg = email.parentNode?.children[2];
        if (email.classList.contains("is-valid")) {
            const term = `?q=${email.value}`;
            const users = await getUsers(term);
            if (users.length !== 0) {
                if (email.classList.contains("is-valid")) {
                    email.classList.remove("is-valid");
                }
                email.classList.add("is-invalid");
                invalidMsg.innerHTML = "Email Already Exist Try a Different Email";
            }
            else {
                email.classList.remove("is-invalid");
                email.classList.add("is-valid");
                emailForm.style.display = "none";
                hiddenForm.style.display = "block";
                signupBtn.innerHTML = "Sign Up";
            }
        }
    }
    else {
        const inputArr = Array.from(inputs);
        const checkValidity = inputArr.every((item) => {
            return item.classList.contains("is-valid");
        });
        if (checkValidity) {
            const fname = document.querySelector("#first-name");
            const lname = document.querySelector("#last-name");
            const passFirst = document.querySelector("#spswd");
            const newUser = {
                fname: fname.value,
                lname: lname.value,
                email: email.value,
                pass: passFirst.value,
            };
            console.log(newUser);
            const latestUser = await postUsers(newUser);
            console.log(latestUser.id);
            localStorage.setItem("user-id", latestUser.id.toString());
            window.location.replace("/");
        }
    }
});
const postUsers = async (newUser) => {
    const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
    });
    return await res.json();
};
