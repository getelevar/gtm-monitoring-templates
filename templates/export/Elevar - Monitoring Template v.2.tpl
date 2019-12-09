___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Elevar - Monitoring Template v.2",
  "brand": {
    "id": "brand_dummy",
    "displayName": ""
  },
  "description": "",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

const log = require('logToConsole');
const getUrl = require('getUrl');
const getCookieValues = require('getCookieValues');
const addEventCallback = require('addEventCallback');
const encodeUriComponent = require('encodeUriComponent');
const copyFromWindow = require('copyFromWindow');
const setInWindow = require('setInWindow');
const sendPixel = require('sendPixel');

const VALIDATION_ERRORS = 'elevar_gtm_errors';

const getEventName = (eventId, dataLayer) => {
  return dataLayer.reduce((item, curr) => {
    if (!item && curr['gtm.uniqueEventId'] === eventId) {
      return curr.event;
    }
    return item;
  }, false);
};

// Fires after all tags for the trigger have completed
addEventCallback(function(containerId, eventData) {
  const DATA_LAYER = copyFromWindow('dataLayer');
  const pageUrl = getUrl('path');
  const errors = copyFromWindow(VALIDATION_ERRORS);

  // This removes the validation errors from window after they have been sent
  setInWindow(VALIDATION_ERRORS, [], true);
  
  // Send Pixel if there are errors
  if (errors.length > 0) {
    const errorsByCount = errors.reduce((prev, curr) => {
      if (typeof prev[curr.eventId] === 'undefined') {
          prev[curr.eventId] = {
            count: 1,
            eventName: getEventName(curr.eventId, DATA_LAYER),
            message: curr.error.message
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

    let url = 'https://product-registration.digitalsubstrate.com?ctid=' + containerId +
      '&page_url=' + encodeUriComponent(pageUrl) +
      '&event_name=' + events.join(',') +
      '&errors=' + encodeUriComponent(messages.join(','));

  	log('url =', url);
    
    // and we are not in debug/preview mode
    if (getCookieValues('gtm_debug') === undefined) {
      sendPixel(url);
    }
  }
});

data.gtmOnSuccess();


___WEB_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "logging",
        "versionId": "1"
      },
      "param": [
        {
          "key": "environments",
          "value": {
            "type": 1,
            "string": "debug"
          }
        }
      ]
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "access_globals",
        "versionId": "1"
      },
      "param": [
        {
          "key": "keys",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "key"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  },
                  {
                    "type": 1,
                    "string": "execute"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "elevar_gtm_errors"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "key"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  },
                  {
                    "type": 1,
                    "string": "execute"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "dataLayer"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
                  },
                  {
                    "type": 8,
                    "boolean": false
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "read_event_metadata",
        "versionId": "1"
      },
      "param": []
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "send_pixel",
        "versionId": "1"
      },
      "param": [
        {
          "key": "urls",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "https://product-registration.digitalsubstrate.com/"
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "get_url",
        "versionId": "1"
      },
      "param": [
        {
          "key": "urlParts",
          "value": {
            "type": 1,
            "string": "any"
          }
        },
        {
          "key": "queriesAllowed",
          "value": {
            "type": 1,
            "string": "any"
          }
        }
      ]
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "get_cookies",
        "versionId": "1"
      },
      "param": [
        {
          "key": "cookieNames",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "gtm_debug"
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 04/12/2019, 13:17:50


