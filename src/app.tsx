import './App.css';
import Youtubmain from './components/youtubmain';
import Youtube from './services/youtube';

function App(repository: Youtube) {
    console.log(repository);
    return <Youtubmain onRepository={repository} />;
}

export default App;
