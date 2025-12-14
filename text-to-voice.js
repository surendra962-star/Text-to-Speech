const textInput = document.getElementById("textInput");
const speedControl = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const status = document.getElementById("status");
const container = document.getElementById("tts");
const countEl = document.getElementById("count");

let bubbleCount = 0;

/* ================= SPEED ================= */
speedControl.oninput = () => {
  speedValue.innerText = speedControl.value + "x";
};

/* ================= TEXT TO SPEECH ================= */
function speakText() {
  const text = textInput.value.trim();
  if (!text) {
    status.innerText = "Please enter text";
    return;
  }

  responsiveVoice.speak(
    text,
    "US English Female",
    { rate: parseFloat(speedControl.value) }
  );

  status.innerText = "Speaking...";
}

function stopSpeech() {
  responsiveVoice.cancel();
  status.innerText = "Stopped";
}

/* ================= CURSOR MOVE CONTAINER ================= */
document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  container.style.transform =
    `rotateY(${x}deg) rotateX(${y}deg) translateY(-10px)`;
});

/* ================= BUBBLES ================= */
const bubbleArea = document.querySelector(".bubble-area");

function createBubble() {
  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const size = Math.random() * 40 + 20;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  bubble.style.left = Math.random() * 100 + "%";
  bubble.style.top = Math.random() * 100 + "%";

  const moveX = (Math.random() * 400 - 200) + "px";
  const moveY = (Math.random() * -500 - 200) + "px";

  bubble.style.setProperty("--x", moveX);
  bubble.style.setProperty("--y", moveY);
  bubble.style.animationDuration = Math.random() * 6 + 6 + "s";

  bubble.addEventListener("click", () => {
    bubble.classList.add("glow");

    setTimeout(() => {
      bubble.classList.add("pop");
      bubbleCount++;
      countEl.innerText = bubbleCount;
    }, 150);

    setTimeout(() => bubble.remove(), 350);
  });

  bubbleArea.appendChild(bubble);
  setTimeout(() => bubble.remove(), 12000);
}

setInterval(createBubble, 900);
