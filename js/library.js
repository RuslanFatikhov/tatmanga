// Функция для создания карточки книги
function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('book');

    const titleSpan = document.createElement('span');
    
    const title = document.createElement('h3');
    title.textContent = book.name;
    title.classList.add('bold', 'prime100'); // Добавляем классы "bold" и "prime100" к <h3>
    titleSpan.appendChild(title);

    const episodeCount = document.createElement('p');
    episodeCount.textContent = `${book.episodes} бүлек`;
    episodeCount.classList.add('prime100'); // Добавляем классы "bold" и "prime100" к <p>
    titleSpan.appendChild(episodeCount);

    const cover = document.createElement('img');
    cover.src = book.cover;
    cover.alt = book.name;

    // Добавляем кнопку "Читать" внутрь карточки книги
    const readButton = document.createElement('button');
    readButton.textContent = 'Читать';
    readButton.classList.add('size-m', 'bg-accent100');
    readButton.addEventListener('click', () => {
        // Сохраняем данные в localStorage
        localStorage.setItem('bookData', JSON.stringify(book));
        // Переходим на страницу book.html
        window.location.href = 'book.html';
    });

    card.appendChild(cover);
    card.appendChild(titleSpan);
    card.appendChild(readButton); // Добавляем кнопку "Читать" к карточке книги

    return card;
}

// Функция для отображения книг в библиотеке
function displayBooks(libraryId, books) {
    const library = document.getElementById(libraryId);

    books.forEach(book => {
        const card = createBookCard(book);
        library.appendChild(card);
    });
}

// Загружаем данные из файла books.json
async function fetchBooksData() {
    try {
        const response = await fetch('json/books.json');
        const data = await response.json();

        if (Array.isArray(data)) {
            displayBooks('library', data);
        } else {
            console.error('Ошибка: Данные в файле books.json не являются массивом объектов.');
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

// Вызываем функцию загрузки данных
fetchBooksData();
