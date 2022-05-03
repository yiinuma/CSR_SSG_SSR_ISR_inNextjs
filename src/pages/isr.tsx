import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { Layout } from 'components/Layout/Layout';
import { MainLayout } from 'components/Layout/MainLayout';

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ISR invoked');
  const url = 'https://dog.ceo/api/breeds/image/random';
  const response = await fetch(url);
  const jsonObj = await response.json();
  const imgUrl = String(jsonObj.message);
  return { props: { imgUrl }, revalidate: 10 };
};
type Props = {
  imgUrl: string;
};

const Isr: NextPage<Props> = ({ imgUrl }) => {
  return (
    <>
      <Layout title='ISR Test Page (revalidate: 10sec)'>
        <MainLayout>
          <div className='flex justify-center'>
            <Image src={imgUrl} width={480} height={320} alt='dogs' objectFit='cover' />
          </div>
        </MainLayout>
      </Layout>
    </>
  );
};
export default Isr;
