import { ProductCardComponent } from "../../components/product-card/index.js"
import { Header } from "../../components/header/index.js"
import { MainPageOptions } from "../../components/options/index.js"
import { ProductPage } from "../product/index.js"


export class MainPage {
    constructor (parent,data) {
        this.parent = parent
        this.data = data
        this.handlerDelete = this.clickDelete.bind(this)
        
    }
    
    getRoot(){
        return document.getElementById('main-page') 
    }
    getMainRoot(){
        return document.getElementById('main')
    }
    getHtml() {
        return `<div id="main-page" class="d-flex flex-wrap align-items-stretch" 
                style="max-width: 1000px; margin: 0 auto; gap: 16px;"></div>`;
    }
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId, this.data)
        productPage.render(this)
    }

    clickDelete(e){
        const cardId = e.target.dataset.id
        console.log(cardId)
        this.data = this.data.filter(item => item.id != cardId)
        this.render()
    }
    clickAdd(e) {
        console.log('Add button clicked', e);
        
        if (!this.data || this.data.length === 0) {
            console.warn('No data available, creating default card');
            this.data = [{
                id: 1,
                src: "https://via.placeholder.com/300",
                title: "Новая карточка",
                text: "Описание карточки"
            }];
        }
    
        const newCard = {
            ...this.data[0],
            id: this.generateNewId(),
            title: `${this.data[0].title} (Копия)`
        };
    
        console.log('New card to add:', newCard);
    
        const newData = [...this.data, newCard];
        this.data = newData;
    
        console.log('Data after addition:', this.data);
    
        this.render();
    }
    
    generateNewId() {
        return this.data.length > 0 
            ? Math.max(...this.data.map(card => card.id)) + 1
            : 1;
    }
    render() {
        console.log('Rendering started with data:', this.data);
        
        // Безопасная очистка
        while (this.parent.firstChild) {
            this.parent.removeChild(this.parent.firstChild);
        }
    
        // Хедер
        new Header(this.parent, this.data).render();
        
        // Опции
        new MainPageOptions(this.parent, this.data, this).render();
    
        // Основной контейнер
        const container = document.createElement('div');
        container.id = 'cards-container';
        container.className = 'd-flex flex-wrap';
        container.style = 'gap: 20px; max-width: 1200px; margin: 0 auto;';
        this.parent.appendChild(container);
    
        // Рендер карточек
        this.data.forEach(item => {
            console.log('Rendering card:', item.id);
            new ProductCardComponent(container, this, this.data)
                .render(item, this.clickCard.bind(this), this.clickDelete.bind(this));
        });
    
        // Добавляем карточку-кнопку вместо обычной кнопки
        const addCardHTML = `
            <div class="card m-2 d-flex flex-column" 
                 style="max-width: 300px; flex: 1 1 300px; 
                        background-color: #0d6efd40; border: 2px dashed #0d6efd; 
                        color: #0d6efd; height: 350px; cursor: pointer;"
                 id="add-card-button">
                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    <h5 class="card-title mt-3">Добавить карточку</h5>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', addCardHTML);
        
        // Добавляем обработчик клика на карточку-кнопку
        document.getElementById('add-card-button').addEventListener('click', this.clickAdd.bind(this));
        
        console.log('Rendering completed');
    }
}