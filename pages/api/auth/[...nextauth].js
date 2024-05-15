import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

export const authOptions = {
    session: {
        jwt: true    
    },
    providers: [
        CredentialsProvider({
            // This function will be called whenever user logs in
            async authorize({ email, password }) {
                const client = await connectToDB();

                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({ email });

                if (!user) {
                    client.close();
                    // By throwing an error, authorize will reject this promise
                    // and by default redirecting client to another page
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(password, user.password);

                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();

                // Returning an object in authorize let NextAuth know authorization succeeded
                // The object will be encoded into JSON Web Token
                return { email: user.email };
            }
        })
    ]
};

export default NextAuth(authOptions);
