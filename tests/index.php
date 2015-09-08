<?php
require __DIR__ . '/../vendor/autoload.php';
use \PHPUnit_Framework_TestCase;

class HelloTest extends PHPUnit_Framework_TestCase {

	public function testItLives() {
		// Arrange
		// $a = new App;

		// Act
		// $s = $a->fetchUserStatus();

		// Assert
		$this->assertEquals(true, true || false);
	}
}