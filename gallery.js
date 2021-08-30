import gallery from './app.js';
console.log(gallery);

const galleryListRef = document.querySelector('.js-gallery');
const modalPictureRef = document.querySelector('.lightbox');
const backdropImageRef = document.querySelector('.lightbox__overlay');
const btnModalCloseRef = document.querySelector('.lightbox__button');
const imgRef = document.querySelector('.lightbox__image');

let indexOfOriginalLink = 0;
const originalLinks = gallery.map(el => {
    return el.original;
  });

function createGallery(gallery){
    return gallery.map(({preview, original, description})=>{
    return `<li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
    />
    </a>
    </li>`
    }).join('');
};

const galleryListImg = createGallery(gallery);
galleryListRef.insertAdjacentHTML('beforeend', galleryListImg);
console.log(galleryListImg);
galleryListRef.addEventListener('click', onClickImage);
btnModalCloseRef.addEventListener('click', onCloseImage);

function onClickImage(evt){
    evt.preventDefault()
    if(!evt.target.classList.contains('gallery__image')){
        return;
    };
modalPictureRef.classList.add('is-open');

window.addEventListener('keydown', onCloseClickEsc);
window.addEventListener('keydown',arrowNavigation);
imgRef.src=evt.target.dataset.source;
indexOfOriginalLink = originalLinks.indexOf(evt.target.dataset.source);
};

function onCloseImage(){
    window.removeEventListener('keydown', onCloseClickEsc);
    window.removeEventListener('keydown',arrowNavigation);
    modalPictureRef.classList.remove('is-open');
imgRef.src='';
};

backdropImageRef.addEventListener('click', onCloseBackdropClickImg);
function onCloseBackdropClickImg(evt){
    if(evt.target===evt.currentTarget){
        onCloseImage()
    }
};

function onCloseClickEsc(evt){
    if(evt.code==='Escape'){
        onCloseImage()
    }
};

const moveToLeft = evt => {
    if (evt.code === 'ArrowLeft') {
      indexOfOriginalLink > 0
        ? (imgRef.src = originalLinks[(indexOfOriginalLink -= 1)])
        : (imgRef.src =
            originalLinks[(indexOfOriginalLink = originalLinks.length - 1)]);
    }
};

const moveToRight = evt => {
    if (evt.code === 'ArrowRight') {
      indexOfOriginalLink < originalLinks.length - 1
        ? (imgRef.src = originalLinks[(indexOfOriginalLink += 1)])
        : (imgRef.src = originalLinks[(indexOfOriginalLink = 0)]);
    }
};

const arrowNavigation = evt => {
    if (!modalPictureRef.classList.contains('is-open')) {
      return;
    }
    moveToLeft(evt);
    moveToRight(evt);
};








