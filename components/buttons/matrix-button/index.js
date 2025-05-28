export class MatrixButton {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document.getElementById("matrix-button")
            .addEventListener("click", listener);
    }

    getHTML() {
        return `
            <button id="matrix-button" class="btn" 
                    style="background: #ff1472; border: #ff1472; color: white; width: 150px;">
                Матрица
            </button>
            <style>
                #matrix-button:hover {
                    background-color: #ff1472 !important;
                    border-color: #ff1472 !important;
                }
            </style>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}