import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { Layout } from 'components/Layout/Layout';
import { MainLayout } from 'components/Layout/MainLayout';

export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked');
  const url = 'https://dog.ceo/api/breeds/image/random';
  const response = await fetch(url);
  const jsonObj = await response.json();
  const imgUrl = String(jsonObj.message);
  return { props: { imgUrl } };
};
type Props = {
  imgUrl: string;
};

const Ssg: NextPage<Props> = ({ imgUrl }) => {
  return (
    <>
      <Layout title='SSG Test Page'>
        <MainLayout>
          <div className='flex justify-center'>
            <Image src={imgUrl} width={320} height={240} alt='dogs' objectFit='cover' />
          </div>
        </MainLayout>
      </Layout>
    </>
  );
};
export default Ssg;
