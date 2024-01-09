// Парсим параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const episodeId = urlParams.get('episode');

// Подключаемся к файлу jojo.json
fetch('json/jojo.json')
    .then(response => response.json()) // Преобразуем ответ в формат JSON
    .then(data => {
        const episode = data.episodes.find(ep => ep.id == episodeId);

        if (episode) {
            let currentImageIndex = 0;

            // Функция для обновления изображения, порядкового номера и общего количества фотографий
            const updateContent = () => {
                const currentImage = document.getElementById('currentImage');
                currentImage.src = episode.pages[currentImageIndex];

                const episodeTitle = document.getElementById('episodeTitle');
                episodeTitle.innerText = episode.title;

                const photoCounter = document.getElementById('photoCounter');
                photoCounter.innerText = `${currentImageIndex + 1} из ${episode.pages.length}`;
            };

            // Создаем элементы для галереи
            const gallery = document.getElementById('gallery');

            // Создаем элемент изображения и устанавливаем его id
            const currentImage = document.createElement('img');
            currentImage.id = 'currentImage';
            gallery.appendChild(currentImage);

            // Добавляем блок с порядковым номером и общим количеством фотографий
            const photoCounter = document.createElement('p');
            photoCounter.id = 'photoCounter';
            photoCounter.className = 'prime-invert200 counter'; // Добавляем класс
            gallery.parentNode.insertBefore(photoCounter, gallery);

            // Добавляем кнопку Next с изображением и классом left
            const nextButton = document.createElement('button');
            const nextButtonImage = document.createElement('img');
            nextButtonImage.src = 'src/icon/arrow=right.svg'; // Замените на путь к изображению
            nextButton.appendChild(nextButtonImage);
            nextButton.className = 'right ghost dark';
            nextButton.addEventListener('click', () => {
                if (currentImageIndex === episode.pages.length - 1) {
                    // Если достигнута последняя картинка текущего эпизода, открываем следующий эпизод
                    const nextEpisodeId = (episodeId + 1) % data.episodes.length;
                    window.location.href = `episode.html?episode=${nextEpisodeId}`;
                } else {
                    currentImageIndex = (currentImageIndex + 1) % episode.pages.length;
                    updateContent();
                }
            });

            // Добавляем кнопку Previous с изображением и классом left
            const prevButton = document.createElement('button');
            const prevButtonImage = document.createElement('img');
            prevButtonImage.src = 'src/icon/arrow=left.svg'; // Замените на путь к изображению
            prevButton.appendChild(prevButtonImage);
            prevButton.className = 'left ghost dark';
            prevButton.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + episode.pages.length) % episode.pages.length;
                updateContent();
            });

            // Вставляем кнопки перед блоком с галереей
            gallery.parentNode.insertBefore(nextButton, gallery);
            gallery.parentNode.insertBefore(prevButton, gallery);

            // Устанавливаем начальное изображение, порядковой номер и общее количество фотографий
            updateContent();
        } else {
            console.error('Эпизод не найден.');
        }
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
