(function ($, Drupal, drupalSettings) {

  // list of URL parameters to capture if they exist in the URL
  const utmParams = drupalSettings.ubc_apsc_campaign_tracking_webform_composite.vars;

  // Function to process UTM parameters from the URL into a cookie
  function captureUtmVars(utmParams) {

    const urlParams = new URLSearchParams(window.location.search);

    utmParams.forEach(param => {

      const value = urlParams.get(param);
      const storageKey = 'act_' + param;

      // Set values in local storage
      if (param == 'document_referrer' && !getLocalStorageItem(storageKey)) {
        // set referrer value if not already available and different from current host
        let referrer = document.referrer;
        let currentHost = window.location.hostname;
        if (referrer) {
          // Parse the referrer URL
          let referrerHost = new URL(referrer).hostname;

          // Check if the referrer domain is different from the current host
          if (referrerHost !== currentHost) {
            setLocalStorageItem(storageKey, referrer);
          }
        }
      }
      else if(value) {
        setLocalStorageItem(storageKey, value);
      }
    });
  }

  // Function to retrieve the local storage variable value
  function getLocalStorageItem(name) {
    const item = localStorage.getItem(name);
    if (!item) return null;

    return JSON.parse(item);
  }

  // Function to store the variable in local storage
  function setLocalStorageItem(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  // Function to clear cookies
  function clearLocalStorageItem() {
    utmParams.forEach(param => {
      localStorage.removeItem('act_' + param);
    });
  };

  // check if cookiebot consent is defined, else consent implied
  $(function () {
      captureUtmVars(utmParams);
    });
	
  // check if cookiebot loaded and appropriate consent given
  window.addEventListener(
    "CookiebotOnLoad",
    function (e) {
      var cookieConsent = window.Cookiebot.consent;
      if (typeof cookieConsent !== 'undefined' && !cookieConsent.marketing) {
		  clearLocalStorageItem();
      }
    }, false);

})(jQuery, Drupal, drupalSettings);