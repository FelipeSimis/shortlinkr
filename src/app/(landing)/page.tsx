import { ShortUrlHistoryTable } from '@/components/short-url-history-table';

type HomeProps = {
  searchParams: {
    page?: string;
  };
};

const Home = ({ searchParams }: HomeProps) => {
  const page = Number(searchParams?.page) || 1;

  return <ShortUrlHistoryTable page={page} />;
};

export default Home;
