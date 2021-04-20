//BU по XMLHttpRequest
const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/modal/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что то пошло не так...'
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //изменяет стандартное поведение браузера (перезагрузка)
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading; 
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto; 
            `;
            form.insertAdjacentElement("afterend",statusMessage);
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');//обязательная первая часть

            // request.setRequestHeader('Content-type', 'multipart/form-data');//Эта строчка не нужна при обычном формате. Здесь ее поначалу написали для наглядности, потом удалили.последняя часть для обычного формата строки, не для JSON
            request.setRequestHeader('Content-type', 'application/json');//Для JSON заголовок нужен
            const formData = new FormData(form);

            const object = {};//Это и конструкция (4 строчки) ниже перегоняет formData в JSON
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            //request.send(formData);//Для версии со строкой
            request.send(json);
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                    statusMessage.remove();
                }
            });
        })
    }