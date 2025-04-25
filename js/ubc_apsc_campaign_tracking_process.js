(function ($, Drupal, drupalSetting) {

  // list of URL parameters to capture if they exist in the URL
  const utmParams = drupalSettings.ubc_apsc_campaign_tracking_webform_composite.vars;

  // Function to retrieve the local storage variable value
  function getLocalStorageItem(name) {
    const item = localStorage.getItem(name);
    if (!item) return null;

    return JSON.parse(item);
  }

  // Function to clear cookies
  function clearLocalStorageItem() {
    utmParams.forEach(param => {
      localStorage.removeItem('act_' + param);
    });
  }

  function populateACTfields() {
    const parentElement = document.querySelector('.js-form-ubc-apsc-campaign-tracking-webform-composite');
    if (parentElement) {
      utmParams.forEach(param => {
        const storageKey = 'act_' + param;
        const inputElements = parentElement.querySelectorAll(`input[name*="[${storageKey}]"]`);
        inputElements.forEach(inputElement => {
          if (inputElement) {
            const localStorageValue = getLocalStorageItem(storageKey);
            if (localStorageValue !== undefined)
              inputElement.value = localStorageValue;
          }
        });
      });
    }
  }

  // Populate hidden fields with UTM data when the form is loaded if marketing consent available
  $(function () {

    populateACTfields();

    $('#' + drupalSettings.ubc_apsc_campaign_tracking_webform_composite.act_form).submit(function (e) {
      // Clear local storage when the form is submitted
      clearLocalStorageItem();
    });
  });

  // check if cookiebot loaded and appropriate consent given
  window.addEventListener(
    "CookiebotOnLoad",
    function (e) {
      var cookieConsent = window.Cookiebot.consent;
      if (typeof cookieConsent !== 'undefined' && !cookieConsent.marketing) {
        clearLocalStorageItem();
      }
      else {
        populateACTfields();
      }
    }, false);

})(jQuery, Drupal, drupalSettings);