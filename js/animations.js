function movingAnimation(a, direction, quantity, pos) {
  let moved = 0;
  let lastTime = null;

  a.style.position = "relative";

  function step(currentTime) {
    if (!lastTime) lastTime = currentTime;

    const delta = currentTime - lastTime;
    const speed = 1;

    const move = delta * speed;
    moved += move;
    pos += move;

    if (pos >= quantity) return;

    switch (direction) {
      case "left":
        a.style.left = `${pos}px`;
        break;
      case "right":
        a.style.right = `${pos}px`;
        break;
      case "top":
        a.style.top = `${pos}px`;
        break;
      case "bottom":
        a.style.bottom = `${pos}px`;
        break;
    }

    lastTime = currentTime;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
