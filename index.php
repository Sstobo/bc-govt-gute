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

function my_custom_admin_styles() {
  wp_enqueue_style( 'my-admin-style', plugins_url( 'admin.css', __FILE__ ) );
}