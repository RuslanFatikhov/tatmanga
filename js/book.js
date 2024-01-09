// Подключаемся к файлу jojo.json
fetch('json/jojo.json')
    .then(response => response.json()) // Преобразуем ответ в формат JSON
    .then(data => {
        // Устанавливаем название книги в тег title
        document.getElementById('name').innerText = data.name;

        // Устанавливаем картинку обложки книги
        document.getElementById('cover').src = data.cover;

        //  Устанавливаем название книги в тег h2
        document.querySelector('.book h2').innerText = data.name;

        // Устанавливаем информацию о книге в тег p
        document.getElementById('desc').innerText = data.desc;

        // Добавление данных в список
        document.getElementById('type').innerText = data.type;
        document.getElementById('year').innerText = data.year;
        document.getElementById('author').innerText = data.author;
        document.getElementById('rating').innerText = data.rating;

        // Создаем список эпизодов манги
        const episodesList = document.getElementById('episodes');
        const episodes = data.episodes;

        // Перебираем каждый эпизод и создаем соответствующие элементы
        episodes.forEach(episode => {
            const listItem = document.createElement('li');
            const title = document.createElement('h4');

            // Формируем ссылку для каждого эпизода
            const episodeLink = document.createElement('a');
            episodeLink.href = `episode.html?episode=${episode.id}`;
            episodeLink.addEventListener('click', function() {
                // Можно добавить дополнительные действия перед переходом по ссылке, если необходимо
                window.location.href = episodeLink.href;
            });

            episodeLink.innerText = `${episode.title}`;

            // Добавляем созданные элементы в список эпизодов
            listItem.appendChild(episodeLink);
            listItem.appendChild(title);
            episodesList.appendChild(listItem);
        });

    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
