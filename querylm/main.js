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
  const notes = {
    original: [
      "Ordinary pretraining",
      "Predict what comes next.",
      "The model sees the document text and learns to predict its continuation. The factual explanation has to come from what it has learned in its weights.",
    ],
    search: [
      "Search-augmented document",
      "Find the missing information.",
      "A query uses only the preceding text. Retrieved evidence is inserted before the original continuation, giving the model context for its next prediction.",
    ],
    training: [
      "The learning objective",
      "Learn to search and use evidence.",
      "Document text and search queries carry the next-token loss. Retrieved responses remain in the context, but their tokens are excluded from the loss.",
    ],
  };
  const views = Object.keys(notes);
  const activate = wireTabs(walkthrough.querySelector('[role="tablist"]'), (button) => {
    const view = button.dataset.view;
    walkthrough.dataset.view = view;
    walkthrough.querySelector(".search-insertion").hidden = view === "original";
    walkthrough.querySelector(".continuation").hidden = view === "original";
    walkthrough.querySelector(".original-ending").hidden = view !== "original";
    walkthrough.querySelector('[role="tabpanel"]').setAttribute("aria-labelledby", button.id);
    const note = walkthrough.querySelector(".walkthrough-note");
    note.querySelector(".note-label").textContent = notes[view][0];
    note.querySelector("h3").textContent = notes[view][1];
    note.querySelector("p").textContent = notes[view][2];
    walkthrough.querySelector(".next-step").textContent = {
      original: "Add a search call",
      search: "See the training signal",
      training: "Back to the original",
    }[view];
  });
  walkthrough.querySelector(".next-step").addEventListener("click", () => {
    const next = views[(views.indexOf(walkthrough.dataset.view) + 1) % views.length];
    activate(walkthrough.querySelector(`[data-view="${next}"]`));
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
