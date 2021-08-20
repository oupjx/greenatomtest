window.onload = function(){
//card конструктор, создание карточки элемента на странице
class cardBook{
    constructor(src, alt, title, descr, author, year,isdat, ...parentSelector){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.author = author;
        this.isdat = isdat;
        this.year = year;
        this.parentSelector = document.querySelector(parentSelector)
    }

    render(){
        const element = document.createElement('div');
        element.classList.add('card');
        element.innerHTML = `
        
            <img src=${this.src} class="card-img-top" alt=${this.alt}>
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">${this.descr}</p>
            Автор:<p class="card-author">${this.author}</p>
            Издательство: <p class="card-isdat">${this.isdat}</p>
            Год издания <p class="year">${this.year}</p>
        
      
        `;
        
        this.parentSelector.append(element);
    }
}

    fetch('http://localhost:3000/book')
        .then(data => data.json())


// проверка получения данных
const getResource = async(url) =>{
    const result = await fetch(url);
    if(!result.ok){
        throw new Error(``);
    }
    return await result.json();
}

// парс элементов
getResource('http://localhost:3000/book')
    .then(data =>{
        data.forEach(({img, altimg, title, descr, author, year, isdat}) =>{
            new cardBook(img, altimg, title, descr, author, year, isdat, '.table_book  .card-group').render();
        });
    });
//реализация поиска по названию
    let input = document.querySelector('#searchInput');
    input.oninput = function(){
        let value = this.value.trim();
        let list = document.querySelectorAll('.card > .card-title');
        
        
        if(value != ""){
            list.forEach(elem => {
                if(elem.innerText.toLowerCase().search(value) == -1){
                   elem.parentNode.classList.add('hide');
                }
            })
        }else{
            list.forEach(elem =>{
                elem.parentNode.classList.remove('hide');
            })
        }
    }

//реализация фильтрации по году       
    let range = document.querySelector('#customRange2');
    let slid = document.querySelector('.inputValue');
    range.addEventListener('change', function(){
        let tr = document.querySelectorAll('.card > .year');
        let t = this.value;
        slid.innerHTML = t;  
        if(tr != ""){
        tr.forEach(elem =>{
            if(elem.innerText.search(t) == -1){
                elem.parentNode.classList.add('hide');
             }else{
                elem.parentNode.classList.remove('hide');
             }
        })}else{
            tr.forEach(elem =>{
                elem.parentNode.classList.remove('hide');
            })
        }
    });
    
//создание выпадающего списка издательтсв
    getResource('http://localhost:3000/book')
    .then(data => createLi(data));
    
    function createLi(data){
        data.forEach(({isdat}) =>{
            const link = document.createElement('li');
            link.innerHTML = `
            <a class="dropdown-item isdat" href="#">${isdat}</a>
            `;
            
            document.querySelector('.list_isdat').append(link);
        })
    }
//реализация поиска по автору
    let inputAuthor = document.querySelector('#searchInputAuthor');
    inputAuthor.oninput = function(){
        let val = this.value.trim()
        console.log(val)
        let listAuthor = document.querySelectorAll('.card > .card-author');
        console.log(listAuthor)
        
        if(val != ""){
            listAuthor.forEach(elem => {
                console.log(elem)
                if(elem.innerText.toLowerCase().search(val) == -1){
                   elem.parentNode.classList.add('hide');
                }
            })
        }else{
            listAuthor.forEach(elem =>{
                elem.parentNode.classList.remove('hide');
            })
        }
    }

    
}
function gt(){
    let listLink = document.querySelectorAll('.list_isdat > .isdat');
    console.log(listLink)
}
gt();
// неправильная реализация поиска по издательству
function check(){
    let p = document.querySelectorAll('.isdat');
    let y = document.querySelectorAll('.card > .card-isdat');
    console.log(p)
    let mySet = new Set();
    p.forEach(elem =>{
        mySet.add(elem.textContent);
        
    })
    
    
    if(p != ""){
            p.forEach(elem => {
                elem.addEventListener('click', function(){
                    y.forEach(element =>{
                        if(elem.textContent.search(element.textContent) == -1){
                            element.parentNode.classList.add('hide');
                        }else{
                            elem.parentNode.classList.remove('hide');
                         }
                    })
                })
            });}else{
                y.forEach(elem =>{
                    elem.parentNode.classList.remove('hide');
                })
            }
            
// сортировка по алфавиту от А до Я
function sortThem(s) {
  Array.prototype.slice.call(document.body.querySelectorAll(s)).sort(function sort (ea, eb) {
    var a = ea.textContent.trim();
    var b = eb.textContent.trim();
      if (a < b) return -1;
      if (a > b ) return 1;
      return 0;
  }).forEach(function(div) {
      div.parentElement.append(div);
  });
}

document.getElementById("clickpl").addEventListener("click", function(){
  sortThem('.card')
});


// сортировка по алфавиту от Я до А
function sort(s) {
  Array.prototype.slice.call(document.body.querySelectorAll(s)).sort(function sort (ea, eb) {
    var a = ea.textContent.trim();
    var b = eb.textContent.trim();
      if (a > b) return -1;
      if (a < b ) return 1;
      return 0;
  }).forEach(function(div) {
      div.parentElement.appendChild(div);
  });
}

document.getElementById("clickrt").addEventListener("click", function(){
  sort('.card')
});



}
setTimeout(check, 1000);


