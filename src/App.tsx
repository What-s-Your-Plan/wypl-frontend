import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import LoadingAnimation from './components/animation/Loading';
import Notification from './components/notification/Notification';
import Routes from './routes/Routes';

function App() {
  return (
    <Router>
      <Notification />
      <Suspense fallback={<LoadingAnimation />}>
        <Routes />
      </Suspense>
    </Router>
  );
}

export default App;
