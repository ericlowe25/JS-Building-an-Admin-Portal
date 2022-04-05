
// Your Code Here
async function main() {
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()
    
    books.forEach(quantityUpdater)
    books.forEach(saveHandler)
}

function quantityUpdater(book){
    let bookContainer = document.querySelector('.list-group')
    bookContainer.innerHTML += `
        <li class="list-group-item">
            <label for="book${book.id}">${book.title}</label>
            <input class="form-inline" type="text" name="book${book.id}" id="book${book.id}Input">
            <button id="book${book.id}Button" class="btn btn-light" type="button">Save</button>
        </li>
    `
}
async function quantityServerUpdater(id, quantity){
    let response = await fetch('http://localhost:3001/updateBook', {
        method: "PATCH", 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            "id": id, 
            "quantity": quantity
        })});

}

async function saveHandler(book){
    document.getElementById(`book${book.id}Button`)
        .addEventListener('click', async () => {
            let quantityInput = document.getElementById(`book${book.id}Input`)
            let newQuantity = quantityInput.value;

            if (isNaN(newQuantity)){
                window.alert('Your entry is not a number')
            } else {
                await quantityServerUpdater(book.id, newQuantity)
                window.alert('Quantity updated!')
            }
        })
}

main()
