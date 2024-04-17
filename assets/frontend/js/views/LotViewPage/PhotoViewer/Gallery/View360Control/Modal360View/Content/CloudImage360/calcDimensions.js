function calcDimensions() {
  const RATIO_4X3 = 0.75;

  const { innerHeight, innerWidth } = window;
  const dimensions = {};

  const yOffset = 106; // 14+14(modal margins) + 42(header height) + 18+18(body paddings)
  const height = innerHeight - yOffset;

  const desktopXOffset = 64; // 14+14(modal margins) + 18+18(body paddings)
  const mobileXOffset = 16; // 8+8(body paddings)
  const width = innerWidth - (innerWidth > 768 ? desktopXOffset : mobileXOffset);

  if (height / width <= RATIO_4X3) {
    dimensions.height = height;
    dimensions.width = height / RATIO_4X3;
  } else {
    dimensions.width = width;
    dimensions.height = width * RATIO_4X3;
  }

  return dimensions;
}

export default calcDimensions;
