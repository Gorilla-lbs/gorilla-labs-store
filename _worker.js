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

                const normalise = (value) => (value || "").replace(/\\s+/g, " ").trim().toLowerCase();

                document.addEventListener("click", (event) => {
                  const target = event.target && event.target.closest
                    ? event.target.closest("button, a, [role='button'], input[type='submit']")
                    : null;
                  const targetText = normalise(target && (target.innerText || target.textContent || target.value));

                  // Only intercept the actual checkout button. Never match text on a
                  // surrounding cart container, which would also catch Add to Bag.
                  if (target && (targetText === "send order via whatsapp" || targetText === "submit order" || targetText === "checkout")) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();

                    const removeButtons = Array.from(document.querySelectorAll("button, a, [role='button']"))
                      .filter((node) => normalise(node.innerText || node.textContent) === "remove");
                    const items = removeButtons.map((removeButton) => {
                      const row = removeButton.parentElement && removeButton.parentElement.parentElement
                        ? removeButton.parentElement.parentElement
                        : removeButton.parentElement;
                      if (!row) return "";
                      return (row.innerText || row.textContent || "")
                        .replace(/\\bremove\\b/ig, "")
                        .replace(/\\s+/g, " ")
                        .trim();
                    }).filter(Boolean);

                    const message = [
                      "Hi Gorilla Labs, I'd like to place an order:",
                      "",
                      ...(items.length ? items.map((item) => "- " + item) : ["Please confirm the items in my bag."]),
                      "",
                      "Please confirm availability and the total. Thank you."
                    ].join("\\n");
                    window.location.href = whatsapp + "?text=" + encodeURIComponent(message);
                    return;
                  }

                  const clickedContact = target && (
                    targetText === "contact" ||
                    targetText === "get in touch" ||
                    targetText === "contact gorilla labs" ||
                    targetText.includes("get in touch") ||
                    targetText.includes("contact gorilla labs")
                  );

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