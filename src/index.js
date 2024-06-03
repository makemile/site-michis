import { URL } from "./Apis/Apis";
import { URLFavourite } from "./Apis/Apis";
const container = document.querySelector("#containerCat");
const sectionCard = document.querySelector(".cardCats");
const sectionCardFavourite = document.querySelector(".cardFavourites");
const btnReload = document.querySelector(".btnReload");

const getData = async () => {
  try {
    let render = [];
    let response = await fetch(URL);
    let cats = await response.json();
    cats.forEach((cats, index) => {
      let article = document.createElement("article");
      article.classList.add("item_card");
      let image = document.createElement("img");
      let btnFavourite = document.createElement("button");
      let footer = document.createElement("footer");
      let span = document.createElement("span");
      span.setAttribute("data-tooltip", "Agregar favoritos ♥");
      btnFavourite.classList.add("btnFavourite");
      footer.className = "footer";
      console.log(cats);
      image.src = cats.url;
      image.alt = cats.name;
      btnFavourite.id = cats.id;
      btnFavourite.type = "button";
      btnFavourite.textContent = "+";
      span.append(btnFavourite);
      footer.append(span);
      article.append(image, footer);
      sectionCard.addEventListener("click", (e) => { 
    if(e.target.id === cats.id){
        console.log(cats.id,'kkk');
        saveFavourite(cats.id);
    }
      })
      render.push(article);
    });
    sectionCard.append(...render);
  } catch (error) {
    console.error(error);
  }
};

async function reloadFavourites(){
try{
    let render = [];
    let response = await fetch(URLFavourite);
    let catsFavourites = await response.json();
    catsFavourites.forEach((cats, index) => {
        let article = document.createElement("article");
        article.classList.add("item_card");
        let image = document.createElement("img");
        let btnFavourite = document.createElement("button");
        let footer = document.createElement("footer");
        let span = document.createElement("span");
        span.setAttribute("data-tooltip", "Sacar favoritos ♥");
        btnFavourite.classList.add("btnFavourite");
        footer.className = "footer";
        console.log(cats);
        image.src = cats.image.url;
        image.alt = cats.name;
        btnFavourite.id = cats.id;
        btnFavourite.type = "button";
        btnFavourite.textContent = "-";
        span.append(btnFavourite);
        footer.append(span);
        article.append(image, footer);
        render.push(article);
      });
      sectionCardFavourite.append(...render)
}catch(error){
    console.error(error);
}
}


async function saveFavourite(id){

    try{
        const res = await fetch(URLFavourite,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image_id: id
            })
        });
        console.log(res,'res')
    }catch(error){
        console.error(error);
    }
}

getData();
saveFavourite();
reloadFavourites();
