export class Episode {
    constructor(rawEpisode) {
        this.name = rawEpisode.name
        this.episode = rawEpisode.episode
        this.url = rawEpisode.url
    }

    isEqual(episode) {
        return (
            this.name === episode.name &&
            this.episode === episode.episode &&
            this.url === episode.url
        )
    }

    get navHtmlNode() {
        const $episodeWrapper = document.createElement('li')
        $episodeWrapper.className = 'nav__episode'
        $episodeWrapper.addEventListener('click', () => {
        })
        const $number = document.createElement('h4')
        $number.className = 'nav__episode-number'
        $number.innerText = `Ep ${this.number}`
        const $name = document.createElement('span')
        $name.className = 'nav__episode-name'
        $name.innerText = this.name

        $episodeWrapper.appendChild($number)
        $episodeWrapper.appendChild($name)
        return $episodeWrapper
    }

    get season() {
        return this.episode.slice(1, 3)
    }

    get number() {
        return this.episode.slice(4, 6)
    }
}
