import React, { Component } from 'react';
import Navbar from './navbar';
import Youtubecontents from './youtubecontents';
import Loader from 'react-loader-spinner';
import styles from './youtubemain.module.css';
import Videoplayer from './videoplayer';
import Youtube from '../services/youtube';

class Youtubmain extends Component<any, any> {
    youtube: Youtube;
    constructor(props: any) {
        super(props);
        console.log(props);
        this.state = {
            // 이 컴포넌트의 state 설정
            videoData: [],
            searchData: [],
            isDataLoading: false,
        };
        this.youtube = this.props.onRepository.repository;
    }

    componentDidMount() {
        console.log('test');
        this.setState({ isDataLoading: true });
        this.youtube.fetchYouTubeSearchData('').then((response) => {
            this.setState({ isDataLoading: false });
            this.setState({ searchData: Object.assign(response.items) });
        });
    }

    fetchDataApi = async (baseUri: string, params: any) => {
        this.setState({ isDataLoading: true });
        let uri =
            baseUri +
            Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
        const data = await fetch('http://localhost:4000', {
            method: 'GET',
        }).then((response) => response.json());
        this.setState({ isDataLoading: false });
        return data;
    };

    fetchYouTubeVideosData = async () => {
        const baseUri = 'https://youtube.googleapis.com/youtube/v3/videos?';
        let params = {
            key: 'AIzaSyBibCTbHjNXHOBrHI7kR1EADciaZhGhR5U',
            maxResults: 25,
            chart: 'mostPopular',
        };
        let data = await this.fetchDataApi(baseUri, params);
        console.log(data.items);
        let items = Object.assign(data.items);
        this.setState({ videoData: items });
    };

    fetchYouTubeSearchData = async (keyword: string) => {
        //const baseUri = 'https://youtube.googleapis.com/youtube/v3/search?';
        const baseUri = 'http://localhost:4000?';
        let params = {
            // part: 'snippet',
            // key: 'AIzaSyBibCTbHjNXHOBrHI7kR1EADciaZhGhR5U',
            // maxResults: 25,
            // q: keyword,
        };
        let data = await this.fetchDataApi(baseUri, params);
        console.log(data);
        let items = Object.assign(data.items);
        this.setState({ searchData: items });
    };

    render() {
        const contents = <Youtubecontents videoData={this.state.searchData} />;
        const spinner = (
            <div className={styles.container}>
                <Loader type="TailSpin" color="#ababab" height={80} width={80} />
            </div>
        );
        return (
            <div>
                <Navbar onGetData={this.fetchYouTubeSearchData} />
                <Youtubecontents videoData={this.state.searchData} />
                {/* {this.state.isDataLoading?spinner:contents} */}
                {/* <Videoplayer /> */}
            </div>
        );
    }
}

export default Youtubmain;
