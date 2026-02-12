import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                       const opt = document.createElement('option');
                       opt.value = name;
                       opt.textContent = name;
                       return opt
                      })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === "clear") {
            console.log('action' +action.name)
           const fieldName = action.dataset.field;
           const parent = action.parentElement;
           parent.querySelector(`input[name = ${fieldName}]`).value = '';
           state[fieldName] = '';
        }


        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}