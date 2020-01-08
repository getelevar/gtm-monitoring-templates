# Data available in Templates

## Variable Templates

**Template Fields**

Can contain static strings, data from other GTM variables.

*We currently use these fields to provide the validation conditions to the variables e.g. (data layer key, required?, value type, validation conditions). With these user provided values we know what the variable should look like and can add an error if it doesn't match with the conditions set to it.*

**GTM event ID**

The event / trigger ID that triggered the variable. This ID is unique only for the current page the user is on and if the dataLayer is reinitialized this ID will not point to the correct event anymore. You can find this ID in any event in the `dataLayer` with the name `gtm.uniqueEventId`

*We currently get the event name from the dataLayer with this ID and save it in the error object.*


## Tag Templates

**Template Fields**

Same as for variable templates above.

*In the context of tag we use these fields to provide a way to allow using a custom data layer variable name. So if someone instead of using the default name `dataLayer` has named their data layer variable as `secretTrackingEventList` they can set the monitoring template to work with it also.*

**GTM event ID**

Same as for variable templates, but the event that triggered the template.

*For the monitoring template this ID currently points to the "timer" trigger.*

**GTM tag ID**

The ID of the tag

---

## `addEventCallback` Extra data

**Container ID**

The container ID this event was called in

*We currently send this in the pixel to know which container the event came from.*

**Event Data**

Contains a list of tags that were fired on this event also. So if the `timer` trigger triggers 10 different tags, information about them will be listed here also. The following information is included about the tags:

- id of the tag
- status (success, failure, exception, timeout)
- executionTime in ms

*In the current variable monitoring we are not using this data, because the variable monitoring tag is triggered alone by the timer event and there is no other tag data.*

---

## Globally available functions for additional data

Here's a list of all available functions: [https://developers.google.com/tag-manager/templates/api](https://developers.google.com/tag-manager/templates/api). I'll go through the main points here.

**Call functions in window `callInWindow`**

Allows you to call functions from a path off the window object.

**Copy from Data Layer `copyFromDataLayer` and Copy from window `copyFromWindow`**

Returns a the value assigned to the given key/variable.

**Get Cookie Values `getCookieValues`**

Returns the values of all cookies with the given name.

**Get Url and Referrer Url `getUrl`, `getReferrerUrl`**

Parameters can also be accessed.

**Get Page Title `readTitle`**

Returns the page title
