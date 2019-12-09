const log = require("logToConsole");
const getUrl = require("getUrl");
const getCookieValues = require("getCookieValues");
const addEventCallback = require("addEventCallback");
const encodeUriComponent = require("encodeUriComponent");
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
  const pageUrl = getUrl("path");
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

    const events = [];
    const messages = [];
    for (let key in errorsByCount) {
      events.push(errorsByCount[key].eventName);
      messages.push(errorsByCount[key].message);
    }

    let url =
      "https://product-registration.digitalsubstrate.com?ctid=" +
      containerId +
      "&page_url=" +
      encodeUriComponent(pageUrl) +
      "&event_name=" +
      events.join(",") +
      "&errors=" +
      encodeUriComponent(messages.join(","));

    log("url =", url);

    // and we are not in debug/preview mode
    if (getCookieValues("gtm_debug") === undefined) {
      sendPixel(url);
    }
  }
});

data.gtmOnSuccess();
