/* Native controls, keyboard-accessible tabs, no external dependencies. */
(() => {
  function wireTabs(list, onSelect) {
    const buttons = [...list.querySelectorAll('[role="tab"]')];
    function activate(button, focus = false) {
      buttons.forEach((item) => {
        item.setAttribute("aria-selected", String(item === button));
        item.tabIndex = item === button ? 0 : -1;
      });
      onSelect(button);
      if (focus) button.focus();
    }
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => activate(button));
      button.addEventListener("keydown", (event) => {
        let next;
        if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
        if (event.key === "ArrowLeft") next = (index + buttons.length - 1) % buttons.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = buttons.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          activate(buttons[next], true);
        }
      });
    });
    return activate;
  }
  const walkthrough = document.querySelector(".walkthrough");
  // Illustrative excerpts from the paper's annotation and pipeline figures.
  const examples = {
    racetrack: {
      prefix: "At Racetrack Playa, stones leave trails stretching over 100 meters, propelled by",
      continuation: "wind-driven, millimeter-thin ice.",
      query: "Racetrack Playa stone propelled by",
      evidence: "Thin ice sheets pushed by light winds move the stones…",
    },
    bagels: {
      prefix: "Before hitting a 450°F deck oven, shaped bagels are poached in",
      continuation: "an alkaline bath, yielding …",
      query: "Bagel poached in before oven",
      evidence: "…boil bagels in an alkaline bath, water enriched with barley malt syrup, honey, …",
    },
  };
  document.querySelector("#example-select").addEventListener("change", (event) => {
    const example = examples[event.target.value];
    walkthrough.querySelector(".document-text .supervised").textContent = example.prefix;
    walkthrough.querySelector(".original-ending").textContent = " " + example.continuation;
    walkthrough.querySelector(".continuation .supervised").textContent = example.continuation;
    walkthrough.querySelector(".query p").textContent = example.query;
    walkthrough.querySelector(".evidence p").textContent = example.evidence;
  });
  const notes = {
    original: "Original document: predict the next token from the preceding text.",
    search: "A query retrieves evidence before the original document continues.",
    training: "Text and queries are supervised. Retrieved responses remain in context, with their loss masked.",
  };
  wireTabs(walkthrough.querySelector('[role="tablist"]'), (button) => {
    const view = button.dataset.view;
    walkthrough.dataset.view = view;
    walkthrough.querySelector(".search-insertion").hidden = view === "original";
    walkthrough.querySelector(".continuation").hidden = view === "original";
    walkthrough.querySelector(".original-ending").hidden = view !== "original";
    walkthrough.querySelector('[role="tabpanel"]').setAttribute("aria-labelledby", button.id);
    walkthrough.querySelector(".walkthrough-note p").textContent = notes[view];
  });
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    wireTabs(group.querySelector('[role="tablist"]'), (button) => {
      group.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
        if (panel.closest("[data-tabs]") === group) {
          panel.hidden = panel.id !== button.getAttribute("aria-controls");
        }
      });
    });
  });
  const filters = {
    corpus: document.querySelector("#filter-corpus"),
    size: document.querySelector("#filter-size"),
    stage: document.querySelector("#filter-stage"),
  };
  const rows = [...document.querySelectorAll(".hub tbody tr")];
  function filterModels() {
    let count = 0;
    rows.forEach((row) => {
      row.hidden = !Object.entries(filters).every(([key, field]) => !field.value || row.dataset[key] === field.value);
      if (!row.hidden) count++;
    });
    document.querySelector(".filter-status").textContent = `Showing ${count} checkpoint ${count === 1 ? "pair" : "pairs"}.`;
    document.querySelector(".filter-empty").hidden = count !== 0;
    document.querySelector(".table-scroll").hidden = count === 0;
  }
  Object.values(filters).forEach((field) => field.addEventListener("change", filterModels));
  document.querySelector(".reset-filters").addEventListener("click", () => {
    Object.values(filters).forEach((field) => {
      field.value = "";
    });
    filterModels();
  });
  const copy = document.querySelector(".copy");
  copy.addEventListener("click", async () => {
    const code = document.querySelector(".citation code");
    const status = document.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText(code.textContent);
      copy.textContent = "Copied";
      status.textContent = "Citation copied to clipboard.";
      setTimeout(() => {
        copy.textContent = "Copy citation";
      }, 2000);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Citation selected. Use your browser’s Copy command.";
      copy.textContent = "Text selected";
    }
  });
})();
