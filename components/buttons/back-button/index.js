export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <div style="width: 100%; display: flex; justify-content: flex-end;">
                    <button id="back-button" class="btn btn-primary" style="background: #1959d1; border-color: #1959d1;" type="button">Домой</button>
                </div>
            `
        )
    }
    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}