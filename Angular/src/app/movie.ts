export class Movie {
    constructor(
        private _id: string,
        private _name: string,
        private language: string,
        private _format: string,
        private _rating: number,
        private imgSrc: string,
        private city: string
    ) { }

    get rating() {
        return this._rating;
    }

    get name() {
        return this._name;
    }

    get format() {
        return this._format;
    }

    get id() {
        return this._id;
    }
}
