document.addEventListener('DOMContentLoaded', () => {
    //Табы
    let tabs = document.querySelectorAll('.tabheader__item'),
        content = document.querySelectorAll(".tabcontent"),
        tabMain = document.querySelector('.tabheader__items');
    
    function hideTubContent() {
        content.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
            item.classList.remove('fade');
        })
        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTubContent(i = 0) {
        content[i].classList.add('show');
        content[i].classList.remove('hide');
        content[i].classList.add('fade');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTubContent();
    showTubContent();

    tabMain.addEventListener('click', (event) =>{
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item2, i)=>{
                if (item2 == target) {
                    hideTubContent();
                    showTubContent(i);
                };
            });
        }
    })


    //Таймер
    let timer = document.querySelector('.timer'),
        c
    
    deadline = '2021-03-10'

    function getTime (endtime) {
        let t = Date.parse(endtime) - new Date();
        
        let days = Math.floor((t/1000/60/60/24)),
            hours = Math.floor((t/1000/60/60%24)),
            minutes = Math.floor((t/1000/60%60)),
            seconds = Math.floor((t/1000%60));
        
        return {
            t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero (num) {
        if (num>=0 && num<10) {
            return `0${num}`
        }else {
            return num
        }
    }
    //Решение Петриченко
    // function setClock(clock, time) {
    //     let days = clock.querySelector('#days'),
    //         minutes = clock.querySelector('#minutes'),
    //         hours = clock.querySelector('#hours'),
    //         seconds = clock.querySelector('#seconds');

    //     updateClock();
    //     let timerId = setInterval(updateClock, 1000);

    //     function updateClock() {
    //         let t = getTime(time);
    //         days.textContent = getZero(t.days);
    //         minutes.textContent = getZero(t.minutes);
    //         hours.textContent = getZero(t.hours);
    //         seconds.textContent = getZero(t.seconds);
    //         if (t.t<=0) {
    //             clearInterval(timerId);
    //         }
    //     }
    // }
    
    // setClock(timer, deadline);
    function setClock(clock, time) {
            let days = clock.querySelector('#days'),
                minutes = clock.querySelector('#minutes'),
                hours = clock.querySelector('#hours'),
                seconds = clock.querySelector('#seconds');
            days.textContent = getZero(time.days);
            minutes.textContent = getZero(time.minutes);
            hours.textContent = getZero(time.hours);
            seconds.textContent = getZero(time.seconds);
    }
    
    setClock(timer, getTime(deadline))

    let timerId = setInterval(() => {
        t=getTime(deadline);
        setClock(timer, t)
        if (t.t<=0) {
            clearInterval(timerId);
        }
    }, 1000);


    //Модальное окно
    modalButton = document.querySelectorAll("[data-modal]");
    form = document.querySelector(".modal");
    closeb = document.querySelector(".modal__close");

    // function visabilityChange(item) {
    //     if (window.getComputedStyle(item).display == 'none'){
    //         if (item.classList.contains('show')) {
    //             console.log('test')
    //             form.classList.remove("show");
    //         } else{
    //             console.log('test2')
    //             form.classList.add('show');
    //         }
    //     }else{
    //         if (item.classList.contains('hide')) {
    //             console.log('test3')
    //             form.classList.remove("hide");
    //         } else{
    //             form.classList.add('hide');
    //             console.log('test4')
    //     }
    //     }
    // }
    function visabilityChange(item) {
        if (window.getComputedStyle(item).display == 'none'){
            form.classList.remove("hide");
            form.classList.add("show");
            clearInterval(ModalTimerID);
            }else{
            form.classList.toggle("show");
            form.classList.toggle("hide");
        }
    }
    
    function overFlowChange() {
        if (document.body.style.overflow == 'hidden') {
            document.body.style.overflow = '';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    modalButton.forEach((item) => {
        item.addEventListener('click', () => {
            visabilityChange(form);
            overFlowChange();
        })
    })

    closeb.addEventListener('click', () => {
        visabilityChange(form);
        overFlowChange();
    })

    form.addEventListener('click', (e) =>{
        if (e.target === form) {
            visabilityChange(form);
            overFlowChange();
        }
    })

    document.addEventListener('keydown', (e) =>{
        if (e.code==='Escape'){
            console.log('escape keydown');
        }
        if (e.code === 'Escape' && form.classList.contains('show')) {
            visabilityChange(form);
            overFlowChange();
        }
    })

    let ModalTimerID = setTimeout(() => {
        visabilityChange(form);
        overFlowChange();
    }, 20000);

    function windowEndModal() {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            visabilityChange(form);
            overFlowChange();
            window.removeEventListener('scroll', windowEndModal);
        }
    };

    window.addEventListener('scroll', windowEndModal);

    class MenuCards {
        constructor(src,alt, title, descr,price,course,parentSelector, ...classes){
            this.src=src;
            this.alt=alt;
            this.title=title;
            this.descr=descr;
            this.price=price;
            this.classes = classes;
            this.course=course;
            this.parent=document.querySelector(parentSelector);;
            this.changeCourse();
        }

            changeCourse() {
                this.price=this.price*this.course;
            };

            render() {
                const element = document.createElement('div');
                this.classes.forEach(className => element.classList.add(className));
                this.element = 'menu__item';
                if (this.classes.length === 0) {
                    element.classList.add(this.element);
                }
                element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                `;
                this.parent.append(element);
            };
        
    }

    new MenuCards(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        17,
        27,
        '.menu .container',
        'menu__item',
        'classBig'
    ).render();

    new MenuCards(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        13,
        27,
        '.menu .container'        
    ).render();

    new MenuCards(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        12,
        27,
        '.menu .container',
        'menu__item',
        'classBig'
    ).render();

    // forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загузка',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что то пошло не так...'
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //изменяет стандартное поведение браузера (перезагрузка)
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);
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
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        })
    }
});





