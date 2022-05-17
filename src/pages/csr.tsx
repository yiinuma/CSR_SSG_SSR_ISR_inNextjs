import { NextPage } from 'next';
import Image from 'next/image';

import { Layout } from 'components/uiParts/Layout/Layout';
import { MainLayout } from 'components/uiParts/Layout/MainLayout';
import { useEffect, useState } from 'react';

const Csr: NextPage = () => {
  const [img, setImg] = useState<string>('');

  useEffect(() => {
    console.log('csr invoked');
    const url = 'https://dog.ceo/api/breeds/image/random';
    const getImg = async () => {
      const response = await fetch(url);
      const jsonObj = await response.json();
      const imgUrl = String(jsonObj.message);
      setImg(imgUrl);
    };
    getImg();
  }, []);

  return (
    <>
      <Layout title='CSR(SSG + CSF) Test Page'>
        <MainLayout>
          <div className='flex justify-center'>
            {img && <Image src={img} width={480} height={320} alt='dogs' objectFit='cover' />}
          </div>
        </MainLayout>
      </Layout>
    </>
  );
};
export default Csr;
