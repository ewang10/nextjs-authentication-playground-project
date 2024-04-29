import { getSession } from 'next-auth/react';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  // getSession will automatically looks into the request
  // and extract the data it needs, the session token cookie,
  // and see if it's valid
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false  // indicate if it's permanent or temporary redirect
      }
    };
  }

  return {
    props: {
      session
    }
  };
}

export default ProfilePage;
