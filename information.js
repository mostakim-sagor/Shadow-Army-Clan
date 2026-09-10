/**
 * information.js
 * -----------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH for all clan information shown on the website.
 *
 * Edit the values below to update the site. Nothing else in the project
 * needs to change — index.html reads these values at runtime.
 *
 * This file is intentionally dependency-free: it is loaded directly in
 * the browser with a plain <script src="/information.js"></script> tag
 * AND can be required from Node (e.g. if you extend index.js later), so
 * it exposes itself both as a global (CLAN_INFO) and as a CommonJS
 * export, without needing a bundler, module loader, or npm install.
 * -----------------------------------------------------------------------
 */
(function (root) {
  "use strict";

  var CLAN_INFO = {
    CLAN_NAME: "SHADOW - ARMY !",
    CLAN_TAG: "#2CG0GJCCC",

    MESSENGER: "https://m.me/j/Q6xQOD7inbrQvJz1/?send_source=gc%3Acopy_invite_link_t",
    TELEGRAM: "https://t.me/SHADOW_ARMY_COC",
    DISCORD: "https://discord.gg/jbZRG6MtWN"
  };

  // Browser: expose as a global so index.html can read it directly.
  if (root) {
    root.CLAN_INFO = CLAN_INFO;
  }

  // Node / CommonJS (e.g. server-side use, testing, future tooling).
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CLAN_INFO;
  }
})(typeof window !== "undefined" ? window : this);
