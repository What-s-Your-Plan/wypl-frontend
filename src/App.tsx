import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Global } from '@emotion/react';

import Notification from './components/notification/Notification';
import Routes from './routes/Routes';

import LoadingAnimation from '@/components/Animation/Loading';
import Layout from '@/layout/Layout.tsx';
import { GlobalStyle } from '@/styles/GlobalStyle.ts';

function App() {
  return (
    <Router>
      <Global styles={GlobalStyle} />
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
