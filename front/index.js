// try {
//     let response =await axios.post('http://localhost:3001/api/persons',{
//         "name":name,
//         "number":number
//     })
//     let data=JSON.stringify(response.data)
//     whoAdd.innerText=`${name} has been added ${data}`
//     document.getElementById("messeage").appendChild(whoAdd)
// }
// catch(error){
//     whoAdd.innerText=""
//     whoAdd.innerText=error.response.data.error
// }
