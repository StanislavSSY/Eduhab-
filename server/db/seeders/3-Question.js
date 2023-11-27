/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          questionTitle:
            'Кто автор фразы "Я мыслю, следовательно, я существую"?',
          questionAnswer: 'Рене Декарт',
          categoryId: 1,
          points: 200,
        },
        {
          questionTitle:
            'Этот древнегреческий философ был учеником Сократа и учителем Аристотеля.',
          questionAnswer: 'Платон',
          categoryId: 1,
          points: 400,
        },
        {
          questionTitle: 'Кто написал "Критику чистого разума"?',
          questionAnswer: 'Иммануил Кант',
          categoryId: 1,
          points: 600,
        },
        {
          questionTitle: 'Французский философ, автор "Социального договора".',
          questionAnswer: 'Жан-Жак Руссо',
          categoryId: 1,
          points: 800,
        },
        {
          questionTitle:
            'Этот философ считается основателем школы экзистенциализма.',
          questionAnswer: 'Жан-Поль Сартр',
          categoryId: 1,
          points: 1000,
        },
        {
          questionTitle:
            'Как называется шахматная фигура, двигающаяся только по диагонали?',
          questionAnswer: 'Слон',
          categoryId: 2,
          points: 200,
        },
        {
          questionTitle: 'Какой ход в шахматах называется "рокировкой"?',
          questionAnswer: 'Одновременный ход короля и ладьи',
          categoryId: 2,
          points: 400,
        },
        {
          questionTitle:
            'Кто стал первым официальным чемпионом мира по шахматам в 1886 году?',
          questionAnswer: 'Вильгельм Стейниц',
          categoryId: 2,
          points: 600,
        },
        {
          questionTitle:
            'Этот термин описывает ситуацию, когда король не находится под шахом, но любой его ход приведет к шаху.',
          questionAnswer: 'Пат',
          categoryId: 2,
          points: 800,
        },
        {
          questionTitle:
            'Как называется самая короткая партия, завершающаяся матом?',
          questionAnswer: 'Детский мат',
          categoryId: 2,
          points: 1000,
        },
        {
          questionTitle:
            'Какая страна известна своими ветряными мельницами и тюльпанами?',
          questionAnswer: 'Нидерланды',
          categoryId: 3,
          points: 200,
        },
        {
          questionTitle: 'Какой город является столицей Японии?',
          questionAnswer: 'Токио',
          categoryId: 3,
          points: 400,
        },
        {
          questionTitle: 'В какой стране находится знаменитая пирамида Хеопса?',
          questionAnswer: 'Египет',
          categoryId: 3,
          points: 600,
        },
        {
          questionTitle: 'Этот язык является официальным в Бразилии',
          questionAnswer: 'Португальский',
          categoryId: 3,
          points: 800,
        },
        {
          questionTitle:
            'Какая страна известна как место происхождения Кангуру?',
          questionAnswer: 'Австралия',
          categoryId: 3,
          points: 1000,
        },
        {
          questionTitle:
            'Кто часто появляется на фоне в зуме Стаса?',
          questionAnswer: 'Гослинг',
          categoryId: 4,
          points: 200,
        },
        {
          questionTitle: 'Любимый актер Стаса Януть?',
          questionAnswer: 'Гослинг',
          categoryId: 4,
          points: 400,
        },
        {
          questionTitle: 'Домашнее животное Стаса',
          questionAnswer: 'Кот',
          categoryId: 4,
          points: 600,
        },
        {
          questionTitle: 'Любимая видеоигра Стаса',
          questionAnswer: 'Фортнайт',
          categoryId: 4,
          points: 800,
        },
        {
          questionTitle:
            'На каком языке писал Стас до Эльбруса? ',
          questionAnswer: 'Русский',
          categoryId: 4,
          points: 1000,
        },
        {
          questionTitle:
            'Кто крестный отец Гарри?',
          questionAnswer: 'Сириус Блэк',
          categoryId: 5,
          points: 200,
        },
        {
          questionTitle: 'Профессия обоих родителей Гермионы?',
          questionAnswer: 'Дантист',
          categoryId: 5,
          points: 400,
        },
        {
          questionTitle: 'ДВ кого превратилась Гермиона выпив оборотное зелье?',
          questionAnswer: 'Кошка',
          categoryId: 5,
          points: 600,
        },
        {
          questionTitle: 'Серьги в виде какого овоща носила Полумна Лавгуд?',
          questionAnswer: 'Редиска',
          categoryId: 5,
          points: 800,
        },
        {
          questionTitle:
            'Из какого дерева сделана палочка Драко Малфоя?',
          questionAnswer: 'Боярышник',
          categoryId: 5,
          points: 1000,
        },
        {
          questionTitle:
            'Фамилия певца, который неистово жмет на кнопку?',
          questionAnswer: 'Агутин',
          categoryId: 6,
          points: 200,
        },
        {
          questionTitle: 'Фамилия актера, протягивающего вам бокал?',
          questionAnswer: 'ДиКаприо',
          categoryId: 6,
          points: 400,
        },
        {
          questionTitle: 'Имя скрывающего боль старика?',
          questionAnswer: 'Гарольд',
          categoryId: 6,
          points: 600,
        },
        {
          questionTitle: 'Имя самого известного мемного лягушонка?',
          questionAnswer: 'Пепе',
          categoryId: 6,
          points: 800,
        },
        {
          questionTitle:
            'Мемная собака, получившая свою крипту?',
          questionAnswer: 'Доге',
          categoryId: 6,
          points: 1000,
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
