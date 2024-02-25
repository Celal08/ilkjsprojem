//html elementlerini seç
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn")
const clearBtn = document.querySelector(".clear-btn")


//düzenleme seçenekleri
let editElement;
let editFlag = false; //düzenleme modunda olup olmadığını belirtir
let editID = ""; //Düzenleme yapılan öğenin benzersiz kimliği


//OLAY İZLEYİCİLER
form.addEventListener("submit",addItem)
//fonksiyonlar
function displayAlert(text,action){
    console.log(text,action);
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent="";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}
function addItem(e){
    e.preventDefault();//otomatik göndermeyi engelle
    const value = grocery.value; //formdaki inputun değerini alma
    const id = new Date().getTime().toString();//benzersiz bir id oluştur
    
    //eğer değer boş değilse ve düzenleme modu değilse
    if(value !== "" && !editFlag) {
        const element = document.createElement("article");//yeni bir article elemanı oluşturur
        let attr = document.createAttribute("data-id");//yeni bir veri kimliği oluşturur
        attr.value = id;
        element.setAttributeNode(attr); //oluşturduğumuz ıd yi elemente ekledim
        element.classList.add("grocery-item");//oluşturduğumuz elemente class ekledim
        element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click",deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click",editItem);
        clearBtn.addEventListener("click", clearList);

        //kapsayıcıya ekleme yapma
        list.appendChild(element);
        displayAlert("Başarı ile Eklendi","success")
        container.classList.add("show-container");
        //içerik kısmını sıfırlama
        grocery.value = "";
    }else if(value !== "" && editFlag){
        editElement.innerHTML=value;
        displayAlert("Başarı ile Düzenlendi","success")
    }else{
        
    }
}
//silme fonksiyonu
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    

    displayAlert("Başarı ile Silindi","danger");

}

//tümünü sil


function clearList() {
    list.innerHTML = ""; // Tüm öğeleri listeden kaldır
    container.classList.remove("show-container"); // İçerik kısmını gizle
    displayAlert("Liste başarıyla temizlendi", "danger"); // Kullanıcıya bilgi ver
}


//düzenleme fonksiyonu
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    //düzenleme yapılan öğeyi seç
    editElement = e.currentTarget.parentElement.previousElementSibling;

    //form içerisinde bulunan inputun değerini düzenlenen öğenin metni ile doldur
    grocery.value = editElement.innerHTML;

    editFlag = true;
    editID= element.dataset.id;//düzenlenen öğenin kimliği
    submitBtn.textContent = "Düzenle";
    
}
