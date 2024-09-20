import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import LoadingAnimation from '@/components/Animation/Loading';
import Notification     from './components/notification/Notification';
import Routes from './routes/Routes';

import Layout from '@/layout/Layout.tsx';

function App() {
  return (
    <Router>
      <Layout>
        <Notification />
        <Suspense fallback={<LoadingAnimation />}>
          <Routes />
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
