console.log("Your js file is loaded..........")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:1200/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        console.log("loding.....")
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.forcasting
            messageTwo.textContent=data.location
        }
    })
})
})
