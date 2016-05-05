document.addEventListener('DOMContentLoaded', function() {
    // Constants
    var ADBLOCK_ENABLED_STATUS = 'You have ad-block enabled';
    var ADBLOCK_DISABLED_STATUS = 'You don\'t have ad-block';
    var ADBLOCK_ENABLED_CLASS = ' yes';
    var ADBLOCK_DISABLED_CLASS = ' no';

    var adBlockWarnElem = document.getElementById('ad-block-warning');
    // Get the temporary element from template
    var adBlockStatus = document.getElementById('ad-block-status-template').innerHTML;
    // Check if ad block is enabled. If so show the warning
    if(isAdBlockEnabled()) {
      statusText = ADBLOCK_ENABLED_STATUS;
      adBlockWarnElem.className += ADBLOCK_ENABLED_CLASS;
    } else {
      statusText = ADBLOCK_DISABLED_STATUS;
      adBlockWarnElem.className += ADBLOCK_DISABLED_CLASS;
    }
    // Change the status text based on the result
    adBlockStatus = adBlockStatus.replace('{{status}}', statusText);
    adBlockWarnElem.innerHTML += adBlockStatus;
    // Show the warning
    adBlockWarnElem.style.display = 'block';
});
// Function to determine whether ad block is enabled or not
function isAdBlockEnabled() {
  // Common classes that will be blocked by ad-blockers
  var BLOCKED_CLASSES = ['ad-0', 'ad-container', 'ad-top', 'contentAd'];
  var BLOCKED_ID = 'ad-container';
  // Creating a fake element that will be blocked by ad blockers
  var fakeAdElem = document.createElement('div');
  var style;
  // Setting the id and other styles for the fake element
  fakeAdElem.id = BLOCKED_ID;
  fakeAdElem.classList = BLOCKED_CLASSES.join(' ');
  fakeAdElem.style.width = '1px';
  fakeAdElem.style.height = '1px';
  fakeAdElem.style.position = 'absolute';
  fakeAdElem.style.left = '-100%';

  // Attaching the element to the body
  document.body.appendChild(fakeAdElem);

  // Getting the computed style for the fake element
  style = window.getComputedStyle(fakeAdElem);

  return (style.display === 'none' || style.visibility === 'hidden') ? true : false;
}