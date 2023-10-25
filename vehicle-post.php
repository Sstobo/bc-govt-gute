<?php 
function create_vehicle_post_type() {
  $labels = array(
    'name'                  => _x( 'Vehicles', 'Post type general name', 'vehiclePosts' ),
    'singular_name'         => _x( 'Vehicle', 'Post type singular name', 'vehiclePosts' ),
    'menu_name'             => _x( 'Vehicles', 'Admin Menu text', 'vehiclePosts' ),
    'name_admin_bar'        => _x( 'Vehicle', 'Add New on Toolbar', 'vehiclePosts' ),
  );
  
  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array( 'slug' => 'vehicle' ),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => null,
    'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
    'menu_icon'          => 'dashicons-car',
    'show_in_rest'       => true,
  );
  
  register_post_type( 'vehicle', $args );
}

add_action( 'init', 'create_vehicle_post_type' );

function create_vehicle_taxonomy() {

  $labels = array(
    'name'              => _x( 'Vehicle Types', 'taxonomy general name', 'vehiclePosts' ),
    'singular_name'     => _x( 'Vehicle Type', 'taxonomy singular name', 'vehiclePosts' ),
    'search_items'      => __( 'Search Vehicle Types', 'vehiclePosts' ),
    'all_items'         => __( 'All Vehicle Types', 'vehiclePosts' ),
    'parent_item'       => __( 'Parent Vehicle Type', 'vehiclePosts' ),
    'parent_item_colon' => __( 'Parent Vehicle Type:', 'vehiclePosts' ),
    'edit_item'         => __( 'Edit Vehicle Type', 'vehiclePosts' ),
    'update_item'       => __( 'Update Vehicle Type', 'vehiclePosts' ),
    'add_new_item'      => __( 'Add New Vehicle Type', 'vehiclePosts' ),
    'new_item_name'     => __( 'New Vehicle Type Name', 'vehiclePosts' ),
    'menu_name'         => __( 'Vehicle Type', 'vehiclePosts' ),
  );

  $args = array(
    'hierarchical'      => true,
    'labels'            => $labels,
    'show_ui'           => true,
    'show_admin_column' => true,
    'query_var'         => true,
    'rewrite'           => array( 'slug' => 'vehicle-type' ),
  );

  register_taxonomy( 'vehicle_type', array( 'vehicle' ), $args );
}

add_action( 'init', 'create_vehicle_taxonomy', 0 );