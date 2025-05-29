(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();class u{constructor(t){this.parent=t}addListeners(t,e){document.getElementById(`click-card-${t.id}`).addEventListener("click",e)}getButtonsRoot(){return document.getElementById(`card-buttons-${this.buttonData.id}`)}getTagsRoot(){return document.getElementById(`tags-${this.buttonData.id}`)}getHTML(t){return`
                <div class="card m-2 d-flex flex-column" style="max-width: 300px; flex: 1 1 300px; background-color: #0d6efd; border: 1px solid #b3d1ff; color: white; height: 350px;">
                    <img class="card-img-top" src="${t.src}" alt="картинка" style="height: 150px; object-fit: cover;">
                    <div class="card-body d-flex flex-column p-3" style="overflow: hidden;">
                        <h5 class="card-title mb-2" style="font-size: 1.1rem;">${t.title}</h5>
                        <p class="card-text mb-3" style="font-size: 0.9rem; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${t.text}</p>
                        <div id="card-buttons-${t.id}" class="d-flex justify-content-between mt-auto">
                            <button class="btn btn-primary py-1" style="background: #ff1472; border: #ff1472; font-size: 0.9rem;" id="click-card-${t.id}" data-id=${t.id}>Подробнее</button>
                        </div>
                    </div>
                </div>
            `}render(t,e){this.buttonData=t;const r=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",r),this.addListeners(t,e)}}class h{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <div style="width: 100%; display: flex; justify-content: flex-end;">
                    <button id="back-button" class="btn btn-primary" style="background: #1959d1; border-color: #1959d1;" type="button">Домой</button>
                </div>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class l{constructor(t,e){this.parent=t,this.data=e}getHTML(){return`
                <header class="bg-light py-3 mb-5">
                    <div class="container">
                        <div class="d-flex justify-content-center align-items-center" id="header-main">
                            <h1 class="m-0" style="color: #0d6efd;">Маркетплейс</h1>
                        </div>
                    </div>
                </header>
            `}getBackButtonRoot(){return document.getElementById("header-main")}clickHome(){new o(this.parent,this.data).render()}render(){const t=this.getHTML();this.parent.insertAdjacentHTML("afterbegin",t),new h(this.getBackButtonRoot()).render(this.clickHome.bind(this))}}class m{constructor(t,e){this.parent=t,this.mainPageInstance=e}getHTML(){return`
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
        `}render(){this.parent.innerHTML=this.getHTML(),document.getElementById("generate-btn").addEventListener("click",()=>{const t=parseInt(document.getElementById("matrix-size").value);this.generateMatrix(t)}),document.getElementById("calculate-btn").addEventListener("click",()=>{this.calculateSum()}),document.getElementById("back-btn").addEventListener("click",()=>{this.mainPageInstance.render()})}generateMatrix(t){const e=document.getElementById("matrix-container");e.innerHTML="";for(let r=0;r<t;r++){const s=document.createElement("div");for(let n=0;n<t;n++){const a=document.createElement("input");a.type="number",a.className="form-control d-inline-block m-1",a.style.width="60px",a.value=Math.floor(Math.random()*10),a.id=`cell-${r}-${n}`,s.appendChild(a)}e.appendChild(s)}}calculateSum(){const t=parseInt(document.getElementById("matrix-size").value);let e=0,r=0;for(let n=0;n<t;n++)e+=parseInt(document.getElementById(`cell-${n}-${n}`).value)||0,r+=parseInt(document.getElementById(`cell-${n}-${t-1-n}`).value)||0;const s=t%2===1?e+r-(parseInt(document.getElementById(`cell-${Math.floor(t/2)}-${Math.floor(t/2)}`).value)||0):e+r;document.getElementById("result").innerHTML=`
            <p>Сумма главной диагонали: <strong>${e}</strong></p>
            <p>Сумма побочной диагонали: <strong>${r}</strong></p>
            <p class="mb-0">Общая сумма: <strong>${s}</strong></p>
        `}}class p{constructor(t,e,r){this.parent=t,this.data=e,this.mainPage=r,this.compareObj1=null,this.compareObj2=null}getOptionsRoot(){return document.getElementById("main-options")}getHTML(){return`
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
        `}render(){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),document.getElementById("btn-polindrom").addEventListener("click",this.clickPolindrom.bind(this)),document.getElementById("matrix-button").addEventListener("click",this.clickMatrix.bind(this)),document.getElementById("sum-squares-btn").addEventListener("click",this.clickSumSquares.bind(this)),document.getElementById("compare-objs-btn").addEventListener("click",this.clickCompareObjects.bind(this))}isPolindrom2(t){const e=String(t).toLowerCase().replace(/[^а-яa-z0-9]/g,"");let r=0,s=e.length-1;for(;r<s;){if(e[r]!==e[s])return!1;r++,s--}return!0}clickPolindrom(){const t=this.data.filter(r=>r.title.split(" ").some(s=>s.length&&this.isPolindrom2(s)));new o(this.parent,t).render()}clickMatrix(){new m(this.parent,this.mainPage).render()}sumOfSquares(t){return Array.isArray(t)?t.reduce((e,r)=>e+(Number(r)||0)**2,0):0}clickSumSquares(){const t=this.data.map(r=>Number(r.price)||0)||[1,2,3,4,5],e=this.sumOfSquares(t);document.getElementById("sum-squares-result").innerHTML=`
            <div class="alert alert-success">
                Сумма квадратов значений: [${t.join(", ")}]<br>
                Результат: <strong>${e}</strong>
            </div>
        `}isEqualObj(t,e){const r=Object.keys(t),s=Object.keys(e);return r.length!==s.length?!1:r.every(n=>typeof t[n]=="object"&&typeof e[n]=="object"?this.isEqualObj(t[n],e[n]):t[n]===e[n])}clickCompareObjects(){if(this.data.length<2){document.getElementById("compare-result").innerHTML=`
                <div class="alert alert-warning">
                    Для сравнения нужно минимум 2 товара
                </div>
            `;return}this.compareObj1=this.data[0],this.compareObj2=this.data[1];const t=this.isEqualObj(this.compareObj1,this.compareObj2);document.getElementById("compare-result").innerHTML=`
            <div class="alert alert-${t?"success":"danger"}">
                Результат сравнения: <strong>${t?"Объекты идентичны":"Объекты различны"}</strong>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-light">
                            <h5>${this.compareObj1.title||"Объект 1"}</h5>
                        </div>
                        <div class="card-body">
                            <pre>${JSON.stringify(this.compareObj1,null,2)}</pre>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-light">
                            <h5>${this.compareObj2.title||"Объект 2"}</h5>
                        </div>
                        <div class="card-body">
                            <pre>${JSON.stringify(this.compareObj2,null,2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        `}}class g{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${t.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${t.title}</h5>
                                <p class="card-text">${t.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class b{constructor(t,e,r){this.parent=t,this.id=e,this.data=r}clickBack(){new o(this.parent,this.data).render()}getData(){return this.data[this.id-1]}pageRoot(){return document.getElementById("product-page")}getHTML(){return`
                <div id="product-page"> </div>
            `}render(t){this.parent.innerHTML="";const e=this.getHTML();new l(this.parent,this.data).render(),this.parent.insertAdjacentHTML("beforeend",e);const s=this.getData();new g(this.pageRoot(),this.data).render(s,t)}}class f{get(t,e){const r=new XMLHttpRequest;r.open("GET",t),r.send(),r.onreadystatechange=()=>{r.readyState===4&&this._handleResponse(r,e)}}post(t,e,r){const s=new XMLHttpRequest;s.open("POST",t),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(e)),s.onreadystatechange=()=>{s.readyState===4&&this._handleResponse(s,r)}}patch(t,e,r){const s=new XMLHttpRequest;s.open("PATCH",t),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(e)),s.onreadystatechange=()=>{s.readyState===4&&this._handleResponse(s,r)}}delete(t,e){const r=new XMLHttpRequest;r.open("DELETE",t),r.send(),r.onreadystatechange=()=>{r.readyState===4&&this._handleResponse(r,e)}}_handleResponse(t,e){try{const r=t.responseText?JSON.parse(t.responseText):null;e(r,t.status)}catch(r){console.error("Ошибка парсинга JSON:",r),e(null,t.status)}}}const c=new f;class v{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const d=new v;class o{constructor(t){this.parent=t,this.data=[],this.init()}init(){this.renderBaseStructure(),this.loadData()}renderBaseStructure(){this.parent.innerHTML="",new l(this.parent,this.data).render(),new p(this.parent,this.data,this).render();const t=document.createElement("div");t.id="cards-container",t.className="d-flex flex-wrap",t.style.cssText="gap: 20px; max-width: 1200px; margin: 0 auto;",this.parent.appendChild(t)}loadData(){c.get(d.getStocks(),(t,e)=>{e===200?(this.data=t,this.renderCards(),this.renderAddButton()):(console.error("Ошибка загрузки данных:",e),this.showError())})}renderCards(){const t=document.getElementById("cards-container");t&&(t.innerHTML="",this.data.forEach(e=>{new u(t,this,this.data).render(e,r=>this.clickCard(r),r=>this.clickDelete(r))}))}renderAddButton(){const t=document.getElementById("cards-container");if(!t)return;const e=document.createElement("div");e.className="card m-2 add-card-button",e.style.cssText=`
            width: 300px; min-height: 350px;
            border: 2px dashed #0d6efd;
            cursor: pointer;
        `,e.innerHTML=`
            <div class="card-body d-flex flex-column justify-content-center align-items-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <h5 class="card-title mt-3">Добавить карточку</h5>
            </div>
        `,e.addEventListener("click",()=>this.clickAdd()),t.appendChild(e)}showError(){const t=document.getElementById("cards-container");t&&(t.innerHTML=`
            <div class="alert alert-danger">
                Ошибка загрузки данных. Пожалуйста, попробуйте позже.
            </div>
        `)}clickCard(t){const e=t.currentTarget.dataset.id;console.log(`Переход на карточку с ID: ${e}`),new b(this.parent,e,this.data).render()}clickDelete(t){const e=t.target.dataset.id;c.delete(d.removeStockById(e),(r,s)=>{s===200?(this.data=this.data.filter(n=>n.id!=e),this.renderCards()):console.error("Ошибка удаления:",s)})}clickAdd(){const t={title:"Новая карточка",text:"Описание карточки",src:"https://via.placeholder.com/300"};c.post(d.createStock(),t,(e,r)=>{r===201?(this.data.push(e),this.renderCards()):console.error("Ошибка добавления:",r)})}}const y=document.getElementById("root"),x=[{id:1,src:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",title:"Акция при покупке телефона",text:"Акция действует неделю.Покупаете телефон, получаете скидку и чехол на данный телефон в подарок"},{id:2,src:"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",title:"Скидка на шалаш",text:"При покупке ноутбука вы получаете скидку на ноутбук 10% и скидку на любую следующую покупку от 15000 рублей."},{id:3,src:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32",title:"Акция связанная с фотоаппаратом",text:" При покупке зеркального фотоаппарата — карта памяти 64GB в подарок.Дополнительно: бесплатный онлайн-курс по основам фотографии"}],k=new o(y,x);k.render();
