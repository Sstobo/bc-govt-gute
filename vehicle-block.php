<?php

// Define a class 'GreenBlocks' to encapsulate functionality related to blocks
class GreenBlocks {
    // private variable to hold all registered blocks
    private $blocks = array();

    // Method for registering new blocks
    function registerBlock($blockName, $callback, $attributes) {
        // Append the new block to the class' array of blocks
        $this->blocks[] = array(
            'blockName' => 'green-blocks/' . $blockName, // prepend passed block name with namespace
            'callback' => $callback, // callback function to render the block's output
            'attributes' => $attributes, // block's attributes
        );
    }

    // Constructor, run when instance of 'GreenBlocks' class is created
    function __construct() {
        // Add class methods to appropriate WordPress hooks
        add_action('init', array($this, 'onInit')); // on WordPress init hook, run onInit() method
        add_action('enqueue_block_editor_assets', array($this, 'onInit')); // For backend
        add_action('wp_enqueue_scripts', array($this, 'onInit')); // For frontend
    }

    // Method for enqueueing scripts and styles
    function onInit() {
        // register block's JS and CSS 
        wp_register_script('green-blocks-script', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        wp_register_style('green-blocks-style', plugin_dir_url(__FILE__) . 'build/index.css');

        // enqueue scripts and styles
        wp_enqueue_script('green-blocks-script');
        wp_enqueue_style('green-blocks-style');

        // Loop through all blocks in the 'blocks' array
        foreach ($this->blocks as $block) {
            // Register each block with WordPress
            register_block_type($block['blockName'], array(
                'attributes' => $block['attributes'], // Pass the block's attributes
                'render_callback' => function ($attributes) use ($block) { // Define the render callback function
                    return call_user_func_array(array($this, $block['callback']), array($attributes)); // Call the 'callback' method of this class
                },
                'editor_script' => 'green-blocks-script', // Enqueue block's JS in the editor
                'editor_style' => 'green-blocks-style', // Enqueue block's CSS in the editor
            ));
        }
    }

    // Method for rendering the "vehicles-post-loop" block
    function renderVehiclesPostLoop($attributes) {
        // Start of block's HTML output
        $output = '<pre style="display:none;">' . json_encode($attributes) . '</pre>
        <div class="green-blocks-vehicle-posts !max-w-full w-full px-6 justify-center flex ' . $attributes['padding_top'] . ' ' .  $attributes['padding_bottom'] . ' ' . $attributes['style'] . '">
            <div class="container grid gap-3 ' . $attributes['grid_width'] . '">';

        // Define query parameters
        $args = array(
            'post_type' => 'vehicle', // Query for 'vehicle' posts
            'posts_per_page' => 5, // Limit to 5 posts
        );

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $terms = get_the_terms(get_the_ID(), 'vehicle_type');

                if (!empty($terms) && !is_wp_error($terms)) {
                    $term_link = get_term_link($terms[0]); // gets the link of the first term, can be expanded to loop through all terms
                }

                $thumbnail_id = get_post_thumbnail_id();
                $thumbnail_url = get_the_post_thumbnail_url();
                $alt_text = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true) ?: 'An image of: ' . get_the_title();

                $output .= '<div class="vehicle-post border rounded-md py-8 px-5">';
                if ( $thumbnail_url ) {
                    $output .= '<a href="' . $thumbnail_url . '">';
                    $output .= '<img alt="' . $alt_text . '" src="' . get_the_post_thumbnail_url() . '" class="object-contain rounded-md hover:scale-105 transition-all duration-300 ease-in-out max-h-32">';
                    $output .= '</a>';
                }
                $output .= '<h4 class="my-0 pb-3">' . get_the_title() . '</h4>';
                if ($terms[0]->name) {
                    $output .= '<a class="!no-underline" href="'. $term_link . '"><p class="text-sm  mb-4 w-fit py-1 px-2 bg-slate-500 text-slate-50 rounded-md duration-200 ease-in-out transition hover:bg-slate-700">'. $terms[0]->name . '</p></a>';
                }
                $output .= '<p class="text-sm mb-8">' . get_the_excerpt() . '</p>';
                $output .= '<a class="text-sm border rounded-md py-2 px-4 !no-underline transition duration-200 ease-in-out ' . $attributes['button'] . '" href="' . get_the_permalink() . '" target="_blank">Read More</a>';
                $output .= '</div>';
            }

            wp_reset_postdata();
        } else {
            $output .= '<p>No vehicle posts found.</p>';
        }
        $output .= '</div></div>';
        return $output;
    }
}
$greenBlocks = new GreenBlocks(); // Instantiate new 'GreenBlocks' object

// Register the "vehicles-post-loop" block
$greenBlocks->registerBlock(
    'vehicles-post-loop',
    'renderVehiclesPostLoop',
    array(
        'grid_width' => array('type' => 'string', 'default' => 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'),
        'column_width' => array('type' => 'string', 'default' => 'col-span-1'),
        'padding_top' => array('type' => 'string', 'default' => 'pt-5'),
        'padding_bottom' => array('type' => 'string', 'default' => 'pb-5'),
        'style' => array('type' => 'string', 'default' => 'text-slate-900 text-slate-50 border-slate-300 border-dotted'),
        'button' => array('type' => 'string', 'default' => 'bg-slate-700 !text-slate-50 hover:!bg-slate-50 hover:!text-slate-700 hover:!border-slate-50')
    )
);
