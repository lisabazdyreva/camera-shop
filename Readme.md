# Camera shop

Camera shop - is an online shopping sevice to buy video and photo cameras. 


It has a pretty user friendly interface with a simple familiar structure. In application you can find everything you need to find a perfect product in a short time.


There is a filters user can select. Price arange, type of camera, professional level of camera. You can apply several filters at the same time to make you search more flexible and comfortable.


There is a sorting. You can sort cameras by price, by rating in defferent order. It also sum up with selected filters. So sorting is very convenient feature, because customer always pay attention on rating and especially price.

User can go to detailed information about camera by clicking a button from the main page. Every product has a block with description and features of the camera. You can toggle in tabs.

Below a detailed information there is a gallery with similar offers. You can directly add the offer to cart or open a detailed information from interactive gallery. 

Below the gallery you can view a list of comments with rating and add your owm comment by clicking a button on the right. 

Comment form has 5 fields to fill in and they all are required. As soon as you click the submit button, your comment will appear at the top in the list.

You can go to cart and view cameras you selected. Also user can apply a promo code and get the total price with discount.



## Структура проекта

---



### Запуск проекта

```bash
npm start
```

После запуска, приложение доступно для просмотра в браузере по адресу [http://localhost:3000](http://localhost:3000).

При сохранении изменений, проект перезапускается и обновляется в браузере. Таким образом, вы можете следить за разработкой проекта в режиме реального времени.

**Обратите внимание**, режим разработки настроен таким образом, при котором ошибки, найденные статическим анализатором кода **ESLint**, отображаются в той же вкладке браузера, в которой запущен проект.

### Запуск тестов

```bash
npm test
```

Запуск тестов приложения в интерактивном режиме.

В данном случае, имеются в виду тесты, которые вынесены в отдельные файлы, в имени которых присутствует суффикс `*.test.*`. Например, `app.test.tsx`.

Подробную информацию вы можете найти на странице [Запуск тестов](https://facebook.github.io/create-react-app/docs/running-tests).

### Проверка линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Анализ кода производится только в файлах, которые находятся в директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

### Сборка проекта

```bash
npm run build
```

Запуск сборки приложения.

В процессе сборки приложения, код приложения оптимизируется и минимизируется, для достижения наилучшей производительности.

Во время выполнения инструкций по сборке проекта, в корне проекта создается директория `build`, в которую будут помещены результирующие файлы. После сборки проект готов к публикации.

Подробную информацию вы можете найти на странице [Развертывание проекта](https://facebook.github.io/create-react-app/docs/deployment).

### Извлечение конфигурации проекта

```bash
npm run eject
```

**Обратите внимание**, при запуске команды `npm run eject` нет возможности вернуть внесённые изменения обратно!

Выполнение данной команды, `react-scripts` скопирует все конфигурационные файлы и скрипты в корень проекта. Данный процесс позволяет получить полный контроль над конфигурацией проекта.

Не используйте данную команду, если не уверены как именно она работает или к какому результату приведёт ее выполнение.
