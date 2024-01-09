// Парсим параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const episodeId = urlParams.get('episode');

// Подключаемся к файлу jojo.json
fetch('json/jojo.json')
    .then(response => response.json()) // Преобразуем ответ в формат JSON
    .then(data => {
        const episode = data.episodes.find(ep => ep.id == episodeId);

        if (episode) {
            document.getElementById('episodeTitle').innerText = `${episode.title}`;
            
            const gallery = document.getElementById('gallery');

            // Создаем элементы для каждой страницы эпизода
            episode.pages.forEach(page => {
                const image = document.createElement('img');
                image.src = page;
                gallery.appendChild(image);
            });
        } else {
            console.error('Эпизод не найден.');
        }
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
