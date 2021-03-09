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
            console.log('test_3');
            form.classList.remove("hide");
            form.classList.add("show");
            clearInterval(ModalTimerID);
            }else{
            console.log('test_1', form.classList);
            form.classList.toggle("show");
            form.classList.toggle("hide");
            console.log('test_2', form.classList);
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
        if (e.code = 'Escape' && form.classList.contains('show')) {
            visabilityChange(form);
            overFlowChange();
        }
    })

    let ModalTimerID = setTimeout(() => {
        visabilityChange(form);
        overFlowChange();
    }, 5000);

    function windowEndModal() {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            visabilityChange(form);
            overFlowChange();
            window.removeEventListener('scroll', windowEndModal);
        }
    };

    window.addEventListener('scroll', windowEndModal);
})





