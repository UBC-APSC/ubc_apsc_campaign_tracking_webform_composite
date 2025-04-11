(function ($, Drupal, drupalSettings) {

  // list of URL parameters to capture if they exist in the URL
  const utmParams = drupalSettings.ubc_apsc_campaign_tracking_webform_composite.vars;

  // Function to process UTM parameters from the URL into a cookie
  function captureUtmVars(utmParams) {

    const urlParams = new URLSearchParams(window.location.search);

    utmParams.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        setCookie('act_' + param, value, 365);
      }
    });

    // Set referrer cookie if not already available and different from current host
    if (!getCookie('act_' + 'document_referrer')) {
      let referrer = document.referrer;
      let currentHost = window.location.hostname;

      if (referrer) {
        // Parse the referrer URL
        let referrerHost = new URL(referrer).hostname;

        // Check if the referrer domain is different from the current host
        if (referrerHost !== currentHost) {
          setCookie('act_' + 'document_referrer', document.referrer, 365);
        }
      }
    }
  }

  // Function to get cookie value
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Function to set a cookie with an expiration date
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  // Function to clear cookies
  function clearCampaignTrackingCookies() {
    utmParams.forEach(param => {
      document.cookie = `${'act_' + param}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };


  var cookiebotFired = false; // Track whether the CookiebotOnLoad event is fired

  // check if cookiebot loaded and appropriate consent given
  window.addEventListener(
    "CookiebotOnLoad",
    function (e) {
      var cookieConsent = window.Cookiebot.consent;
      if (cookieConsent.marketing) {
        captureUtmVars(utmParams);
      }
      else {
        clearCampaignTrackingCookies();
      }
      cookiebotFired = true;
    }, false);


  // Set a timeout in case CookiebotOnLoad event was not fired
  // check if cookiebot consent is defined, else consent implied
  $(function () {
    setTimeout(function () {
      if (!cookiebotFired) {
        var cookieConsent = window.Cookiebot;
        if (typeof cookieConsent !== 'undefined') {
          if (cookieConsent.marketing) {
            captureUtmVars(utmParams);
          }
          else {
            clearCampaignTrackingCookies();
          }
        }
        else {
          captureUtmVars(utmParams);
        }
      }
    }, 3000);
  });
})(jQuery, Drupal, drupalSettings);