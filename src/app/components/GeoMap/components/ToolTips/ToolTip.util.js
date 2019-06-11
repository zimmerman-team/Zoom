// so this basically will shorten the text and
// add an ellipsis at the end the javascript way
// cause a proper css aproach or library approach
// doesn't work with these geo tooltips of ours
// and we chose 440 cause it looks the nicest with
// max 440 characters in the text
export function truncateText(text) {
  let newText = text;

  if (newText.length > 440) {
    newText = newText.substring(0, 440).concat('...');
  }

  return newText;
}
