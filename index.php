<?php

/*
  Plugin Name: Green Blocks Gutenberg Library
  Version: 1.0
  Author: Sean Stobo
  Author URI: https://github.com/sstobo
*/

if (!defined('ABSPATH')) exit; // Exit if accessed directly

require_once plugin_dir_path(__FILE__) . 'vehicle-post.php';
require_once plugin_dir_path(__FILE__) . 'vehicle-block.php';

function url_helper() {
  wp_enqueue_script( 'url-helper', plugins_url( '/url-helper.js', __FILE__ ), array(), '1.0', true );

  $data = array(
      'rootUrl' => get_bloginfo('url'),
  );
  wp_localize_script( 'url-helper', 'locateUrl', $data );
}
add_action( 'wp_enqueue_scripts', 'url_helper' );