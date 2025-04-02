<?php

namespace Drupal\ubc_apsc_campaign_tracking_webform_composite\Element;

use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\Element\WebformCompositeBase;

/**
 * Provides a 'ubc_apsc_campaign_tracking_webform_composite'.
 *
 * Webform composites contain a group of sub-elements.
 *
 *
 * IMPORTANT:
 * Webform composite can not contain multiple value elements (i.e. checkboxes)
 * or composites (i.e. webform_address)
 *
 * @FormElement("ubc_apsc_campaign_tracking_webform_composite")
 *
 * @see \Drupal\webform\Element\WebformCompositeBase
 * @see \Drupal\ubc_apsc_campaign_tracking_webform_composite\Element\WebformCampaignTrackingComposite
 */
class WebformCampaignTrackingComposite extends WebformCompositeBase {

  /**
   * {@inheritdoc}
   */
  public function getInfo() {
    return parent::getInfo() + ['#theme' => 'ubc_apsc_campaign_tracking_webform_composite'];
  }

  /**
   * {@inheritdoc}
   */
  public static function getCompositeElements(array $element) {
    
    $elements = [];
    $elements['act_utm_source'] = [
      '#type' => 'hidden',
      '#title' => t('utm_source'),
    ];
    $elements['act_utm_medium'] = [
      '#type' => 'hidden',
      '#title' => t('utm_medium'),
    ];
    $elements['act_utm_term'] = [
      '#type' => 'hidden',
      '#title' => t('utm_term'),
    ];
    $elements['act_utm_content'] = [
      '#type' => 'hidden',
      '#title' => t('utm_content'),
    ];
    $elements['act_utm_campaign'] = [
      '#type' => 'hidden',
      '#title' => t('utm_campaign'),
    ];
    $elements['act_fbclid'] = [
      '#type' => 'hidden',
      '#title' => t('fbclid'),
    ];
    $elements['act_gclid'] = [
      '#type' => 'hidden',
      '#title' => t('gclid'),
    ];
    $elements['act_msclid'] = [
      '#type' => 'hidden',
      '#title' => t('msclid'),
    ];
    $elements['act_document_referrer'] = [
      '#type' => 'hidden',
      '#title' => t('document_referrer'),
    ];

    return $elements;
  }

  /**
   * Performs the after_build callback.
   */
  public static function afterBuild(array $element, FormStateInterface $form_state) {
    // Add .js-form-wrapper to wrapper (ie td) to prevent #states API from
    // disabling the entire table row when this element is disabled.
    $element['#wrapper_attributes']['class'][] = 'js-form-wrapper';

    return $element;
  }

}
