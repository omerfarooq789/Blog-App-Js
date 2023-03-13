const divHead = document.querySelector("#header") as HTMLDivElement;
const head = `
  <nav class="navbar navbar-expand-lg bg-body-secondary" data-bs-theme="dark">
    <div class="container flex-column flex-md-row">
        <a class="navbar-brand" href="/">Blog App</a>
        <ul class="navbar-nav flex-row" id="nav-hidden">
        <li class="nav-item me-1">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item me-1">
            <a class="nav-link" aria-current="page" id="my-posts">My Blogs</a>
        </li>
        <li class="nav-item me-1">
            <a class="nav-link" aria-current="page" id="add-posts">Add Post</a>
        </li>
        </ul>
        <div>
        <button
            class="btn btn-primary me-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#signInModal"
            id="signIn-btn"
        >
            Sign In <i class="fa fa-sign-in" aria-hidden="true"></i>
        </button>
        <button
            class="btn btn-primary me-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#signUpModal"
            id="signUp-btn"
        >
            Sign Up <i class="fa fa-user-plus" aria-hidden="true"></i>
        </button>
        <button class="btn btn-primary" id="signOut-btn" type="button">
            Sign Out
        </button>
        </div>
    </div>
  </nav>`;
divHead.innerHTML = head;
