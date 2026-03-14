const daysInWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta-feira",
  "Sábado",
];

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
const qtdDaysInMonth = new Date(year, month + 1, 0).getDate();

let calendar = JSON.parse(localStorage.getItem(month)) || [];

init();

function init() {
  if (!localStorage.getItem(month)) {
    localStorage.setItem(month, JSON.stringify([]));
    location.reload();
    return;
  }

  if (calendar.length < qtdDaysInMonth) {
    generateCalendar();
  }

  renderCalendar();
}

function generateCalendar() {
  for (let day = 1; day <= qtdDaysInMonth; day++) {
    const date = new Date(year, month, day);

    calendar.push({
      day: daysInWeek[date.getDay()],
      date: date.getDate(),
      ingress: null,
      exit: null,
    });
  }

  localStorage.setItem(month, JSON.stringify(calendar));
}

function renderCalendar() {
  const rows = calendar
    .map((day, index) => {
      const date = String(day.date).padStart(2, "0");

      return `
        <tr>
          <td>${day.day}</td>
          <td>${date}</td>
          <td>
            <input
              type="time"
              id="ingress${index}"
              onblur="setInfoInlocalStorage(${index})"
              value="${day.ingress || ""}"
            />
          </td>
          <td>
            <input
              type="time"
              id="exit${index}"
              onblur="setInfoInlocalStorage(${index})"
              value="${day.exit || ""}"
            />
          </td>
        </tr>
      `;
    })
    .join("");

  document.getElementById("point").innerHTML += rows;
}

function setInfoInlocalStorage(index) {
  const ingress = document.getElementById(`ingress${index}`).value;
  const exit = document.getElementById(`exit${index}`).value;

  calendar[index] = {
    ...calendar[index],
    ingress: ingress || null,
    exit: exit || null,
  };

  localStorage.setItem(month, JSON.stringify(calendar));
}

function rem() {
  localStorage.removeItem(month);
}
