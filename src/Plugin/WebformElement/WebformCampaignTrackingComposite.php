<?php

namespace Drupal\ubc_apsc_campaign_tracking_webform_composite\Plugin\WebformElement;

use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\Plugin\WebformElement\WebformCompositeBase;
use Drupal\webform\WebformSubmissionInterface;

/**
 * Provides a 'ubc_apsc_campaign_tracking_webform_composite' element.
 *
 * @WebformElement(
 *   id = "ubc_apsc_campaign_tracking_webform_composite",
 *   label = @Translation("UTM Variables"),
 *   description = @Translation("Collection of hidden fields for recording UTM campaigns variables"),
 *   category = @Translation("UTM Variables"),
 *   multiline = TRUE,
 *   composite = TRUE,
 *   states_wrapper = FALSE,
 * )
 *
 * @see \Drupal\webform\Plugin\WebformElement\WebformCompositeBase
 * @see \Drupal\webform\Plugin\WebformElementBase
 * @see \Drupal\webform\Plugin\WebformElementInterface
 * @see \Drupal\webform\Annotation\WebformElement
 */
class WebformCampaignTrackingComposite extends WebformCompositeBase {

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    unset($form['wrapper_attributes']['wrapper_type']['#options']['fieldset']);
    
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  protected function formatHtmlItemValue(array $element, WebformSubmissionInterface $webform_submission, array $options = []) {
      return $this->formatTextItemValue($element, $webform_submission, $options);
  }

  /**
   * {@inheritdoc}
   * 
   */
  protected function formatTextItemValue(array $element, WebformSubmissionInterface $webform_submission, array $options = []) {
    $value = $this->getValue($element, $webform_submission, $options);
    $lines = [];
    $lines[] = ($value['act_utm_source'] ? $value['act_utm_source'] : '') .
      ($value['act_utm_medium'] ? ' ' . $value['act_utm_medium'] : '') .
      ($value['act_utm_term'] ? ' ' . $value['act_utm_term'] : '') .
      ($value['act_utm_content'] ? ' ' . $value['act_utm_content'] : '') .
      ($value['act_utm_campaign'] ? ' ' . $value['act_utm_campaign'] : '') .
      ($value['act_fbclid'] ? ' ' . $value['act_fbclid'] : '') .
      ($value['act_gclid'] ? ' ' . $value['act_gclid'] : '') .
      ($value['act_msclid'] ? ' ' . $value['act_msclid'] : '') .
      ($value['act_document_referrer'] ? ' ' . $value['act_document_referrer'] : '');

    return $lines;
  }

}
