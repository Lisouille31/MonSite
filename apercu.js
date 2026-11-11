const desktopDevice = document.querySelector("#desktop-device");
const phoneDevice = document.querySelector("#phone-device");
const desktopFrame = document.querySelector("#desktop-frame");
const mobileFrame = document.querySelector("#mobile-frame");
const desktopPreset = document.querySelector("#desktop-preset");
const mobilePreset = document.querySelector("#mobile-preset");
const desktopZoom = document.querySelector("#desktop-zoom");
const desktopSize = document.querySelector("#desktop-size");
const mobileSize = document.querySelector("#mobile-size");
const rotateButton = document.querySelector("#rotate-button");
const reloadButton = document.querySelector("#reload-button");
const pageSelect = document.querySelector("#page-select");

let mobileRotated = false;

const parseSize = (value) => value.split("x").map(Number);

const updateDesktop = () => {
  const [width, height] = parseSize(desktopPreset.value);
  const zoom = Number(desktopZoom.value);

  desktopDevice.style.width = `${width + 30}px`;
  desktopDevice.style.height = `${height + 36}px`;
  desktopDevice.style.transform = `scale(${zoom})`;
  desktopDevice.parentElement.style.height = `${(height + 36) * zoom + 100}px`;
  desktopSize.textContent = `${width} × ${height} px`;
};

const fitMobileToPanel = (width, height) => {
  const availableWidth = Math.max(phoneDevice.parentElement.clientWidth - 48, 280);
  const scale = Math.min(1, availableWidth / (width + 22));

  phoneDevice.style.transform = `scale(${scale})`;
  phoneDevice.style.transformOrigin = "top center";
  phoneDevice.parentElement.style.height = `${height * scale + 130}px`;
};

const updateMobile = () => {
  let [width, height] = parseSize(mobilePreset.value);

  if (mobileRotated) [width, height] = [height, width];

  phoneDevice.style.width = `${width + 22}px`;
  phoneDevice.style.height = `${height + 58}px`;
  mobileSize.textContent = `${width} × ${height} px`;
  fitMobileToPanel(width, height);
};

const reloadPreviews = () => {
  const page = pageSelect.value;
  const cacheBuster = `preview=${Date.now()}`;
  desktopFrame.src = `${page}?${cacheBuster}`;
  mobileFrame.src = `${page}?${cacheBuster}`;

  reloadButton.firstElementChild.animate(
    [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }],
    { duration: 450, easing: "ease-out" },
  );
};

desktopPreset.addEventListener("change", updateDesktop);
desktopZoom.addEventListener("change", updateDesktop);
mobilePreset.addEventListener("change", () => {
  mobileRotated = false;
  updateMobile();
});

rotateButton.addEventListener("click", () => {
  mobileRotated = !mobileRotated;
  updateMobile();
});

reloadButton.addEventListener("click", reloadPreviews);
pageSelect.addEventListener("change", reloadPreviews);
window.addEventListener("resize", updateMobile);

updateDesktop();
updateMobile();
