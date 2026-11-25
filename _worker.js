export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const contentType = response.headers.get("content-type") || "";

    if (url.pathname === "/" && contentType.includes("text/html")) {
      return new HTMLRewriter()
        .on("body", {
          element(element) {
            element.append(`<script>
              (() => {
                const email = "mailto:gorillalbs@gmail.com";
                const normalise = (value) => (value || "").replace(/\\s+/g, " ").trim().toLowerCase();

                document.addEventListener("click", (event) => {
                  const path = typeof event.composedPath === "function" ? event.composedPath() : [event.target];
                  const clickedContact = path.some((node) => {
                    if (!node || !node.textContent || !node.tagName) return false;
                    const text = normalise(node.textContent);
                    return text === "contact" ||
                      text === "get in touch" ||
                      text === "contact gorilla labs" ||
                      (text.includes("get in touch") && text.length < 180) ||
                      (text.includes("contact gorilla labs") && text.length < 180);
                  });

                  if (clickedContact) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
                    window.location.href = email;
                  }
                }, true);

                document.querySelectorAll('a[href*="contact"], a[href*="#contact"]').forEach((link) => {
                  link.setAttribute("href", email);
                  link.removeAttribute("target");
                });
              })();
            </script>`, { html: true });
          }
        })
        .transform(response);
    }

    return response;
  }
};