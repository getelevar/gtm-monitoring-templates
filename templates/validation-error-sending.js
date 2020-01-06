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
    const errorsByCount = errors.reduce((prev, curr) => {
      if (typeof prev[curr.eventId] === "undefined") {
        prev[curr.eventId] = {
          count: 1,
          eventName: getEventName(curr.eventId, DATA_LAYER),
          message: curr.error.message,
        };
      } else {
        prev[curr.eventId].count += 1;
      }

      return prev;
    }, {});

    for (let key in errorsByCount) {
      let url =
        "https://monitoring.getelevar.com/track.gif?ctid=" +
        containerId +
        "&event_name=" +
        errorsByCount[key].eventName +
        "&error=" +
        errorsByCount[key].message;

      sendPixel(url);
    }
  }
});

data.gtmOnSuccess();
