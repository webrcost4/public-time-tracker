const daysInWeek = [
    'Domingo', 
    'Segunda', 
    'Terça', 
    'Quarta', 
    'Quinta',
    'Sexta-feira', 
    'Sábado'
];


const month = new Date().getMonth();
const year = new Date().getFullYear();
const qtdDaysInMonth = new Date(year, month + 1, 0);
const calendar = JSON.parse(localStorage.getItem(month));

(()=> {

if (!localStorage.getItem(month)) {
    localStorage.setItem(month, JSON.stringify([]));
    location.reload();
}

for (let day = 1; day <= qtdDaysInMonth.getDate(); day++) {
    const dayInMonth = new Date(year, month, day);

    if (localStorage.getItem(month).length < 10) {
          // Domingo
          if (dayInMonth.getDay() === 0) {
               calendar.push({day: 'Domingo', date: dayInMonth.getDate(), ingress: null, exit: null})
          }
          
          // Segunda
          if (dayInMonth.getDay() === 1) {
               calendar.push({day: 'Segunda', date: dayInMonth.getDate(), ingress: null, exit: null})
          }

          // Terça
          if (dayInMonth.getDay() === 2) {
               calendar.push({ day: 'Terça', date: dayInMonth.getDate(), ingress: null, exit: null})
          }

          // Quarta
          if (dayInMonth.getDay() === 3) {
               calendar.push({day: 'Quarta', date: dayInMonth.getDate(), ingress: null, exit: null })
          }

          // Quinta
          if (dayInMonth.getDay() === 4) {
               calendar.push({day: 'Quinta', date: dayInMonth.getDate(), ingress: null, exit: null})
          }

          // Sexta
          if (dayInMonth.getDay() === 5) {
               calendar.push({day: 'Sexta', date: dayInMonth.getDate(), ingress: null, exit: null})
          }

          // sabado
          if (dayInMonth.getDay() === 6) {
               calendar.push({day: 'Sábado', date: dayInMonth.getDate(), ingress: null, exit: null})
          }
    }

}
document.getElementById('point')
.innerHTML += `${
    calendar.map((day, index)=> (
         `<tr>
              <td>${day.day}</td> 
              <td>${Number(day.date) < 10 ? '0' + day.date : day.date}</td>     
              <td>
                   <input 
                        type="time"
                        id="ingress${index}" 
                        onblur="setInfoInlocalStorage(${index})"
                        value="${day.ingress}" 
                   />
              </td>     
              <td>
                   <input 
                        type="time"
                        id="exit${index}" 
                        onblur="setInfoInlocalStorage(${index})" 
                        value="${day.exit}"
                   />
              </td>     
         </tr>`
    )).join('')
}`

})();

function rem() {
     localStorage.removeItem(month)
}

function setInfoInlocalStorage(index) {
    const ingress = document.getElementById(`ingress${index}`).value;
    const exit = document.getElementById(`exit${index}`).value;

    if (ingress) {
         calendar[index] = { ...calendar[index], ingress };
    }

    if (exit) {
         calendar[index] = { ...calendar[index], exit };
    }

    console.log(calendar)

    localStorage.setItem(month, JSON.stringify(calendar));
    // {day: sabado, date: 12, ingress: 12:00, exit: 17:00}
    // calendar.push({...calendar[index], ingress})
    
    //console.log(JSON.parse(localStorage.getItem(month)));
    // localStorage.setItem(month, JSON.stringify())
}