import { Suspense, lazy, useState } from 'react';
import Agreement from './Agreement';
import { ClimbingBoxLoader } from 'react-spinners';

const Main = lazy(() => import('./Main.js'));

function App() {
  const [agree, setAgree] = useState(false);

  if (!agree) return <Agreement onAgree={() => setAgree(true)} />;

  return (
    <div>
      <Suspense fallback={<ClimbingBoxLoader />}>
        <Main />
      </Suspense>
    </div>
  );
}

export default App;
