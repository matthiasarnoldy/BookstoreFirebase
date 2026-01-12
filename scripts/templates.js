function getBookTemplate(indexBook) {
    return `
    <article class="book">
        <header class="bookHeadline">
            <h2 class="bookTitle">${responseDbAsJson[indexBook].name}</h2>
        </header>
        <main class="bookMain">
            <hr>
            <section class="bookImg">
                <img src="${responseDbAsJson[indexBook].source}" alt="Harry Potter und der Stein der Weisen" class="bookCover">
                <hr>
            </section>
            <section class="bookPresentation">
                <div class="bookPriceLike">
                    <h2 class="bookPrice">${parseFloat(responseDbAsJson[indexBook].price).toFixed(2).replace('\.', ',')}€</h2>
                    <div id="bookLike${indexBook}" class="bookLike"> 
                        <span class="bookLikeNumber">${responseDbAsJson[indexBook].likes}</span>
                        <svg onclick="likeDislike(${indexBook})" class="likeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 
                            327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 
                            157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 
                            327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 
                            320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 
                            371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 
                            151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 
                            358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 
                            543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 
                            402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 
                            280 116.5 305 151.1L320 171.8L335 151.1z"/>
                        </svg>
                        <svg onclick="likeDislike(${indexBook})" class="likedIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 
                            96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 
                            539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 
                            343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 
                            151.1z"/>
                        </svg>
                    </div>
                </div>
                <div class="bookInfo">
                    <table>
                        <tr>
                            <th>Author</th>
                            <td>: ${responseDbAsJson[indexBook].author}</td>
                        </tr>
                        <tr>
                            <th>Erscheinungsjahr</th>
                            <td>: ${responseDbAsJson[indexBook].publishedYear}</td>
                        </tr>
                        <tr>
                            <th>Genre</th>
                            <td>: ${responseDbAsJson[indexBook].genre}</td>
                        </tr>
                    </table>
                </div>
            </section>
            <hr>
            <section class="bookComments">
                <h3 class="commentsHeadline">Kommentare:</h3>
                <table id="commentsTable${indexBook}" class="commentsTable"></table>
                <div class="writeComment">
                    <input id="inputComment${indexBook}" type="text" class="commentWrite" placeholder="Schreibe dein Kommentar ...">
                    <button onclick="addComment(${indexBook})" class="commentSend">
                        <svg class="sendIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M322.5 351.7L523.4 150.9L391 520.3L322.5 351.7zM489.4 117L288.6 317.8L120 
                            249.3L489.4 117zM70.1 280.8L275.9 364.4L359.5 570.2C364.8 583.3 377.6 591.9 391.8 
                            591.9C406.5 591.9 419.6 582.7 424.6 568.8L602.6 72C606.1 62.2 603.6 51.4 596.3 
                            44C589 36.6 578.1 34.2 568.3 37.7L71.4 215.7C57.5 220.7 48.3 233.8 48.3 248.5C48.3 
                            262.7 56.9 275.5 70 280.8z"/>
                        </svg>
                    </button>
                </div>
            </section>
        </main>
    </article>
    `;
}

function getTableTemplate(indexBook, indexComments) {
    return `
    <tr>
        <th>${responseDbAsJson[indexBook].comments[indexComments].name}</th>
        <td>: ${responseDbAsJson[indexBook].comments[indexComments].comment}</td>
    </tr>
    `;
}