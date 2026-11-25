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
                const wireContact = () => {
                  document.querySelectorAll("a, button").forEach((el) => {
                    if ((el.textContent || "").trim().replace(/\\s+/g, " ").toLowerCase() === "contact") {
                      if (el.tagName === "A") {
                        el.setAttribute("href", email);
                        el.removeAttribute("target");
                      } else {
                        el.addEventListener("click", (event) => {
                          event.preventDefault();
                          window.location.href = email;
                        });
                      }
                    }
                  });
                };
                if (document.readyState === "loading") {
                  document.addEventListener("DOMContentLoaded", wireContact);
                } else {
                  wireContact();
                }
              })();
            </script>`, { html: true });
          }
        })
        .transform(response);
    }

    return response;
  }
};