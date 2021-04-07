class Youtube {
    baseUri: string;
    params: object;

    constructor(basUri: string, params: object) {
        this.baseUri = basUri;
        this.params = params;
    }

    fetchDataApi = async (baseUri: string, params: any) => {
        let uri =
            baseUri +
            Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
        const data = await fetch(this.baseUri, {
            method: 'GET',
        });
        const data2 = await data.json();
        return data2;
    };

    fetchYouTubeVideosData = async () => {
        let params = {
            key: 'AIzaSyBibCTbHjNXHOBrHI7kR1EADciaZhGhR5U',
            maxResults: 25,
            chart: 'mostPopular',
        };
        let data = await this.fetchDataApi(this.baseUri, params);
        console.log(data.items);
        let items = Object.assign(data.items);
    };

    fetchYouTubeSearchData = (keyword: string) => {
        //const baseUri = 'https://youtube.googleapis.com/youtube/v3/search?';
        const baseUri = 'http://localhost:4000?';
        let params = {
            part: 'snippet',
            key: 'AIzaSyBibCTbHjNXHOBrHI7kR1EADciaZhGhR5U',
            maxResults: 25,
            q: keyword,
        };
        let data = this.fetchDataApi(baseUri, params);
        console.log(data);
        return data;
    };
}

export default Youtube;
