(function ($, Drupal, drupalSetting) {
  Drupal.behaviors.populateForm = {
    attach: function (context, settings) {

      const utmParams = drupalSettings.ubc_apsc_campaign_tracking_webform_composite.vars;

      // Function to get cookie value
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

      // clear cookies
      function clearCampaignTrackingCookies() {
        utmParams.forEach(param => {
          document.cookie = `${'act_' + param}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
      };

      // Populate hidden fields with UTM data when the form is loaded
      $(function () {
        const parentElement = document.querySelector('.js-form-ubc-apsc-campaign-tracking-webform-composite');
        if (parentElement) {
          utmParams.forEach(param => {
            const inputElements = parentElement.querySelectorAll(`input[name*="[${'act_' + param}]"]`);
            inputElements.forEach(inputElement => {
              if (inputElement) {
                const cookieValue = getCookie('act_' + param);
                if (cookieValue !== undefined)
                  inputElement.value = cookieValue;
              }
            });
          });
        }

        $('#' + drupalSettings.ubc_apsc_campaign_tracking_webform_composite.act_form).submit(function (e) {
          // Clear cookies when the form is submitted
          clearCampaignTrackingCookies();
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);