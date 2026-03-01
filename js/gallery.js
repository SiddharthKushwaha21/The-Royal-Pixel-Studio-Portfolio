/* PROTECTION */
document.addEventListener("contextmenu",e=>e.preventDefault());

document.addEventListener("keydown",e=>{
 if(e.ctrlKey && ["s","u","p","c"].includes(e.key.toLowerCase())) e.preventDefault();
 if(e.key==="PrintScreen") e.preventDefault();
});

const galleryData = [
// -------------------------------------------------Potraits Section--------------------------------------------------------
{ type:"photo", category:"portraits", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082903/IMG_2304_ctewu2.jpg" },
{ type:"photo", category:"portraits", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082903/IMG_2303_iawr9y.jpg" },
{ type:"photo", category:"portraits", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082903/IMG_2300_uwwsxj.jpg" },
{ type:"photo", category:"portraits", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082901/IMG_2262_ygeutk.jpg" },
{ type:"photo", category:"portraits", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082901/IMG_2277_cqgtiv.jpg" },

// -------------------------------------------------Pre-Wedding Section--------------------------------------------------------
{ type:"photo", category:"preweddings", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082855/IMG_4019_uzihh5.jpg" },
{ type:"photo", category:"preweddings", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082854/IMG_4018_igrrho.jpg" },

// -------------------------------------------------Wedding Section--------------------------------------------------------
{ type:"photo", category:"weddings", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082821/IMG_5190_wc78ru.jpg" },
{ type:"photo", category:"weddings", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082821/IMG_5188_l4djv6.jpg" },
{ type:"photo", category:"weddings", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082821/IMG_5187_qx4kl2.jpg" },
{ type:"photo", category:"weddings", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082821/IMG_5207_cxyjip.jpg" },
{ type:"photo", category:"weddings", src:"https://res.cloudinary.com/dojs87lwo/image/upload/f_auto,q_auto:eco/v1769082820/IMG_5185_qlmcjc.jpg" },

// -------------------------------------------------Cinematic video Section--------------------------------------------------------
{
 type:"video",
 category:"cinematic",
 thumb:"https://res.cloudinary.com/dojs87lwo/video/upload/so_0/v1769082990/video2_ztjnxg.jpg",
 video:"https://res.cloudinary.com/dojs87lwo/video/upload/q_auto/v1769082990/video2_ztjnxg.mp4"
},
{
 type:"video",
 category:"cinematic",
 thumb:"https://res.cloudinary.com/dojs87lwo/video/upload/so_0/v1769082953/video1_uuqzih.jpg",
 video:"https://res.cloudinary.com/dojs87lwo/video/upload/q_auto/v1769082953/video1_uuqzih.mp4"
},

// -------------------------------------------------Teaser video Section--------------------------------------------------------
{
 type:"video",
 category:"teaser",
 thumb:"https://res.cloudinary.com/dojs87lwo/video/upload/so_0/v1769082953/video3_rzvvpk.jpg",
 video:"https://res.cloudinary.com/dojs87lwo/video/upload/q_auto/v1769082953/video3_rzvvpk.mp4"
}
];

const photoGallery = document.getElementById("photoGallery");
const videoGallery = document.getElementById("videoGallery");
const box = document.getElementById("lightbox");

let current = 0;
let activeList = [];

function render(){                                    
 photoGallery.innerHTML="";
 videoGallery.innerHTML="";
 activeList = [];

 galleryData.forEach(item=>{
  if(item.type==="photo"){
   activeList.push(item);
   photoGallery.innerHTML+=`
    <div class="gallery-item ${item.category}" onclick="openLightbox(${activeList.length-1})">
     <img src="${item.src}" loading="lazy" alt="Luxury Wedding Photography by The Royal Pixel Studio">
     <span class="watermark">THE ROYAL PIXEL</span>
    </div>`;
  }else{
   activeList.push(item);
   videoGallery.innerHTML+=`
    <div class="gallery-item ${item.category}" onclick="openLightbox(${activeList.length-1})">
     <div class="video-thumb">                         <!-- UPGRADE -->
      <img src="${item.thumb}" loading="lazy" alt="Cinematic Wedding Film by The Royal Pixel Studio">
     </div>
     <div class="play-icon"><i class="fas fa-play"></i></div>
     <span class="watermark">THE ROYAL PIXEL</span>
    </div>`;
  }
 });
}

function openLightbox(i){
 current=i;
 box.style.display="flex";
 document.body.style.overflow="hidden";
 box.insertAdjacentHTML("beforeend",
  activeList[i].type==="photo"
   ? `<img src="${activeList[i].src}">`
   : `<video src="${activeList[i].video}" controls autoplay preload="none"></video>`
 );
}

function closeLightbox(){
 const media = box.querySelector("video");
 if(media) media.pause();

 box.style.display="none";
 box.innerHTML=box.innerHTML.split("</button>").slice(0,3).join("</button>");
 document.body.style.overflow="auto";
}

function changeSlide(n){
 closeLightbox();
 current=(current+n+activeList.length)%activeList.length;
 openLightbox(current);
}

function filterGallery(cat, btn){
 document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
 btn.classList.add("active");

 photoGallery.innerHTML="";
 videoGallery.innerHTML="";
 activeList=[];

 galleryData.forEach(item=>{

  if(cat==="all"){
   activeList.push(item);

   if(item.type==="photo"){
    photoGallery.innerHTML+=`
     <div class="gallery-item ${item.category}" onclick="openLightbox(${activeList.length-1})">
      <img src="${item.src}" loading="lazy" alt="Luxury Wedding Photography by The Royal Pixel Studio">
      <span class="watermark">THE ROYAL PIXEL</span>
     </div>`;
   }else{
    photoGallery.innerHTML+=`
     <div class="gallery-item ${item.category}" onclick="openLightbox(${activeList.length-1})">
      <div class="video-thumb">
       <img src="${item.thumb}" loading="lazy" alt="Cinematic Wedding Film by The Royal Pixel Studio">
      </div>
      <div class="play-icon"><i class="fas fa-play"></i></div>
      <span class="watermark">THE ROYAL PIXEL</span>
     </div>`;
   }
  }

  else if(item.category===cat && item.type==="photo"){
   activeList.push(item);
   photoGallery.innerHTML+=`
    <div class="gallery-item ${item.category}" onclick="openLightbox(${activeList.length-1})">
     <img src="${item.src}" loading="lazy" alt="Luxury Wedding Photography by The Royal Pixel Studio">
     <span class="watermark">THE ROYAL PIXEL</span>
    </div>`;
  }

  else if(item.category===cat && item.type==="video"){
   activeList.push(item);
   videoGallery.innerHTML+=`
    <div class="gallery-item ${item.category}" onclick="openLightbox(${activeList.length-1})">
     <img src="${item.thumb}" loading="lazy" alt="Cinematic Wedding Film by The Royal Pixel Studio">
     <div class="play-icon"><i class="fas fa-play"></i></div>
     <span class="watermark">THE ROYAL PIXEL</span>
    </div>`;
  }

 });
}

filterGallery("all", document.querySelector(".filter-btn"));

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", e=>{
 if(box.style.display!=="flex") return;
 if(e.key==="Escape") closeLightbox();
 if(e.key==="ArrowRight") changeSlide(1);
 if(e.key==="ArrowLeft") changeSlide(-1);
});

/* MOBILE SWIPE */
let startX=0;
box.addEventListener("touchstart",e=>{
 startX=e.touches[0].clientX;
});
box.addEventListener("touchend",e=>{
 let endX=e.changedTouches[0].clientX;
 if(startX-endX>60) changeSlide(1);
 if(endX-startX>60) changeSlide(-1);
});

document.addEventListener("load", e=>{
 if(e.target.tagName==="IMG"){
  e.target.classList.add("loaded");
 }
}, true);