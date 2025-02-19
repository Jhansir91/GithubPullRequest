import './App.css';

import PullRequestList from './components/PullRequestList';

const App = () => {
  return (
    <div className="App container">
      <PullRequestList />
      <footer className="App-footer text-center mt-4">
        <p>&copy; 2023 GitHub App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
