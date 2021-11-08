const nameEl = document.getElementById("name");
const numberEl = document.getElementById("number");
const searchEl = document.getElementById("searchId");
const messeageEl = document.getElementById("messeage");

const addBtn = document.getElementById("add");
const searchBtn = document.getElementById("search");

addBtn.addEventListener("click",addPerson)
searchBtn.addEventListener("click",searchById)

async function addPerson() {
    const name = nameEl.value;
    const number = numberEl.value;
    const add = document.createElement("div");
    try {
        const response = await axios.post('http://localhost:3001/api/persons',{
            "name":name,
            "number":number
        })
        const data = JSON.stringify(response.data)
        const yakov = JSON.parse(data);
        console.log(data);
        console.log(typeof(data));
        console.log(yakov);
        console.log(typeof(yakov));
        add.innerText=`${name} has been added ${yakov}`
        messeageEl.appendChild(add)
    }
    catch(error){
        console.log(error);
        add.innerText=""
        add.innerText=error.response.data.error
    }
}

async function searchById(){
    const id = searchEl.value;
    const add = document.createElement("div");
    try{
        let response =await axios.get(`http://localhost:3001/api/persons/${id}`)
        let data=JSON.stringify(response.data)
        add.innerText=`${data}`
        document.getElementById("messeage").appendChild(add)
}
    catch(error){
        add.innerText=""
        add.innerText=(error.response.data.error)
        document.getElementById("messeage").appendChild(add)
    }
}