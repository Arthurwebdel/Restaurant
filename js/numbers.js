
  window.addEventListener('DOMContentLoaded', () => { // Структура страницы загружена и готова к взаимодействию

    const countNums = () => { // объявляем функцию, чтобы всё, что относится к анимированию чисел было в одном месте
      const numbersObserver = new IntersectionObserver((entries, observer) => { // создаём наблюдатель за элементами, в которых будем увеличивать значение числа
        entries.forEach(entry => { // для каждого наблюдаемого элемента
          if (entry.isIntersecting) { // проверяем, находится ли он в видимой области браузера
            const count = new CountUp( // настраиваем новую анимацию для числа
              entry.target.id, // 1. задаём идентификатор элемента с числом
              0, // 2. задаём начальное число
              entry.target.dataset.num, // 3. задаём конечное число (берем из data-атрибута)
              0, // 4. задаём количество цифр после запятой
              entry.target.dataset.duration || 4, // 5. задаём продолжительность анимации в секундах (если у элемента есть атрибут data-duration, то берём из него значение, иначе назначаем 4 секунды по-умолчанию)
             
            );
            count.start(() => { // запускаем настроенную анимацию и по окончании анимации...
              entry.target.parentElement.classList.add('item_done') // ...добавляем активный класс родительскому элементу
            })
            observer.unobserve(entry.target);  // отключаем наблюдение за элементом
          }
         
        })
      
      });
      
      document.querySelectorAll('.item span').forEach(num => { // ищем элементы за которыми будем наблюдать, и для каждого...
        numbersObserver.observe(num) // ...запускаем наблюдение
      })
    }
    countNums() // запускаем объявленную функцию
  
  })