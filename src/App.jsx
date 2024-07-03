import logo from './logo.svg';
import styles from './App.module.css';
import Channels from './Channels';
import EventComponent from './EventComponent';

function App() {
  return (
    <div class={styles.App}>
      <Channels />
      <EventComponent />
    </div>
  );
}

export default App;
