export class AddButton {
    constructor(parent) {
        this.parent = parent;
    }

    render(listener) {
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'card m-2 add-card-button';
        buttonDiv.style = `width: 300px; min-height: 350px; 
                          border: 2px dashed #0d6efd; 
                          cursor: pointer;`;
        
        buttonDiv.innerHTML = `
            <div class="card-body d-flex flex-column 
                 justify-content-center align-items-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" 
                     fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <h5 class="card-title mt-3">Добавить карточку</h5>
            </div>
        `;
        
        buttonDiv.addEventListener('click', listener);
        this.parent.appendChild(buttonDiv);
    }
}