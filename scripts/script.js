// Books are stored in the form of object arrays
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Display the books in the page
function display(){
    let library = document.querySelector(".book-container");
    library.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let bookWrapper = document.createElement('div');
        bookWrapper.className = "book";
        library.appendChild(bookWrapper);
        let bookName = document.createElement('p');
        bookName.innerText = book.title;
        let bookAuthor = document.createElement('p');
        bookAuthor.innerText = book.author;
        let bookPages = document.createElement('p');
        bookPages.innerText = book.pages;
        let bookRead = document.createElement('p');
        let removeButton = document.createElement('button');
        removeButton.innerText = "Remove";
        removeButton.className = "remove-button";
        removeButton.dataset.index = i;
        if (book.read == true){
            bookRead.innerText = "Read already";
        }
        else{
            bookRead.innerText = "Not read yet";
        }
        bookWrapper.appendChild(bookName);
        bookWrapper.appendChild(bookAuthor);
        bookWrapper.appendChild(bookPages);
        bookWrapper.appendChild(bookRead);
        bookWrapper.appendChild(removeButton);
    }
}

// Add book to the object array
function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(myLibrary);
    display();
}


let addNewBookBtn = document.querySelector('#add-book-button');
let formDialog = document.querySelector('#form-dialog');

// Display the book form when pressing the add new book button
addNewBookBtn.addEventListener('click', () => {
    formDialog.showModal()
});

let bookForm = document.querySelector('#book-form');

// Submit button 
bookForm.addEventListener('submit', function(event){
    event.preventDefault();
    addBookToLibrary();
    bookForm.reset();
    formDialog.close();
})

// Remove button
function remove(index){
    myLibrary.splice(index, 1);
    display();
    console.log(myLibrary);
}

document.addEventListener('click', function(event){
    if (event.target && event.target.className == 'remove-button') {
        let index = event.target.dataset.index; // Get the index from the data attribute
        remove(index);
    }
});

// Close the modal box when user clicks outside the modal
formDialog.addEventListener("click", e => {
    const dialogDimensions = formDialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      formDialog.close()
    }
})