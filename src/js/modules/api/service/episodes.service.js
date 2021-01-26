import { Episode } from '../model/Episode.js'
import { queryEpisodes } from '../controller/episodes.controller.js'

/* info:
    count: 41
    next: "https://rickandmortyapi.com/api/episode?page=2"
    pages: 3
    prev: null
*/

export function getEpisodes(
    callback = () => '',
    queryParams,
    episodesArr = []
) {
    queryEpisodes(
        (response) => {
            callback({
                info: response.data.info,
                episodes: extractEpisodes(response.data),
            })
        },
        queryParams,
        episodesArr
    )

    function extractEpisodes(data) {
        let episodes = []
        if (data.results) {
            episodes = data.results.map(mapToEpisode)
        } else {
            if (Array.isArray(data)) {
                episodes = [...data].map(mapToEpisode)
            } else {
                episodes = mapToEpisode(data)
            }
        }
        return episodes
    }

    function mapToEpisode(rawEpisode) {
        return new Episode(rawEpisode)
    }
}
