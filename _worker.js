export default {
  async fetch(request, env) {
    // Serve the existing storefront exactly as stored in the site's assets.
    // No injected redesign, extra mascot, story section, or content changes.
    return env.ASSETS.fetch(request);
  }
};
