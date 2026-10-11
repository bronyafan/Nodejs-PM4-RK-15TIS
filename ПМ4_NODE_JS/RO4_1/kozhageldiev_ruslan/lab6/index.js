const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, 'books.json');

//task1
async function initLibrary(){
    try{
        await fs.access(filePath);
        console.log(`"books.json" already exists`);
    } catch(err){
        if(err.code === 'ENOENT'){
            await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf-8');
            console.log(`Created "books.json"`);
        } else{
            console.log(err);
        }
    }
}

//task2
async function addBook(title, author, year){
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        const books = JSON.parse(data);

        const newBook = {
            id: Date.now().toString(),
            title,
            author,
            year,
            isIssued: false
        };
        books.push(newBook);
        await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8');
        console.log(`Added a new book: "${title}"`);
    } catch(err){
        console.log(err);
    }
}

//task3
async function findBooksByAuthor(author) {
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        const books = JSON.parse(data);

        const foundBooks = books.filter(book => 
            book.author.toLowerCase() === author.toLowerCase()
        );
        console.log(`--- Книги автора: ${author} ---`);
        if (foundBooks.length > 0) {
            console.table(foundBooks);
        } else {
            console.log("Книги не найдены.");
        }
    } catch(err){
        console.log(err);
    }
}

//task4
async function issueBook(id) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const books = JSON.parse(data);

        const book = books.find(b => b.id === id);

        if (book) {
            book.isIssued = true;
            await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8');
            console.log(`The book with an ID ${id} ("${book.title}") was marked as "issued".`);
        } else {
            console.log(`A book with an ID ${id} wasn't found.`);
        }
    } catch (err) {
        console.log(err);
    }
}

//task5
async function deleteOldBooks(currentYear) {
    try{
        const data = await fs.readFile(filePath, 'utf-8');
        const books = JSON.parse(data);

        const modernBooks = books.filter(book => (currentYear - book.year) <= 50);

        await fs.writeFile(filePath, JSON.stringify(modernBooks, null, 2), 'utf-8');
        console.log(`Successfully deleted books that are 50 / over 50 years old.`);
    } catch (err) {
        console.log(err);
    }
}

async function run() {
    console.log('---------------------------------------');
    await initLibrary();

    console.log('---------------------------------------');
    await addBook('1984', 'George Orwell', 1949);
    await addBook('Clean Code', 'Robert Martin', 2008);

    console.log('---------------------------------------');
    await findBooksByAuthor('George Orwell');

    console.log('---------------------------------------');
    await deleteOldBooks(2026);
}

run();