(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.captureUtm = {
    attach: function (context, settings) {

      // Store UTM parameters + clid in cookies if they exist in the URL
      const utmParams = drupalSettings.ubc_apsc_campaign_tracking_webform_composite.vars;

      utmParams.forEach(param => {
        const value = getUTMParameter(param);
        if (value) {
          setCookie('act_' + param, value, 365);
        }
      });

      // Set referrer cookie if not already available and different from local host
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

      // Function to get UTM parameters from the URL
      function getUTMParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
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
    }
  };
})(jQuery, Drupal, drupalSettings);