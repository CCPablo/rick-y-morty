export function queryEpisodes(queryParams, callback = () => '') {
    axios
        .get(
            `https://rickandmortyapi.com/api/episode${episodesArr.length ? '/' + episodesArr : ''}`,
            queryParams
        )
        .then(callback)
}
