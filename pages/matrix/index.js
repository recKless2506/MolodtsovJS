export class MatrixPage {
    constructor(parent, mainPageInstance) {
        this.parent = parent;
        this.mainPageInstance = mainPageInstance; // Сохраняем экземпляр главной страницы
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <h2 class="mb-4">Сумма диагоналей матрицы</h2>
                <div class="mb-3">
                    <label class="form-label">Размер матрицы:</label>
                    <input type="number" id="matrix-size" class="form-control" 
                           min="2" max="10" value="3" style="width: 100px;">
                </div>
                <button id="generate-btn" class="btn btn-primary mb-3">Создать матрицу</button>
                <div id="matrix-container" class="mb-3"></div>
                <button id="calculate-btn" class="btn btn-success">Рассчитать</button>
                <div id="result" class="mt-3 p-3 bg-light rounded"></div>
                <button id="back-btn" class="btn" style="background: #ff1472; border-color: #ff1472; color: white;">Назад</button>
                <style>
                    #back-btn:hover {
                        background-color: #ff1472 !important;
                        border-color: #ff1472 !important;
                    }
                </style>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = this.getHTML();

        document.getElementById('generate-btn').addEventListener('click', () => {
            const size = parseInt(document.getElementById('matrix-size').value);
            this.generateMatrix(size);
        });

        document.getElementById('calculate-btn').addEventListener('click', () => {
            this.calculateSum();
        });

        document.getElementById('back-btn').addEventListener('click', () => {
            // Используем сохраненный экземпляр главной страницы для возврата
            this.mainPageInstance.render();
        });
    }

    generateMatrix(size) {
        const container = document.getElementById('matrix-container');
        container.innerHTML = '';
        
        for (let i = 0; i < size; i++) {
            const row = document.createElement('div');
            for (let j = 0; j < size; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'form-control d-inline-block m-1';
                input.style.width = '60px';
                input.value = Math.floor(Math.random() * 10);
                input.id = `cell-${i}-${j}`;
                row.appendChild(input);
            }
            container.appendChild(row);
        }
    }

    calculateSum() {
        const size = parseInt(document.getElementById('matrix-size').value);
        let mainSum = 0;
        let secondarySum = 0;
        
        for (let i = 0; i < size; i++) {
            mainSum += parseInt(document.getElementById(`cell-${i}-${i}`).value) || 0;
            secondarySum += parseInt(document.getElementById(`cell-${i}-${size-1-i}`).value) || 0;
        }

        const totalSum = size % 2 === 1 
            ? mainSum + secondarySum - (parseInt(document.getElementById(`cell-${Math.floor(size/2)}-${Math.floor(size/2)}`).value) || 0)
            : mainSum + secondarySum;

        document.getElementById('result').innerHTML = `
            <p>Сумма главной диагонали: <strong>${mainSum}</strong></p>
            <p>Сумма побочной диагонали: <strong>${secondarySum}</strong></p>
            <p class="mb-0">Общая сумма: <strong>${totalSum}</strong></p>
        `;
    }
}