import React, { Component } from 'react';
import styles from './navbar.module.css';

class Navbar extends Component<any, any> {
    content:any;

    constructor(props:any) {
        super(props); // React.Component의 생성자 메소드를 먼저 실행
        this.content = React.createRef();
    }

    handleClick = () => {
        console.log(this.content);
        this.props.onGetData(this.content.current.value);
    };

    handleKeyPress = (e: any) => {
        console.log(this.content);
        if (e.key === 'Enter') {
            this.props.onGetData(this.content.current.value);
        }
    };

    render() {
        return (
            <div className={styles.navbar}>
                <div className={styles.title_container}>
                    <span className={styles.icon}>
                        <i className="fab fa-youtube"></i>
                    </span>
                    <span className={styles.title}>YouTube</span>
                </div>
                <div className={styles.search_container}>
                    <input ref={this.content} onKeyPress={this.handleKeyPress} className={styles.input} type="text" />
                    <button className={styles.search} onClick={this.handleClick}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Navbar;
