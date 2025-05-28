import { MainPage } from "../../pages/main/index.js"
import { AddButton } from "../buttons/add-button/index.js"
import { PolindromButton } from "../buttons/polindrom-button/index.js"
import { MatrixButton } from "../buttons/matrix-button/index.js";
import { MatrixPage } from "../../pages/matrix/index.js";


export class MainPageOptions {
    constructor(parent, data, mainPage) {
        this.parent = parent;
        this.data = data;
        this.mainPage = mainPage;
        this.compareObj1 = null;
        this.compareObj2 = null;
    }

    getOptionsRoot() {
        return document.getElementById('main-options');
    }

    getHTML() {
        return `
            <div class="row g-3 justify-content-around mb-3" id="main-options">
                <!-- Кнопка полиндром -->
                <div class="col-md-3">
                    <button id="btn-polindrom" class="btn btn-primary" style="width:auto;">
                        Найти полиндромы
                    </button>
                </div>
                
                <!-- Кнопка матрица -->
                <div class="col-md-3">
                    <button id="matrix-button" class="btn" 
                            style="background: #ff1472; border: #ff1472; color: white; width: 150px;">
                        Матрица
                    </button>
                </div>
                
                <!-- Кнопка сумма квадратов -->
                <div class="col-md-3">
                    <button id="sum-squares-btn" class="btn" 
                            style="background: #28a745; border-color: #28a745; color: white;">
                        Сумма квадратов
                    </button>
                </div>
                
                <!-- Кнопка сравнить объекты -->
                <div class="col-md-3">
                    <button id="compare-objs-btn" class="btn" 
                            style="background: #6f42c1; border-color: #6f42c1; color: white;">
                        Сравнить объекты
                    </button>
                </div>
            </div>
            <style>
                #matrix-button:hover {
                    background-color: #ff1472 !important;
                    border-color: #ff1472 !important;
                }
                #sum-squares-btn:hover {
                    background-color: #218838 !important;
                    border-color: #218838 !important;
                }
                #compare-objs-btn:hover {
                    background-color: #5a32a3 !important;
                    border-color: #5a32a3 !important;
                }
                #compare-result pre {
                    background: #f8f9fa;
                    padding: 10px;
                    border-radius: 5px;
                    max-height: 300px;
                    overflow-y: auto;
                }
                #sum-squares-result .alert {
                    max-width: 600px;
                    margin: 0 auto;
                }
            </style>
            <div id="sum-squares-result" class="mt-3 text-center"></div>
            <div id="compare-result" class="mt-3"></div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Обработчики для всех кнопок
        document.getElementById('btn-polindrom')
            .addEventListener('click', this.clickPolindrom.bind(this));
            
        document.getElementById('matrix-button')
            .addEventListener('click', this.clickMatrix.bind(this));
            
        document.getElementById('sum-squares-btn')
            .addEventListener('click', this.clickSumSquares.bind(this));
            
        document.getElementById('compare-objs-btn')
            .addEventListener('click', this.clickCompareObjects.bind(this));
    }

    /* Методы для полиндромов */
    isPolindrom2(word) {
        const str = String(word).toLowerCase().replace(/[^а-яa-z0-9]/g, '');
        let left = 0;
        let right = str.length - 1;

        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }

    clickPolindrom() {
        const palindromCards = this.data.filter(item => {
            return item.title.split(' ').some(word => {
                return word.length && this.isPolindrom2(word);
            });
        });
        const mainPage = new MainPage(this.parent, palindromCards);
        mainPage.render();
    }

    /* Методы для матрицы */
    clickMatrix() {
        const matrixPage = new MatrixPage(this.parent, this.mainPage);
        matrixPage.render();
    }

    /* Методы для суммы квадратов */
    sumOfSquares(arr) {
        if (!Array.isArray(arr)) return 0;
        return arr.reduce((sum, num) => sum + (Number(num) || 0) ** 2, 0);
    }

    clickSumSquares() {
        // Используем цены товаров или случайный массив для демонстрации
        const pricesArray = this.data.map(item => Number(item.price) || 0) || [1, 2, 3, 4, 5];
        const result = this.sumOfSquares(pricesArray);
        
        document.getElementById('sum-squares-result').innerHTML = `
            <div class="alert alert-success">
                Сумма квадратов значений: [${pricesArray.join(', ')}]<br>
                Результат: <strong>${result}</strong>
            </div>
        `;
    }

    /* Методы для сравнения объектов */
    isEqualObj(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        
        if (keys1.length !== keys2.length) return false;
        
        return keys1.every(key => {
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                return this.isEqualObj(obj1[key], obj2[key]);
            }
            return obj1[key] === obj2[key];
        });
    }

    clickCompareObjects() {
        if (this.data.length < 2) {
            document.getElementById('compare-result').innerHTML = `
                <div class="alert alert-warning">
                    Для сравнения нужно минимум 2 товара
                </div>
            `;
            return;
        }

        // Берем первые два товара для сравнения
        this.compareObj1 = this.data[0];
        this.compareObj2 = this.data[1];
        const result = this.isEqualObj(this.compareObj1, this.compareObj2);
        
        document.getElementById('compare-result').innerHTML = `
            <div class="alert alert-${result ? 'success' : 'danger'}">
                Результат сравнения: <strong>${result ? 'Объекты идентичны' : 'Объекты различны'}</strong>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-light">
                            <h5>${this.compareObj1.title || 'Объект 1'}</h5>
                        </div>
                        <div class="card-body">
                            <pre>${JSON.stringify(this.compareObj1, null, 2)}</pre>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-light">
                            <h5>${this.compareObj2.title || 'Объект 2'}</h5>
                        </div>
                        <div class="card-body">
                            <pre>${JSON.stringify(this.compareObj2, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
