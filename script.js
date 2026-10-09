const slots = [
  { time: "6:00 AM - 7:00 AM", label: "Morning nets", period: "morning", price: 700, status: "Available" },
  { time: "7:00 AM - 8:00 AM", label: "Team warm-up", period: "morning", price: 800, status: "Available" },
  { time: "5:00 PM - 6:00 PM", label: "After office", period: "evening", price: 1000, status: "Available" },
  { time: "6:00 PM - 7:00 PM", label: "Peak match", period: "evening", price: 1200, status: "Few left" },
  { time: "7:00 PM - 8:00 PM", label: "Prime turf", period: "night", price: 1300, status: "Available" },
  { time: "8:00 PM - 9:00 PM", label: "Floodlight game", period: "night", price: 1400, status: "Available" },
  { time: "9:00 PM - 10:00 PM", label: "Late league", period: "night", price: 1250, status: "Few left" },
  { time: "10:00 PM - 11:00 PM", label: "Night practice", period: "night", price: 950, status: "Available" }
];

const slotGrid = document.querySelector("#slotGrid");
const timeSelect = document.querySelector("#time");
const dateInput = document.querySelector("#date");
const durationInput = document.querySelector("#duration");
const totalOutput = document.querySelector("#total");
const summarySlot = document.querySelector("#summarySlot");
const summary = document.querySelector("#summary");
const form = document.querySelector("#bookingForm");
const confirmation = document.querySelector("#confirmation");

let selectedSlot = slots[0];

function formatRupees(amount) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function setMinimumDate() {
  const today = new Date();
  dateInput.min = today.toISOString().split("T")[0];
  dateInput.value = dateInput.min;
}

function renderSlotOptions() {
  timeSelect.innerHTML = slots
    .map((slot) => `<option value="${slot.time}">${slot.time} - ${formatRupees(slot.price)}/hr</option>`)
    .join("");
}

function renderSlots(filter = "all") {
  const visibleSlots = filter === "all" ? slots : slots.filter((slot) => slot.period === filter);
  slotGrid.innerHTML = visibleSlots
    .map(
      (slot) => `
        <article class="slot-card ${selectedSlot.time === slot.time ? "selected" : ""}">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm font-bold uppercase tracking-[0.12em] text-emerald-700">${slot.period}</p>
              <h3 class="mt-2 text-xl font-black">${slot.time}</h3>
            </div>
            <span class="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">${slot.status}</span>
          </div>
          <p class="mt-3 text-sm text-slate-600">${slot.label}</p>
          <div class="mt-5 flex items-center justify-between gap-3">
            <p class="font-black">${formatRupees(slot.price)}/hr</p>
            <button type="button" data-time="${slot.time}">Choose</button>
          </div>
        </article>
      `
    )
    .join("");
}

function calculateTotal() {
  const duration = Number(durationInput.value);
  const addOns = [...document.querySelectorAll(".addon input:checked")].reduce((sum, input) => sum + Number(input.value), 0);
  return selectedSlot.price * duration + addOns;
}

function updateSummary() {
  const selectedDate = dateInput.value ? new Date(`${dateInput.value}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short"
  }) : "Select date";
  const addOnLabels = [...document.querySelectorAll(".addon input:checked")].map((input) => input.dataset.label);
  const duration = Number(durationInput.value);

  totalOutput.textContent = formatRupees(calculateTotal());
  summarySlot.textContent = selectedSlot.time;
  summary.textContent = `${selectedDate}, ${selectedSlot.time}, ${duration} hour${duration > 1 ? "s" : ""}${
    addOnLabels.length ? ` with ${addOnLabels.join(", ")}` : ""
  }.`;
}

document.querySelectorAll(".slot-filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".slot-filter").forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");
    renderSlots(button.dataset.filter);
  });
});

slotGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-time]");
  if (!button) return;
  selectedSlot = slots.find((slot) => slot.time === button.dataset.time);
  timeSelect.value = selectedSlot.time;
  renderSlots(document.querySelector(".slot-filter.active").dataset.filter);
  updateSummary();
});

timeSelect.addEventListener("change", () => {
  selectedSlot = slots.find((slot) => slot.time === timeSelect.value);
  renderSlots(document.querySelector(".slot-filter.active").dataset.filter);
  updateSummary();
});

form.addEventListener("input", updateSummary);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  confirmation.textContent = `Booking confirmed for ${document.querySelector("#name").value} at ${selectedSlot.time}. Estimated amount: ${formatRupees(calculateTotal())}.`;
  confirmation.classList.remove("hidden");
});

setMinimumDate();
renderSlotOptions();
renderSlots();
updateSummary();
