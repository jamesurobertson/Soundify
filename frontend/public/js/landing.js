document.addEventListener("DOMContentLoaded", (e) => {
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
