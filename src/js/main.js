(function () {
  const html = document.querySelector('html');

  const desktop = window.matchMedia('(min-width: 1248px)');


  // Плавно прокручивает к якорю
  const anchors = document.querySelectorAll('[data-action=scroll-to]');

  function scrollTo(event) {
    let redirection = this.getAttribute('href').split('#')[0],
        sectionId = this.getAttribute('href').split('#')[1];

    if (redirection != '/') {
      event.preventDefault();

      closeMenu(event);

      document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  anchors.forEach(anchor => anchor.addEventListener('click', scrollTo));


  // Фиксирует кнопку
  const formButton = document.querySelector('.form__button');

  function buttonFix() {
    if (desktop.matches) {
      let form = document.querySelector('.form'),
          size = form.getBoundingClientRect(),
          formSize = size.top + size.height - document.documentElement.clientHeight; // Последнее - высота блока с кнопкой

      let scrollTop = window.scrollY;

      if (scrollTop < 194) {
        form.style.height = size.height + 'px';
        formButton.classList.add('fixed');
        formButton.style.bottom = formSize + 'px';
      } else {
        form.style.height = 'auto';
        formButton.classList.remove('fixed');
        formButton.style.bottom = 'auto';
      }
    }
  }

  buttonFix();
  window.addEventListener('scroll', buttonFix);


  // Добавляет раскрывающийся список FAQ
  const allQuestions = document.querySelectorAll('.faq-list__question');

  function toggleQuestions() {
    let questionToggle = this.getAttribute('area-expanded');

    for (let i = 0; i < allQuestions.length; i++) {
      allQuestions[i].setAttribute('area-expanded', 'false');
    }

    if (questionToggle == 'false') {
      this.setAttribute('area-expanded', 'true');
    }
  }

  allQuestions.forEach(question => question.addEventListener('click', toggleQuestions));


  // Открывает меню
  const linkOpenMenu = document.querySelectorAll('[data-action=open-menu]');

  function openMenu(event) {
    event.preventDefault();

    let menu = document.querySelector('.menu');

    menu.classList.add('menu--open');
    html.style.overflowY = 'hidden';

    event.stopPropagation();
  }

  linkOpenMenu.forEach(link => link.addEventListener('click', openMenu));


  // Закрывает меню
  const linkCloseMenu = document.querySelectorAll('[data-action=close-menu]');

  function closeMenu(event) {
    event.preventDefault();

    let menu = document.querySelector('.menu');

    menu.classList.remove('menu--open');
    html.style.overflowY = 'visible';

    event.stopPropagation();
  }

  linkCloseMenu.forEach(link => link.addEventListener('click', closeMenu));


  // Открывает popup-окно
  const linkOpenPopup = document.querySelectorAll('[data-action=open-popup]');

  function openPopup(event, module) {
    event.preventDefault();

    let popup = document.querySelector('.popup');

    if (module === undefined) {
      module = this.getAttribute('data-popup');
    }

    popup.classList.add('popup--open');
    document.querySelector('.' + module).classList.add('popup__module--open');
    html.style.overflowY = 'hidden';
    // popup.style.height = screen.height;
  }

  linkOpenPopup.forEach(link => link.addEventListener('click', openPopup));


  // Закрывает popup-окно
  const linkClosePopup = document.querySelectorAll('[data-action=close-popup]');

  function closePopup(event) {
    event.preventDefault();

    let popup = document.querySelector('.popup'),
        modules = document.querySelectorAll('.popup__module');

    modules.forEach(module => {
      if (module.classList.contains('popup__module--open')) {
        module.classList.remove('popup__module--open');
      }
    });
    popup.classList.remove('popup--open');
    html.style.overflowY = 'visible';
  }

  linkClosePopup.forEach(link => link.addEventListener('click', closePopup));


  // Устанавливает фокус в форме
  // const linkFocusForm = document.querySelectorAll('[data-action=focus-form]');

  // function focusForm(event) {
  //   event.preventDefault();

  //   let loginForm = document.querySelector('input[name=login]');

  //   closePopup(event);

  //   loginForm.focus();
  // }

  // linkFocusForm.forEach(link => link.addEventListener('click', focusForm));


  // Выводит расcчеты
  const inputAmount = document.querySelectorAll('input[name=amount]');

  function calculation() {
    let amount = this.value.toLowerCase(),
        calculation = document.querySelector('.index-calculation'),
        calculationItems = document.querySelectorAll('.index-calculation__item');

    let percent = 6, // Комиссия
        commission = amount / 100 * percent,
        bankСommission = 25, // Комиссия банка
        steam = amount - commission - bankСommission; // Steam

    calculationItems.forEach((item, i) => {
      let value = item.querySelector('.index-calculation__value');

      if (i == 0) { value.querySelector('span').textContent = amount; }
      if (i == 1) {
        // Если комиссия больше введенной суммы, выводим 0
        if (steam > 0) { value.querySelector('span.sum span').textContent = steam.toFixed(2); }
        else { value.querySelector('span.sum span').textContent = '0.00'; }
      }
      if (i == 2) { value.querySelector('span').textContent = commission.toFixed(2); }
      if (i == 3) {
        if (amount > bankСommission) { value.querySelector('span').textContent = '~ ' + bankСommission.toFixed(2); }
        else { value.querySelector('span').textContent = '~ ' + (amount - commission).toFixed(2); }
      }
    });

    if (amount.length) {
      calculation.classList.add('index-calculation--open');
    } else {
      calculation.classList.remove('index-calculation--open');
    }
  }

  inputAmount.forEach(input => input.addEventListener('input', calculation));


  // Добавляет всплывающие подсказки
  const allTooltips = document.querySelectorAll('.index-calculation__tooltip');

  function toggleTooltips() {
    let tooltipToggle = this.getAttribute('area-expanded');

    for (let i = 0; i < allTooltips.length; i++) {
      allTooltips[i].setAttribute('area-expanded', 'false');
    }

    if (tooltipToggle == 'false') {
      this.setAttribute('area-expanded', 'true');
    }
  }

  if (window.innerWidth < 1248) {
    allTooltips.forEach(tooltip => tooltip.addEventListener('click', toggleTooltips));
  }


  // Подключает кастомный select
  const linkOpenOptions = document.querySelectorAll('[data-action=toggle-options]');
  const linkSelectOption = document.querySelectorAll('[data-action=select-option]');
  const linkTabs = document.querySelectorAll('[data-action=select-tab]');

  function toggleOptions(event) {
    event.preventDefault();

    let options = document.querySelector('.select-options'),
        iconArrow = this.querySelector('.select-arrow');

    if (options.classList.contains('select-options--open')) {
      options.classList.remove('select-options--open');
      iconArrow.classList.remove('select-arrow--rotate');
    } else {
      options.classList.add('select-options--open');
      iconArrow.classList.add('select-arrow--rotate');
    }
  }

  linkOpenOptions.forEach(link => link.addEventListener('click', toggleOptions));

  function selectOption(event) {
    event.preventDefault();

    let select = document.querySelector('.select'),
        hiddenInput = select.querySelector('input[name=payment]'),
        newValue = this.getAttribute('data-value'),
        image = select.querySelector('.select-image'),
        svg = this.querySelector('.select-options__icon').innerHTML,
        options = document.querySelector('.select-options'),
        iconArrow = select.querySelector('.select-arrow');

    linkSelectOption.forEach(link => link.classList.remove('active'));
    this.classList.add('active');

    hiddenInput.value = newValue;
    image.innerHTML = svg;
    options.classList.remove('select-options--open');
    iconArrow.classList.remove('select-arrow--rotate');
  }

  linkSelectOption.forEach(link => link.addEventListener('click', selectOption));

  function selectTab(event) {
    event.preventDefault();

    let select = document.querySelector('.select'),
        hiddenInput = select.querySelector('input[name=payment]'),
        newValue = this.getAttribute('data-value'),
        tabs = document.querySelectorAll('.select-tabs__item'),
        tab = this.closest('.select-tabs__item');

    hiddenInput.value = newValue;

    tabs.forEach(tab => {
      if (tab.classList.contains('select-tabs__item--active')) {
        tab.classList.remove('select-tabs__item--active');
      }
    });
    tab.classList.add('select-tabs__item--active');
  }

  linkTabs.forEach(link => link.addEventListener('click', selectTab));


  // Обрабатывает отправку форм
  const buttons = document.querySelectorAll('[data-action=send-form]');

  document.querySelector('input[name=login]')?.addEventListener('input', function (event) {
    let parent = this.parentNode;

    parent.querySelector('.form__error').classList.remove('open');
    this.classList.remove('error');
  });

  document.querySelector('input[name=amount]')?.addEventListener('input', function (event) {
    let parent = this.parentNode;

    parent.querySelector('.form__error').classList.remove('open');
    parent.querySelector('.form__error-2').classList.remove('open');
    this.classList.remove('error');
  });

  document.querySelector('input[name=email]')?.addEventListener('input', function (event) {
    let parent = this.parentNode;

    parent.querySelector('.form__error').classList.remove('open');
    this.classList.remove('error');
  });

  document.querySelector('input[name=promo]')?.addEventListener('input', function (event) {
    let parent = this.parentNode;

    parent.querySelector('.form__error-2').classList.remove('open');
    this.classList.remove('error');
  });

  function submitForm(event) {
    event.preventDefault();

    let form = this.closest('form'),
        formName = form.getAttribute('name');

    let login = form.querySelector('input[name=login]').value,
        amount = form.querySelector('input[name=amount]').value,
        email = form.querySelector('input[name=email]').value,
        promo = form.querySelector('input[name=promo]').value,
        payment = form.querySelector('input[name=payment]').value,
        url = '/index.php?login=' + login + '&amount=' + amount + '&email=' + email + '&promo=' + promo + '&payment=' + payment; // Адрес файла принимающего данные формы

    // Добавляет disabled к кнопке, при попытке отправить пустую форму
    checkInput(form);

    if (this.classList.contains('disabled')) {
      // Подсвечивает незаполненные поля
      form.querySelectorAll('.empty').forEach(selector => {
        let parent = selector.parentNode

        parent.querySelector('.form__error').classList.add('open');
        selector.classList.add('error');
      });

      if (amount != '' && amount < 200) {
        form.querySelector('.form__error-2').classList.add('open');
        form.querySelector('input[name=amount]').classList.add('error');
      }
    }

    else {
      if (amount < 200) {
        form.querySelector('.form__error-2').classList.add('open');
        form.querySelector('input[name=amount]').classList.add('error');
      } else {
        // Отправляет форму
        const request = new XMLHttpRequest();

        request.open('GET', url);
        request.setRequestHeader('Content-Type', 'application/x-www-form-url');
        request.addEventListener('readystatechange', () => {
          if (request.readyState === 4 && request.status === 200) {
            console.log(request.responseText);
          }
        });

        // Очищает заполненные поля формы
        form.querySelectorAll('input[name=login], input[name=amount], input[name=email]').forEach(item => {
          item.value = '';

          // Скрывает рассчеты
          let calculation = document.querySelector('.index-calculation');

          calculation.classList.remove('index-calculation--open');
        });

        // Открывает попап "Заявка принята"
        openPopup(event, 'accepted');
      }
    }
  }

  // Проверяет заполнение обязательных полей формы и блокирует кнопку
  function checkInput(form) {
    let button = form.querySelector('[data-action=send-form]');

    form.querySelectorAll('input, textarea').forEach(selector => {
      if (selector.hasAttribute('required')) {
        if (selector.value.length < 1) {
          selector.classList.add('empty');
        } else {
          selector.classList.remove('empty');
        }
      }
    });

    let countEmpty = form.querySelectorAll('.empty').length;

    if (countEmpty > 0) {
      if (!button.classList.contains('disabled')) {
        button.classList.add('disabled');
      }
    } else {
      button.classList.remove('disabled');
    }
  }

  buttons.forEach(button => button.addEventListener('click', submitForm));


  // Промокод
  const inputPromo = document.querySelectorAll('input[name=promo]'),
        actionPromo = document.querySelectorAll('.form__action');

  function promo() {
    let value = this.value.toLowerCase();

    if (value.length) {
      inputPromo.forEach(input => input.classList.remove('active'));
      actionPromo.forEach(action => action.classList.add('open'));
    } else {
      actionPromo.forEach(action => action.classList.remove('open'));
    }
  }

  inputPromo.forEach(input => input.addEventListener('input', promo));


  const linkClosePromo = document.querySelectorAll('[data-action=close-promo]');
  const linkCheckPromo = document.querySelectorAll('[data-action=check-promo]');

  function closePromo(event) {
    event.preventDefault();

    document.querySelector('span.promo').textContent = '(-30%)';
    document.querySelector('span.service').classList.remove('open');

    inputPromo.forEach(input => {
      input.value = '';
      input.classList.remove('active');
      input.classList.remove('error');

      let parent = input.parentNode;

      parent.querySelector('.form__error-2').classList.remove('open');
    });
    actionPromo.forEach(action => action.classList.remove('open'));
  }

  function checkPromo(event) {
    event.preventDefault();

    inputPromo.forEach(input => {
      let code = input.value;

      // Отправляем запрос к серверу и проверяем промокод
      if (code === 'Sale10') {
        input.classList.add('active');

        document.querySelector('span.promo').textContent = '(-40%)';
        document.querySelector('span.service').classList.add('open');
      } else {
        input.parentNode.querySelector('.form__error-2').classList.add('open');
        input.classList.add('error');
      }
    });

    linkCheckPromo.forEach(link => link.parentNode.classList.remove('open'));
  }

  linkClosePromo.forEach(link => link.addEventListener('click', closePromo));
  linkCheckPromo.forEach(link => link.addEventListener('click', checkPromo));


  // Добавляет всплывающие блоки
  const objectWrappers = document.querySelectorAll('.object-wrapper');

  objectWrappers.forEach(objectWrapper => {
    let objects = objectWrapper.querySelectorAll('.object');

    objects.forEach(object => {
      object.classList.remove('object-animation');

      let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (typeof getCurrentAnimationPreference === 'function' && !getCurrentAnimationPreference()) {
            return;
          }

          if (entry.isIntersecting) {
            object.classList.add('object-animation');
            return;
          }

          object.classList.remove('object-animation');
        });
      });

      observer.observe(objectWrapper);
    });
  });
})();
