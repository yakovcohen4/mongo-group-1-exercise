const nameEl = document.getElementById('name');
const numberEl = document.getElementById('number');
const searchEl = document.getElementById('search-input');
const messeageEl = document.getElementById('messeage');
const idEl = document.getElementById('id-person');

const addBtn = document.getElementById('add');
const searchBtn = document.getElementById('search-btn');
const showdataBtn = document.getElementById('showdata-btn');
const deleteBtn = document.getElementById('delete-btn');

addBtn.addEventListener('click', addPerson);
searchBtn.addEventListener('click', searchById);
showdataBtn.addEventListener('click', showInfo);
deleteBtn.addEventListener('click', deletePreson);

const baseUrl = 'http://localhost:3001';

// method post **** /api/persons
async function addPerson() {
  const nameV = nameEl.value;
  const numberV = numberEl.value;
  const addDiv = document.createElement('div');

  try {
    const response = await axios.post(`${baseUrl}/api/persons`, {
      name: nameV,
      number: numberV,
    });
    const data = response.data;
    addDiv.textContent = `${nameV} has been added ! id: ${data._id}, number: ${data.number}`;
    messeageEl.style.display = 'block';
    messeageEl.appendChild(addDiv);

    setTimeout(() => {
      messeageEl.removeChild(addDiv);
      messeageEl.style.display = 'none';
    }, 4000);
  } catch (error) {
    addDiv.textContent = '';
    addDiv.textContent = error.response.data;
    messeageEl.style.display = 'block';
    messeageEl.appendChild(addDiv);
    setTimeout(() => {
      messeageEl.removeChild(addDiv);
      messeageEl.style.display = 'none';
    }, 4000);
  }
}
// method get **** /api/persons/:id
async function searchById() {
  console.log('you in search by id');
  const id = searchEl.value;
  const add = document.createElement('div');

  try {
    if (valitation(id)) {
      const response = await axios.get(`${baseUrl}/api/persons/${id}`);

      const data = response.data;

      add.textContent = `${data.name} found ! by id: ${data._id}, his number: ${data.number}`;
      messeageEl.style.display = 'block';
      messeageEl.appendChild(add);

      setTimeout(() => {
        messeageEl.removeChild(add);
        messeageEl.style.display = 'none';
      }, 6000);
    } else {
      add.textContent = `you must enter a value`;
      messeageEl.style.display = 'block';
      messeageEl.appendChild(add);
      setTimeout(() => {
        messeageEl.removeChild(add);
        messeageEl.style.display = 'none';
      }, 4000);
    }
  } catch (error) {
    add.textContent = error.response.data;
    messeageEl.style.display = 'block';
    messeageEl.appendChild(add);
    setTimeout(() => {
      messeageEl.removeChild(add);
      messeageEl.style.display = 'none';
    }, 4000);
  }
}

async function showInfo() {
  console.log('in the show data');
  const add = document.createElement('div');
  try {
    const response = await axios.get('/api/persons/');

    const data = response.data;

    data.forEach(person => {
      const added = document.createElement('div');

      added.textContent = `id: ${person._id}. name: ${person.name}. number: ${person.number}`;
      add.appendChild(added);
    });
    const yakov = JSON.stringify(data);

    // add.textContent = `${data}`;

    messeageEl.style.display = 'block';
    messeageEl.appendChild(add);

    setTimeout(() => {
      messeageEl.removeChild(add);
      messeageEl.style.display = 'none';
    }, 4000);
  } catch (error) {
    add.textContent = '';
    add.textContent = error.response.data;
    messeageEl.style.display = 'block';
    messeageEl.appendChild(add);
    setTimeout(() => {
      messeageEl.removeChild(add);
      messeageEl.style.display = 'none';
    }, 4000);
  }
}

async function deletePreson() {
  const id = idEl.value;

  const addDiv = document.createElement('div');

  try {
    if (valitation(id)) {
      const response = await axios.delete(`${baseUrl}/api/persons/${id}`, {
        id: id,
      });
      const data = response.data;

      addDiv.textContent = `${data._id} has been deleted !`;
      messeageEl.style.display = 'block';
      messeageEl.appendChild(addDiv);

      setTimeout(() => {
        messeageEl.removeChild(addDiv);
        messeageEl.style.display = 'none';
      }, 4000);
    } else {
      addDiv.textContent = `you must enter a value`;
      messeageEl.style.display = 'block';
      messeageEl.appendChild(addDiv);
      setTimeout(() => {
        messeageEl.removeChild(addDiv);
        messeageEl.style.display = 'none';
      }, 4000);
    }
  } catch (error) {
    addDiv.textContent = '';
    addDiv.textContent = error.response.data;
    messeageEl.style.display = 'block';
    messeageEl.appendChild(addDiv);
    setTimeout(() => {
      messeageEl.removeChild(addDiv);
      messeageEl.style.display = 'none';
    }, 4000);
  }
}

// function error(err) {
//   addDiv.textContent = '';
//   addDiv.textContent = err.response.data;
//   messeageEl.style.display = 'block';
//   messeageEl.appendChild(addDiv);
//   setTimeout(() => {
//     messeageEl.removeChild(addDiv);
//     messeageEl.style.display = 'none';
//   }, 4000);
// }

function valitation(input) {
  if (input.value) {
    return true;
  } else {
    return false;
  }
}
