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
                const whatsapp = "https://wa.me/61416300006";

                const addWhatsAppButton = () => {
                  if (document.getElementById("gl-whatsapp-contact")) return;
                  const button = document.createElement("a");
                  button.id = "gl-whatsapp-contact";
                  button.href = whatsapp;
                  button.target = "_blank";
                  button.rel = "noopener noreferrer";
                  button.setAttribute("aria-label", "Chat with Gorilla Labs on WhatsApp");
                  button.textContent = "WhatsApp";
                  Object.assign(button.style, {
                    position: "fixed",
                    right: "18px",
                    bottom: "18px",
                    zIndex: "2147483647",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "13px 20px",
                    borderRadius: "999px",
                    background: "#25D366",
                    color: "#ffffff",
                    font: "600 15px/1.2 Arial, sans-serif",
                    textDecoration: "none",
                    boxShadow: "0 3px 14px rgba(0,0,0,.28)"
                  });
                  document.body.appendChild(button);
                };
                if (document.readyState === "loading") {
                  document.addEventListener("DOMContentLoaded", addWhatsAppButton, { once: true });
                } else {
                  addWhatsAppButton();
                }
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