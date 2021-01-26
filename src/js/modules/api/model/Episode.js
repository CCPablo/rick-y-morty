/*
    air_date: "January 20, 2014"
    characters: (20) ["https://rickandmortyapi.com/api/character/1", "https://rickandmortyapi.com/api/character/2", "https://rickandmortyapi.com/api/character/38", "https://rickandmortyapi.com/api/character/41", "https://rickandmortyapi.com/api/character/89", "https://rickandmortyapi.com/api/character/116", "https://rickandmortyapi.com/api/character/117", "https://rickandmortyapi.com/api/character/120", "https://rickandmortyapi.com/api/character/175", "https://rickandmortyapi.com/api/character/193", "https://rickandmortyapi.com/api/character/238", "https://rickandmortyapi.com/api/character/242", "https://rickandmortyapi.com/api/character/271", "https://rickandmortyapi.com/api/character/303", "https://rickandmortyapi.com/api/character/326", "https://rickandmortyapi.com/api/character/333", "https://rickandmortyapi.com/api/character/338", "https://rickandmortyapi.com/api/character/343", "https://rickandmortyapi.com/api/character/399", "https://rickandmortyapi.com/api/character/400"]
    created: "2017-11-10T12:56:34.236Z"
    episode: "S01E05"
    id: 5
    name: "Meeseeks and Destroy"
    url: "https://rickandmortyapi.com/api/episode/5"
*/

export class Episode {
    constructor(episode) {
        Object.assign(this, episode)
    }

    isEqual(episode) {
        return this._isEqualObj(this, episode)
    }

    get season() {
        return this.episode.slice(1, 3)
    }

    get number() {
        return this.episode.slice(4, 6)
    }

    _isEqualObj(object1, object2) {
        return (
            Object.entries(object1).findIndex((entry) => {
                return !this._isEqualEl(entry[1], object2[entry[0]])
            }) == -1
        )
    }

    _isEqualEl(el1, el2) {
        if(Array.isArray(el1) && Array.isArray(el2)) {
            return this._isEqualArr(el1, el2)
        } else if(typeof el1 === "object" && typeof el2 === "object" ) {
            return this._isEqualObj(el1, el2)
        } else {
            return el1 === el2
        }
    }

    _isEqualArr(array1, array2) {
        return (
            array1.length === array2.length &&
            array1.every((element, index) => this._isEqualEl(element, array2[index]))
        )
    }
}
