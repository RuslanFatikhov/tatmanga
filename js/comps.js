 document.addEventListener("DOMContentLoaded", function () {
            // Функция для загрузки контента из файла
            function loadContent(url, elementId) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        document.getElementById(elementId).innerHTML = xhr.responseText;
                    }
                };
                xhr.send();
            }
    
            // Загрузка header.html в элемент с id "header"
            loadContent("components/header.html", "header");
    
            // Загрузка footer.html в элемент с id "footer"
            loadContent("components/footer.html", "footer");
});