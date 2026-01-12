const BASE_URL = "https://remotestorage-94f04-default-rtdb.europe-west1.firebasedatabase.app/";
let responseDbAsJson;
let saveToFirebase = [{},{},{},];

function init() {
    loadData("/bookStorage");
    // loadDataBase("/bookstoreDB")
    putDataBase("/bookstoreDB", books)
}

async function putDataBase(path="", data="") {
    const response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response.json()
}

async function loadDataBase(path="") {
    const response = await fetch(BASE_URL + path + ".json")
    responseDbAsJson = await response.json();
    console.log(responseDbAsJson);
}

function renderBooks() {
    let mainArea = document.getElementById('main');
    mainArea.innerHTML = '';

    for (let indexBook = 0; indexBook < books.length; indexBook++) {
        mainArea.innerHTML += getBookTemplate(indexBook);
        likeValidation(indexBook);
        renderComments(indexBook);
    }
    bookToSaveToFirebase();
    putData("/bookStorage", saveToFirebase);
}

function renderComments(indexBook) {
    let commentsTable = document.getElementById(`commentsTable${indexBook}`);
    commentsTable.innerHTML = '';
    if (books[indexBook].comments != null) {
        for (let indexComments = 0; indexComments < books[indexBook].comments.length; indexComments++) {
        commentsTable.innerHTML += getTableTemplate(indexBook, indexComments);
        }
    }
}

function addComment(indexBook) {
    // let username = prompt('Wie lautet ihr Benutzername?');
    let username = 'Matthias02';
    let inputCommentRef = document.getElementById(`inputComment${indexBook}`);
    let inputComment = inputCommentRef.value;
    if (inputComment != '') {
        books[indexBook].comments.unshift({'name': username, 'comment': inputComment});
    }
    renderBooks();
    inputCommentRef.value = '';
}

function likeValidation(indexBook) {
    let bookLiked = document.getElementById(`bookLike${indexBook}`);
    if (books[indexBook].liked == true) {
        bookLiked.classList.add('bookLiked');
    } else if (!books[indexBook].liked == true) {
        bookLiked.classList.remove('bookLiked');
    }
}

function likeDislike(indexBook) {
    let bookLiked = document.getElementById(`bookLike${indexBook}`);
    if (books[indexBook].liked == true) {
        books[indexBook].liked = false;
        books[indexBook].likes--;
        bookLiked.classList.remove('bookLiked');
    } else {
        books[indexBook].liked = true;
        books[indexBook].likes++;
        bookLiked.classList.add('bookLiked');
    }
    renderBooks();
}

function saveDataToBooks() {
    books.forEach((book, index) => {
        book.comments = saveToFirebase[0][index];
        book.likes = saveToFirebase[1][index];
        book.liked = saveToFirebase[2][index];
    });
}

function bookToSaveToFirebase() {
    books.forEach((book, index) => {
        saveToFirebase[0][index] = book.comments;
        saveToFirebase[1][index] = book.likes;
        saveToFirebase[2][index] = book.liked;
    });
}

async function putData(path="", data="") {
    const response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response.json()
}

async function loadData(path="") {
    const response = await fetch(BASE_URL + path + ".json")
    let responseAsJson = await response.json();
    if (responseAsJson[0] !== null && responseAsJson[1] !== null && responseAsJson[2] !== null) {
        saveToFirebase[0] = responseAsJson[0];
        saveToFirebase[1] = responseAsJson[1];
        saveToFirebase[2] = responseAsJson[2];
        saveDataToBooks();
        renderBooks();
    } else {
        bookToSaveToFirebase();
        renderBooks();
    }
}