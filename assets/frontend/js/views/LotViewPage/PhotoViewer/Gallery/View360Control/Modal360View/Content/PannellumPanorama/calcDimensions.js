function calcDimensions() {
  const GOLDEN_RATIO = 0.618;
  const RATIO_4X3 = 0.75;

  const { innerHeight, innerWidth } = window;
  const dimensions = {};

  const yOffset = 106; // 14+14(modal margins) + 42(header height) + 18+18(body paddings)
  const height = innerHeight - yOffset;

  const desktopXOffset = 64; // 14+14(modal margins) + 18+18(body paddings)
  const mobileXOffset = 16; // 8+8(body paddings)
  const width = innerWidth - (innerWidth > 768 ? desktopXOffset : mobileXOffset);

  if (height / width <= GOLDEN_RATIO) {
    dimensions.height = height;
    dimensions.width = height / GOLDEN_RATIO;
  } else {
    dimensions.width = width;
    dimensions.height = Math.min(width * RATIO_4X3, height);
  }

  return dimensions;
}

export default calcDimensions;
