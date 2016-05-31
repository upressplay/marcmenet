<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'i1322165_wp2');

/** MySQL database username */
define('DB_USER', 'i1322165_wp2');

/** MySQL database password */
define('DB_PASSWORD', 'D.2[YIrlNS25&8a20O(48*~3');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '1cnkl00l6JWeMY4EtQl33W5WLrEwdQaOzBNAXRrvbuN5BQQT5wqLAkRrJArW6alD');
define('SECURE_AUTH_KEY',  'GtG5H5l5wGARoUksipDpdQanS1t3FuiiySMetHHRR8SGEFMFGleLKvp6zv8tPH5C');
define('LOGGED_IN_KEY',    'Fxj6g2R59jFAYhR9opqyAerDOL8CcG81QHqauTbwRlH3Z0oL6uTdN1nhlNmLmZEg');
define('NONCE_KEY',        '3WoLxEn9jrgg0FjOtn1NWrIpMW6HTT0FaqgCnYzopNq2iyXSfWZeVqVlPoq2NKet');
define('AUTH_SALT',        'BtvMM41HSYVSjZ82HXPUxHodWgCr7qj1EFnSbuw5vezko7x1vkZKEYrlRSneI2G7');
define('SECURE_AUTH_SALT', 'Zwyp5b8dfH6YZdxILFngRuzatA277m3Yge3ETB6WzdC9bG0YWtT1tyZ3lSGcVMyf');
define('LOGGED_IN_SALT',   '5h82eQ8vmejnqJBXpNOPlCNYutfzEvNUYr3bDQYK1rwC8qToZlFeTU0s8FhOYXEV');
define('NONCE_SALT',       '4bl54FHZgldyzEQTHk2xXcWVdD7NeYIZHEyDfmKYmkWeMvuHIX490kAlosehJx7v');

/**
 * Other customizations.
 */
define('FS_METHOD','direct');define('FS_CHMOD_DIR',0755);define('FS_CHMOD_FILE',0644);
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');

/**
 * Turn off automatic updates since these are managed upstream.
 */
define('AUTOMATIC_UPDATER_DISABLED', true);


/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
