const addEventCallback = require("addEventCallback");
const copyFromWindow = require("copyFromWindow");
const setInWindow = require("setInWindow");
const sendPixel = require("sendPixel");

const VALIDATION_ERRORS = "elevar_gtm_errors";

const getEventName = (eventId, dataLayer) => {
  return dataLayer.reduce((item, curr) => {
    if (!item && curr["gtm.uniqueEventId"] === eventId) {
      return curr.event;
    }
    return item;
  }, false);
};

// Fires after all tags for the trigger have completed
addEventCallback(function(containerId, eventData) {
  const DATA_LAYER = copyFromWindow("dataLayer");
  const errors = copyFromWindow(VALIDATION_ERRORS);

  // This removes the validation errors from window after they have been sent
  setInWindow(VALIDATION_ERRORS, [], true);

  // Send Pixel if there are errors
  if (errors.length > 0) {
    errors.forEach((errorEvent, index) => {
      let url =
        "https://monitoring.getelevar.com/track.gif?ctid=" +
        containerId +
        "&idx=" +
        index +
        "&event_name=" +
        getEventName(errorEvent.eventId, DATA_LAYER) +
        "&error=" +
        errorEvent.error.message;

      sendPixel(url);
    });
  }
});

data.gtmOnSuccess();
