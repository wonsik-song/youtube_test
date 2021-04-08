class Youtube {
    baseUri: string;
    secretKey: string;

    constructor(basUri: string, secretKey: string) {
        console.log(basUri);
        console.log(secretKey);
        this.baseUri = basUri;
        this.secretKey = secretKey;
    }

    fetchDataApi = async (baseUri: string, params: any) => {
        let uri =
            baseUri +
            Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
        const data = await fetch(uri, {
            method: 'GET',
        });
        const data2 = await data.json();
        return data2;
    };

    fetchYouTubeVideosData = async () => {
        let params = {
            key: this.secretKey,
            maxResults: 25,
            chart: 'mostPopular',
        };
        let data = await this.fetchDataApi(this.baseUri, params);
        console.log(data.items);
        let items = Object.assign(data.items);
    };

    fetchYouTubeSearchData = (keyword: string) => {
        //const baseUri = 'https://youtube.googleapis.com/youtube/v3/search?';
        // const baseUri = 'http://localhost:4000?';
        let params = {
            part: 'snippet',
            key: 'AIzaSyAOi3MPTf4Z8KeZcLWLkkMWHydd2hF7ySA',
            maxResults: 25,
            q: 'bts',
        };
        console.log(this.baseUri);
        let data = this.fetchDataApi(this.baseUri, params);
        console.log(data);
        return data;
    };
}

export default Youtube;
