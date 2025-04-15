(function ($, Drupal, drupalSetting) {
  Drupal.behaviors.populateForm = {
    attach: function (context, settings) {

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
      };

      // Populate hidden fields with UTM data when the form is loaded if marketing consent available
      $(function () {
        if (typeof window.Cookiebot !== 'undefined' && typeof window.Cookiebot.consent !== 'undefined' && !window.Cookiebot.consent.marketing) {
			clearLocalStorageItem();
		}
        else {
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

        $('#' + drupalSettings.ubc_apsc_campaign_tracking_webform_composite.act_form).submit(function (e) {
          // Clear local storage when the form is submitted
          clearLocalStorageItem();
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);