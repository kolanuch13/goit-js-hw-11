import ImageApiService from "./requests/fetch";
import { Notify } from "notiflix";
import templateFunction from './templates/image.hbs';
import simpleLightbox from "simplelightbox";

const myRequest = new ImageApiService();

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.search-form-input'),
    button: document.querySelector('.search-form-button'),
    list: document.querySelector('.image-list'),
    gallery: document.querySelector('.gallery')
}
 
const makePage = (event => {
    event.preventDefault();

    myRequest.query = refs.input.value;
    myRequest.resPage();
    myRequest.fetchImages()
    .then(images => {
        if (images.length > 0) {
            refs.gallery.innerHTML = templateFunction(images);
            let lightbox = new simpleLightbox('.gallery a', { /* options */ });
        } else {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    })
})

const updatePage = (() => {
    myRequest.addPage();
    myRequest.fetchImages()
        .then(images => {
            refs.gallery.insertAdjacentHTML('beforeend', templateFunction(images));
        });
})

refs.form.addEventListener('submit', makePage);

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        updatePage();
    }
})