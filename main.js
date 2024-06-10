import {menuArray} from "./data.js"
const menuContainer = document.getElementById("menu-container")
const orderDetails = document.getElementById("order-details")
const totalPrice = document.getElementById("total-price")
const orderTitle = document.getElementById("order-title")
const orderBtn = document.getElementById("order-btn")
const cardForm = document.getElementById("card-form")
const cardDetails = document.getElementById("card-details")
const orderContainer = document.getElementById("order-container")
const finalMessage = document.getElementById("final-message")

let customerName = ""
let currentOrdersId = []
let currentOrdersIdSet = new Set()

function setUpdater(){
    currentOrdersIdSet = new Set(currentOrdersId)
}

const orderIdPair = {}
menuArray.forEach((menu) =>{
    orderIdPair[menu.id] = [menu.name,menu.price]
})
orderBtn.addEventListener("click" , function(){
    if(currentOrdersId.length > 0){
        cardDetails.style.display = "flex"
    }else{
        alert("Please select an item to order🥹")
    }
})

menuContainer.innerHTML = menuArray.map((menu) =>{
    const {name , ingredients ,id ,price ,emoji} = menu
    return `<div class="menu" id= ${id}>
                <div class="menuMain">
                    <div class="menuEmoji">${emoji}</div>
                    <div class="menu-discription">
                        <p class="name">${name}</p>
                        <p class="ingredients">${ingredients}</p>
                        <p class="price">$${price}</p>
                    </div>
                </div>
                <div class="${id}">
                    <i class="fa-solid fa-circle-plus"></i>
                </div>
            </div>`
       
}).join("")

function createQuantityHashmap(){
    const quantityHashmap = {}
    currentOrdersId.forEach((id) =>{
        quantityHashmap[id] = (quantityHashmap[id] || 0) + 1
    })
    return quantityHashmap
}

function renderTotalPrice(){
    totalPrice.innerHTML = "$"+currentOrdersId.reduce((finalPrice , eachPrice) =>{
        return finalPrice + Number(orderIdPair[eachPrice][1])
    } ,0)
}

menuContainer.addEventListener("click" , function(e){
        if (e.target.parentElement.className in orderIdPair){
            if ((currentOrdersId.includes(e.target.parentElement.className))){
                currentOrdersId.push(e.target.parentElement.className)
            }else{
                currentOrdersId.push(e.target.parentElement.className)
            }
        }
        orderTitle.innerHTML = "See who's hungry, not me😎"
        renderTotalPrice()
        renderOrder()
})

orderDetails.addEventListener("click" , function(e){
        if (e.target.dataset.remove){
            currentOrdersId.splice(currentOrdersId.indexOf(e.target.dataset.remove),1)
        }
        if(currentOrdersId.length === 0){
            orderTitle.innerHTML = "you not hungry yet🤔?"
        }

        renderTotalPrice()
        renderOrder()
})

cardForm.addEventListener("submit" , (e) =>{
    e.preventDefault()
    customerName = e.target.fullName.value
    finalMessage.innerHTML =`<p>Thanks, ${customerName}! Your order is on its way!</p>`
    finalMessage.style.display = "flex"
    cardDetails.style.display = "none"
    orderContainer.style.display = "none"
})

function renderOrder(){
    const orderContainer = document.getElementById("orders")
    setUpdater()
    orderContainer.innerHTML =Array.from(currentOrdersIdSet).map((id)=>{
        return `<div class="order-list">
                    <div class="indvidual-item">
                        <p class="item-name">${orderIdPair[id][0]}</p>
                        <button class="remove-btn" data-remove = ${id}>remove</button>
                    </div>
                    <div>
                    <p class="item-price">$${orderIdPair[id][1]} x ${createQuantityHashmap()[id]}</p>
                    </div>
                </div>`
    }).join(``)
}

renderOrder()
renderTotalPrice()
