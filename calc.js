// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    document.getElementById('btn_op_sign').onclick = function() {
        if (selectedOperation) {
          // Если выбрана операция, меняем знак у второго числа (b)
          if (b !== '') {
            b = (-parseFloat(b)).toString();
            outputElement.innerHTML = b;
          }
        } else {
          // Если операция не выбрана, меняем знак у первого числа (a)
          if (a !== '') {
            a = (-parseFloat(a)).toString();
            outputElement.innerHTML = a;
          }
        }
      };

      document.getElementById('btn_op_percent').onclick = function() {
        if (selectedOperation) {
          // Если выбрана операция, вычисляем процент от второго числа (b)
          if (b !== '') {
            b = (parseFloat(b) / 100).toString();
            outputElement.innerHTML = b;
          }
        } else {
          // Если операция не выбрана, вычисляем процент от первого числа (a)
          if (a !== '') {
            a = (parseFloat(a) / 100).toString();
            outputElement.innerHTML = a;
          }
        }
      };
      document.querySelector('.theme-toggle').onclick = function() {
        const body = document.body;
      
        // Проверяем текущую тему и переключаем на следующую
        if (body.classList.contains('theme-dark')) {
          // Переключаем с тёмной темы на светлую
          body.classList.remove('theme-dark');
          body.classList.add('theme-light');
        } else if (body.classList.contains('theme-light')) {
          // Переключаем со светлой темы на фоновую картинку
          body.classList.remove('theme-light');
          body.classList.add('theme-image');
        } else {
          // Переключаем с фоновой картинки на тёмную тему
          body.classList.remove('theme-image');
          body.classList.add('theme-dark');
        }
      };
      document.getElementById('btn_backspace').onclick = function() {
        if (selectedOperation) {
          // Если выбрана операция, удаляем последнюю цифру из второго числа (b)
          if (b !== '') {
            b = b.slice(0, -1); // Удаляем последний символ
            outputElement.innerHTML = b || '0'; // Если строка пустая, показываем 0
          }
        } else {
          // Если операция не выбрана, удаляем последнюю цифру из первого числа (a)
          if (a !== '') {
            a = a.slice(0, -1); // Удаляем последний символ
            outputElement.innerHTML = a || '0'; // Если строка пустая, показываем 0
          }
        }
      };
      // кнопка квадратного корня
    document.getElementById('btn_op_sqrt').onclick = function() {
    if (selectedOperation) {
      // Если выбрана операция, вычисляем квадратный корень второго числа (b)
      if (b !== '') {
        const number = parseFloat(b);
        if (number >= 0) {
          b = Math.sqrt(number).toString();
          outputElement.innerHTML = b;
        } else {
          outputElement.innerHTML = 'Ошибка'; // Отрицательное число под корнем
        }
      }
    } else {
      // Если операция не выбрана, вычисляем квадратный корень первого числа (a)
      if (a !== '') {
        const number = parseFloat(a);
        if (number >= 0) {
          a = Math.sqrt(number).toString();
          outputElement.innerHTML = a;
        } else {
          outputElement.innerHTML = 'Ошибка'; // Отрицательное число под корнем
        }
      }
    }
    };
    document.getElementById('btn_op_square').onclick = function() {
        if (selectedOperation) {
          // Если выбрана операция, возводим в квадрат второе число (b)
          if (b !== '') {
            const number = parseFloat(b);
            b = (number * number).toString();
            outputElement.innerHTML = b;
          }
        } else {
          // Если операция не выбрана, возводим в квадрат первое число (a)
          if (a !== '') {
            const number = parseFloat(a);
            a = (number * number).toString();
            outputElement.innerHTML = a;
          }
        }
      };
      function factorial(n) {
        if (n === 0 || n === 1) return 1; // Факториал 0 и 1 равен 1
        let result = 1;
        for (let i = 2; i <= n; i++) {
          result *= i;
        }
        return result;
      }
      
      // Обработчик для кнопки факториала
      document.getElementById('btn_op_factorial').onclick = function() {
        if (selectedOperation) {
          // Если выбрана операция, вычисляем факториал второго числа (b)
          if (b !== '') {
            const number = parseFloat(b);
            if (number >= 0 && Number.isInteger(number)) {
              b = factorial(number).toString();
              outputElement.innerHTML = b;
            } else {
              outputElement.innerHTML = 'Ошибка'; // Отрицательное или нецелое число
            }
          }
        } else {
          // Если операция не выбрана, вычисляем факториал первого числа (a)
          if (a !== '') {
            const number = parseFloat(a);
            if (number >= 0 && Number.isInteger(number)) {
              a = factorial(number).toString();
              outputElement.innerHTML = a;
            } else {
              outputElement.innerHTML = 'Ошибка'; // Отрицательное или нецелое число
            }
          }
        }
      };
      // Обработчик для кнопки добавления трех нулей
    document.getElementById('btn_triple_zero').onclick = function() {
        if (!selectedOperation) {
        // Если операция не выбрана, добавляем три нуля к первому числу (a)
        a += '000';
        outputElement.innerHTML = a;
        } else {
        // Если операция выбрана, добавляем три нуля ко второму числу (b)
         b += '000';
        outputElement.innerHTML = b;
    }
     };
        // Добавляем переменную для хранения накапливаемого значения
let accumulatedValue = 0;

// Обработчик для накапливаемого сложения
document.getElementById("btn_accumulate_add").onclick = function() {
  if (a !== '') {
    accumulatedValue += parseFloat(a);
    outputElement.innerHTML = accumulatedValue;
    a = ''; // Сбрасываем текущее значение
  }
};

// Обработчик для накапливаемого вычитания
document.getElementById("btn_accumulate_sub").onclick = function() {
  if (a !== '') {
    accumulatedValue -= parseFloat(a);
    outputElement.innerHTML = accumulatedValue;
    a = ''; // Сбрасываем текущее значение
  }
};
let currentColorIndex = 0;

// Список классов для цветов фона
const colorClasses = [
  'result-color-1', // белый
  'result-color-2', // бежевый 
];

// Обработчик для кнопки смены цвета
document.getElementById('btn_change_color').onclick = function() {
  // Удаляем текущий класс цвета
  outputElement.classList.remove(colorClasses[currentColorIndex]);

  // Переключаемся на следующий цвет
  currentColorIndex = (currentColorIndex + 1) % colorClasses.length;

  // Добавляем новый класс цвета
  outputElement.classList.add(colorClasses[currentColorIndex]);
};
document.getElementById('btn_op_reciprocal').onclick = function() {
    if (selectedOperation) {
      // Если выбрана операция, применяем к второму числу (b)
      if (b !== '') {
        const number = parseFloat(b);
        if (number !== 0) {
          b = (1 / number).toString();
          outputElement.innerHTML = b;
        } else {
          outputElement.innerHTML = 'Ошибка'; // Деление на ноль
        }
      }
    } else {
      // Если операция не выбрана, применяем к первому числу (a)
      if (a !== '') {
        const number = parseFloat(a);
        if (number !== 0) {
          a = (1 / number).toString();
          outputElement.innerHTML = a;
        } else {
          outputElement.innerHTML = 'Ошибка'; // Деление на ноль
        }
      }
    }
  };      
};
    