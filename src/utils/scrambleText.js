const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

document.querySelector(".hacker-name").onmouseover = (event) => {
  let iterations = 0;

  const interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iterations) {
          return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iterations >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iterations += 1 / 3; // Controls the speed of resolution
  }, 30);
};

// Trigger the effect automatically on page load
window.onload = () => {
  const nameElement = document.querySelector(".hacker-name");
  // Simulate a mouseover event to start the effect
  nameElement.onmouseover({ target: nameElement });
};
