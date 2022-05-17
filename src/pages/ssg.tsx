import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { Layout } from 'components/uiParts/Layout/Layout';
import { MainLayout } from 'components/uiParts/Layout/MainLayout';

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
            <Image src={imgUrl} width={480} height={320} alt='dogs' objectFit='cover' />
          </div>
        </MainLayout>
      </Layout>
    </>
  );
};
export default Ssg;
