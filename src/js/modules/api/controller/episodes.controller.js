
export function queryEpisodes(callback = () => '', queryParams, episodesArr) {
    axios
        .get(
            `https://rickandmortyapi.com/api/episode${episodesArr.length ? '/' + episodesArr : ''}`,
            queryParams
        )
        .then(callback)
}