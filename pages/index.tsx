import type { NextPage } from 'next';
import Layout from '../components/layout';
import WorkInProgress from '../components/workInProgress';

const Home: NextPage = () => {
  return (
    <Layout>
      <WorkInProgress />
    </Layout>
  );
};

export default Home;
