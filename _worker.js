export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return env.ASSETS.fetch(new Request(new URL("/homepage.html", url), request));
    }
    return env.ASSETS.fetch(request);
  }
};