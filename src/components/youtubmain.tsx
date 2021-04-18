import React, { Component } from 'react';
import Navbar from './navbar';
import Youtubecontents from './youtubecontents';
import Loader from 'react-loader-spinner';
import styles from './youtubemain.module.css';
import Videoplayer from './videoplayer';
import Youtube from '../services/youtube';
import Content from './content';

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
            console.log('test2');
            console.log(response.items);
            this.setState({ searchData: Object.assign(response.items) });
            console.log(this.state.searchData);
        });
    };

    checkChnnalID(itemId: string, selectItemId: string) {
        return itemId === selectItemId;
    }
    onContentClick(channelId: any) {
        const data = this.state.searchData.filter((item: any) => item.snippet.channelId === channelId).slice(0, 1);
        const videoData = Object.assign(data[0]);
        const currentMode = this.state.mode === 'search' ? 'video' : 'search';
        this.setState({ videoData: videoData });
        this.setState({ mode: currentMode });
    }

    getYoutubItems() {
        let listItem = [];
        if (this.state.searchData !== undefined) {
            listItem = this.state.searchData.map((item: any) => (
                <div id={styles.youtube_item}>
                    <Content content={item.snippet} selectContent={this.onContentClick.bind(this)} />
                </div>
            ));
        }
        return listItem;
    }

    render() {
        return (
            <div id={styles.main_container}>
                <div id={styles.navbar}>{this.state.mode === 'search' ? <Navbar onGetData={this.fetchYouTubeSearchData} /> : ''}</div>
                <div id={styles.content_container}>
                    {/* <div id={styles.video_player}>{this.state.mode !== 'search' ? <Videoplayer videoId={this.state.videoData} /> : ''}</div>
                    <div id={styles.item_container}>{this.getYoutubItems()}</div> */}
                    {this.state.mode !== 'search' ? (
                        <div id={styles.video_player}>
                            {' '}
                            <Videoplayer videoId={this.state.videoData} />{' '}
                        </div>
                    ) : (
                        ''
                    )}
                    <div id={styles.item_container}>{this.getYoutubItems()}</div>
                </div>
                <div className={styles.spinner}>{this.state.isDataLoading ? <Loader type="TailSpin" color="#ababab" height={80} width={80} /> : ''}</div>
            </div>
        );
    }
}

export default Youtubmain;
