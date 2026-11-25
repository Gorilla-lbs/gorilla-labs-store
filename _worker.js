export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const contentType = response.headers.get("content-type") || "";

    if (url.pathname === "/" && contentType.includes("text/html")) {
      return new HTMLRewriter()
        .on('a[href*="contact"], a[href*="#contact"]', {
          element(element) {
            element.setAttribute("href", "mailto:gorillalbs@gmail.com");
            element.removeAttribute("target");
          }
        })
        .transform(response);
    }

    return response;
  }
};