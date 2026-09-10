/**
 * settings.js
 * -----------------------------------------------------------------------
 * Centralized UI / behavior configuration. Nothing in index.html should
 * hard-code these values — flip a flag here and the whole site follows.
 *
 * Loaded the same dependency-free way as information.js: a plain
 * <script src="/settings.js"></script> tag exposing a global (SETTINGS).
 * -----------------------------------------------------------------------
 */
(function (root) {
  "use strict";

  var SETTINGS = {
    // Visual systems
    ENABLE_PARTICLES: true,
    ENABLE_PARALLAX: true,
    ENABLE_3D_EFFECTS: true,
    ENABLE_ANIMATIONS: true,

    // Ambient particle density (lower = lighter/cheaper)
    PARTICLE_COUNT: 26,

    // How strongly the hero logo tilts toward the pointer (desktop only)
    TILT_MAX_DEGREES: 8,

    // Clan tag "copy" interaction
    COPY_NOTIFICATION_DURATION: 2000,

    // Profile modal
    MODAL_CLOSE_ON_OVERLAY_CLICK: true,
    MODAL_CLOSE_ON_ESC: true
  };

  if (root) {
    root.SETTINGS = SETTINGS;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = SETTINGS;
  }
})(typeof window !== "undefined" ? window : this);
