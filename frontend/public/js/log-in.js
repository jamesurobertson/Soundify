document.addEventListener("DOMContentLoaded", () => {
  const logInForm = document.getElementById("log-in-form");

  logInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(logInForm);
    const email = formData.get("email").fill("demo");
    const password = formData.get("password");
    const body = { email, password };
    try {
      const res = await fetch("http://localhost:8080/user/token", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw res;
      }
      const {
        token,
        user: { id },
      } = await res.json();

      // document.querySelector('.header__profile-name')
      //     .innerHTML = `${userName}`

      localStorage.setItem("SOUNDIFY_ACCESS_TOKEN", token);
      localStorage.setItem("SOUNDIFY_CURRENT_USER_ID", id);
      window.location.href = "/#/browse";
    } catch (err) {
      if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorsContainer = document.querySelector(".errors-container");
        let errorsHtml = [
          `
                  <div class="alert alert-danger">
                      Something went wrong. Please try again.
                  </div>
                `,
        ];
        const { errors } = errorJSON;
        if (errors && Array.isArray(errors)) {
          errorsHtml = errors.map(
            (message) => `
                    <div class="alert alert-danger">
                        ${message}
                    </div>
                  `
          );
        }
        errorsContainer.innerHTML = errorsHtml.join("");
      } else {
        alert(
          "Something went wrong. Please check your internet connection and try again!"
        );
      }
    }
  });

  demoButton.addEventListener("click", async (e) => {
    const body = { email: "demo@demo.com", password: "demo" };

    const res = await fetch(`http://localhost:8080/user/token`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("this is an error");
    }
    const {
      token,
      user: { id },
    } = await res.json();
    // storage access_token in localStorage:
    localStorage.setItem("SOUNDIFY_ACCESS_TOKEN", token);
    localStorage.setItem("SOUNDIFY_CURRENT_USER_ID", id);
    // redirect to music player
    window.location.href = "/#/browse";
  });
});
