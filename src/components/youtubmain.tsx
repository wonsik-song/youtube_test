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
            videoData: [],
            searchData: [],
            isDataLoading: false,
            mode: 'search',
        };
        this.youtube = this.props.onRepository.repository;
    }

    componentDidMount() {
        console.log('test');
        this.setState({ isDataLoading: true });
        this.fetchYouTubeSearchData('');
    }

    fetchYouTubeSearchData = (keyword: string) => {
        this.youtube.fetchYouTubeSearchData(keyword).then((response) => {
            this.setState({ isDataLoading: false });
            this.setState({ searchData: Object.assign(response.items) });
        });
    };

    checkChnnalID(itemId: string, selectItemId: string) {
        return itemId === selectItemId;
    }
    onContentClick(channelId: any) {
        const data = this.state.searchData.filter((test: any) => test.snippet.channelId === channelId).slice(0, 1);
        console.log('test2', data[0].id.videoId);
        const videoData = Object.assign(data[0]);
        const currentMode = this.state.mode === 'search' ? 'video' : 'search';
        this.setState({ videoData: videoData });
        this.setState({ mode: currentMode });
    }

    render() {
        const contents = (
            <div className={styles.youtube_contents}>
                <Youtubecontents videoData={this.state.searchData} selectContent={this.onContentClick.bind(this)} />;
            </div>
        );

        const videoPlayer = (
            <div className={styles.vidoe_player}>
                <Videoplayer videoId={this.state.videoData} />
            </div>
        );
        const navbar = <Navbar onGetData={this.fetchYouTubeSearchData} />;
        const spinner = (
            <div className={styles.spinner}>
                <Loader type="TailSpin" color="#ababab" height={80} width={80} />
            </div>
        );
        return (
            <div>
                {this.state.mode === 'search' ? navbar : ''}
                {this.state.isDataLoading ? spinner : ''}
                <div className={styles.body_container}>
                    {this.state.mode !== 'search' ? videoPlayer : ''}
                    {contents}
                </div>
            </div>
        );
    }
}

export default Youtubmain;
