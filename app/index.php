<?php
require __DIR__ . '/../vendor/autoload.php';

$r = new \Klein\Klein(); // router, only knows how to dispatch requests by METHOD+URL

$r->respond('GET', '/hello', function () {
	return 'We\'re just getting started.';
});

$r->dispatch();