'use strict';

const reloadBtn = document.getElementById('reload');
const updateBtn = document.getElementById('update');
const deleteBtn = document.getElementById('delete');
const DB_URL = window.location.href + 'api/registeredUsers_308b1b02d690/';

reloadBtn.addEventListener('click', () => document.location.reload(true));
updateBtn.addEventListener('click', update);
deleteBtn.addEventListener('click', remove);

function update() {
  const id = prompt('Enter user ID to change user data: ');

  if (id !== null && id !== '') {
    let date = new Date();
    const updated = {
      name: prompt("Enter updated user's name:"),
      phone: prompt("Enter updated user's phone:"),
      email: prompt("Enter updated user's email:"),
      date: date.toLocaleString('uk-UA')
    };

    fetch(`${DB_URL}${id}`, {
      method: 'PUT',
      body: JSON.stringify(updated),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  } else {
    alert('aborted');
  }
}

function remove() {
  const id = prompt('Enter user ID to delete user: ');

  if (id !== null && id !== '') {
    fetch(`${DB_URL}${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  } else {
    alert('aborted');
  }
}

if (prompt('Enter password: ') === 'admin') {
  (() => {
    fetch(DB_URL)
      .then(response => {
        if (response.status === 200 || response.statusText === 'OK' || response.status === 200) {
          return response.json();
        } else {
          alert(`SERVER ERROR!\nStatus code: ${response.status}`);
        }
      })
      .then(data => {
        const wrapper = document.getElementById('dbWrapper');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const trHead = document.createElement('tr');
        const thName = document.createElement('th');
        const thPhone = document.createElement('th');
        const thEmail = document.createElement('th');
        const thDate = document.createElement('th');

        thName.textContent = 'Name';
        thPhone.textContent = 'Phone';
        thEmail.textContent = 'E-mail';
        thDate.textContent = 'Date';

        thead.append(thName, thPhone, thEmail, thDate);

        data.data.map(user => {
          const tr = document.createElement('tr');
          const tdName = document.createElement('td');
          const tdPhone = document.createElement('td');
          const tdEmail = document.createElement('td');
          const tdDate = document.createElement('td');

          tdName.textContent = user.name;
          tdPhone.textContent = user.phone;
          tdEmail.textContent = user.email;
          tdDate.textContent = user.date;

          tr.append(tdName, tdPhone, tdEmail, tdDate);
          tbody.appendChild(tr);
        });

        table.append(thead, tbody);
        wrapper.appendChild(table);
      })
      .catch(error => console.error(error));
  })();
}
