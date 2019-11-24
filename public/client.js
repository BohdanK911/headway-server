'use strict';

const reloadBtn = document.getElementById('reload'),
btnWrapper = document.querySelector('.btnWrapper'),
updateBtn = document.getElementById('update'),
deleteBtn = document.getElementById('delete'),
DB_URL = window.location.href + 'api/registeredUsers_308b1b02d690/';

btnWrapper.addEventListener('click', ({target}) => {
  switch (target.id) {
    case 'reload':
      start();
      break;

    case 'reload':
      start();
      break;

    case 'update':
      update();
      break;

    case 'delete':
      remove();
      break;

    default:
      break;
  }
});

function update() {
  const id = prompt('Enter user ID to change user data: ');

  if (id !== null && id !== '') {
    const updated = {
      name: prompt("Enter updated user's name:"),
      phone: prompt("Enter updated user's phone:"),
      email: prompt("Enter updated user's email:")
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
    alert('Aborted');
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

const start = () => {
  fetch(DB_URL)
    .then(response => {
      if (response.status === 200 || response.statusText === 'OK') return response.json();
      else alert(`SERVER ERROR!\nStatus code: ${response.status}`);
    })
    .then(({data}) => {
      const wrapper = document.getElementById('dbWrapper'),
      table = document.createElement('table'),
      thead = document.createElement('thead'),
      tbody = document.createElement('tbody'),
      trHead = document.createElement('tr'),
      thName = document.createElement('th'),
      thPhone = document.createElement('th'),
      thEmail = document.createElement('th'),
      thDate = document.createElement('th');

      thName.textContent = 'Name';
      thPhone.textContent = 'Phone';
      thEmail.textContent = 'E-mail';
      thDate.textContent = 'Date';

      trHead.append(thName, thPhone, thEmail, thDate);
      thead.appendChild(trHead);

      data.map(user => {
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

      wrapper.innerHTML = '';
      table.append(thead, tbody);
      wrapper.appendChild(table);
    })
    .catch(error => alert(error));
};

if (md5(prompt('Enter password: ')) === '9c1d280824f1ac3ad798f60004437586') start();