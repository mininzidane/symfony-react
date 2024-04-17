/**
 * This file includes polyfills needed by the project.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills.
 *   2. Application imports.
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 */

/** *************************************************************************************************
 * BROWSER POLYFILLS
 */
import smoothscroll from 'smoothscroll-polyfill';
import 'intersection-observer';

/** *************************************************************************************************
 * CUSTOM POLYFILLS
 */
import './CustomEvent';
import './Object/remove';
import './Array/fill';
import './Window/rIC';

// Call polyfill methods
smoothscroll.polyfill();
