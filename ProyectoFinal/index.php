<?php
    header('Access-Control-Allow-Origin: *');

    print_r(json_encode(
        array('id' => 1,
        'exchange' => rand(16, 28),
        'request' => true )
    ))
?>