const BASE_URL = "https://remotestorage-94f04-default-rtdb.europe-west1.firebasedatabase.app/";
let saveLocal = [{},{},{},];

function init() {
    loadData("/bookStorage");
}

function renderBooks() {
    let mainArea = document.getElementById('main');
    mainArea.innerHTML = '';

    for (let indexBook = 0; indexBook < books.length; indexBook++) {
        mainArea.innerHTML += getBookTemplate(indexBook);
        likeValidation(indexBook);
        renderComments(indexBook);
    }
    bookToSaveLocal();
    putData("/bookStorage", saveLocal);
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
        book.comments = saveLocal[0][index];
        book.likes = saveLocal[1][index];
        book.liked = saveLocal[2][index];
    });
}

function bookToSaveLocal() {
    books.forEach((book, index) => {
        saveLocal[0][index] = book.comments;
        saveLocal[1][index] = book.likes;
        saveLocal[2][index] = book.liked;
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
    console.log(responseAsJson);
    if (responseAsJson[0] !== null && responseAsJson[1] !== null && responseAsJson[2] !== null) {
        saveLocal[0] = responseAsJson[0];
        saveLocal[1] = responseAsJson[1];
        saveLocal[2] = responseAsJson[2];
        saveDataToBooks();
        renderBooks();
    } else {
        bookToSaveLocal();
        renderBooks();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('comments', JSON.stringify(saveLocal[0]));
    localStorage.setItem('likeNumber', JSON.stringify(saveLocal[1]));
    localStorage.setItem('likeCondition', JSON.stringify(saveLocal[2]));
}

function getFromLocalStorage() {
    let commentsLocal = JSON.parse(localStorage.getItem('comments'));
    let likeNumberLocal = JSON.parse(localStorage.getItem('likeNumber'));
    let likeConditionLocal = JSON.parse(localStorage.getItem('likeCondition'));
    if (commentsLocal !== null) {
        saveLocal[0] = commentsLocal;
        saveLocal[1] = likeNumberLocal;
        saveLocal[2] = likeConditionLocal;
        saveDataToBooks();
    } else {
        bookToSaveLocal();
    }
}