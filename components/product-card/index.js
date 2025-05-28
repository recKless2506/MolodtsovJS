import { DeleteButton } from "../buttons/delete-button/index.js"

export class ProductCardComponent {
    constructor(parent,mainPage,data){
        this.parent = parent
        this.mainPage = mainPage
        this.data = data
    }

    addListeners(data, listener){
        document
        .getElementById(`click-card-${data.id}`)
        .addEventListener("click", listener)

    }

    getButtonsRoot(){
        return document.getElementById(`card-buttons-${this.buttonData.id}`)
    }

    getTagsRoot(){  
        return document.getElementById(`tags-${this.buttonData.id}`)
    }

    getHTML(data) {
        return (
            `
                <div class="card m-2 d-flex flex-column" style="max-width: 300px; flex: 1 1 300px; background-color: #0d6efd; border: 1px solid #b3d1ff; color: white; height: 350px;">
                    <img class="card-img-top" src="${data.src}" alt="картинка" style="height: 150px; object-fit: cover;">
                    <div class="card-body d-flex flex-column p-3" style="overflow: hidden;">
                        <h5 class="card-title mb-2" style="font-size: 1.1rem;">${data.title}</h5>
                        <p class="card-text mb-3" style="font-size: 0.9rem; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${data.text}</p>
                        <div id="card-buttons-${data.id}" class="d-flex justify-content-between mt-auto">
                            <button class="btn btn-primary py-1" style="background: #ff1472; border: #ff1472; font-size: 0.9rem;" id="click-card-${data.id}" data-id=${data.id}>Подробнее</button>
                        </div>
                    </div>
                </div>
            `
        )
    }
    render(data, listener, listenerDelete) {
        
        this.buttonData = data
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        const deleteButton = new DeleteButton(this.getButtonsRoot())
        deleteButton.render(listenerDelete,data)

        this.addListeners(data, listener)
    }
}