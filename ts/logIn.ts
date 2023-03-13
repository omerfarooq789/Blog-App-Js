export type UserType = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  pass: string;
};

const pswd = document.querySelector("#pswd") as HTMLInputElement;
const email = document.querySelector("#email") as HTMLInputElement;

export const getUsers = async (term: string): Promise<UserType[]> => {
  const res: Response = await fetch("http://localhost:3000/users" + term);
  const users: UserType[] = await res.json();
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

const signInBtn = document.querySelector("#signIn-bbtn") as HTMLButtonElement;
signInBtn.addEventListener("click", async (e): Promise<void> => {
  e.preventDefault();
  e.stopPropagation();

  const term: string = `?q=${email.value.trim()}`;
  const users = await getUsers(term);
  const aaa = loginCheck(users);
  inputChange();
  if (aaa === "horray") {
    localStorage.setItem("user-id", users[0].id.toString());
    window.location.replace("/");
  }
});

const loginCheck = (users: UserType[]) => {
  const invalidMsg = pswd.parentNode?.children[2] as HTMLDivElement;

  if (
    email.value.length === 0 ||
    users.length === 0 ||
    pswd.value.length === 0 ||
    users[0].pass !== pswd.value
  ) {
    email.classList.add("is-invalid");
    pswd.classList.add("is-invalid");
    invalidMsg.innerHTML = "Email or Password is Incorrect";
  } else {
    return "horray";
  }
};
