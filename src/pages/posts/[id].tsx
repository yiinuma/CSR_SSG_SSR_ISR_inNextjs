import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

import { Layout } from 'components/Layout/Layout';
import { POST } from 'types/jsonPlaceHolder';
import { getAllPostIds, getPostData } from 'lib/jsonPlaceFetch';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(ctx.params?.id as string);
  return {
    props: {
      ...post,
    },
  };
};

const PostDetail: React.FC<POST> = ({ id, title, body }) => {
  return (
    <Layout title={title}>
      <p className='m-4'>ID : {id}</p>
      <p className='mx-10 mb-12'>{body}</p>
      <Link href='/blog-page'>
        <a className='mt-12 flex cursor-pointer' data-testid='back-blog'>
          👈 Back to blog-page
        </a>
      </Link>
    </Layout>
  );
};

export default PostDetail;
