import axios from "axios";

export default class ImageApiService {
    constructor() {
        this.searchQuery = "";
        this.image_type = "";
        this.page = 1;
    }

    async fetchImages() {
        const API_KEY = '31702044-2ea23ebf9858467e7c06f0c89';
        const params = new URLSearchParams({
            image_type: this.image_type,
            orientation: "horisontal",
            safesearch: true,
            page: this.page
        })
        const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&${params}`;

        const responce = await axios.get(URL);
        return await responce.data.hits;
    }

    addPage() {
        this.page += 1;
    }

    resPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    get type() {
        return this.image_type;
    }

    set type(imgType) {
        this.image_type = imgType;
    }
}