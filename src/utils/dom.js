export const checkForScroll = (containerId, element) => {
  const container = document.getElementById(containerId)
  var elementRect = element.getBoundingClientRect();
  var containerRect = container.getBoundingClientRect();
  var containerTop = containerRect.top;
  var containerBottom = containerRect.bottom;

  return (
    elementRect.top >= containerTop &&
    elementRect.bottom <= containerBottom
  );
}

export const scrollElement = (containerId, element) => {
  const container = document.getElementById(containerId)
  var elementRect = element.getBoundingClientRect();
  var containerRect = container.getBoundingClientRect();
  var containerTop = containerRect.top;
  var containerBottom = containerRect.bottom;

  if (elementRect.top < containerTop) {
    // Element is above the container's view, scroll up
    container.scrollTop = container.scrollTop + (elementRect.top - containerTop) - 100;
  } else if (elementRect.bottom > containerBottom) {
    // Element is below the container's view, scroll down
    container.scrollTop = container.scrollTop + (elementRect.bottom - containerBottom) + 100;
  }
}