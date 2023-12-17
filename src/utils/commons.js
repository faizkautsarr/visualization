export function generateColors(n) {
  var colors = [];
  const uniqueBrightColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(255, 0, 0, 0.5)",
    "rgba(0, 255, 0, 0.5)",
    "rgba(0, 0, 255, 0.5)",
    "rgba(255, 255, 0, 0.5)",
    "rgba(255, 0, 255, 0.5)",
    "rgba(0, 255, 255, 0.5)",
    "rgba(128, 0, 0, 0.5)",
    "rgba(0, 128, 0, 0.5)",
    "rgba(0, 0, 128, 0.5)",
    "rgba(128, 128, 128, 0.5)",
  ];
  for (let i = 0; i < n; i++) {
    // Generate a random color in hexadecimal format
    const c = uniqueBrightColors[i];
    colors.push(c);
  }

  return colors;
}
