import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const secretToken = process.env.SECRET_TOKEN;

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        nick: { label: 'Nick', type: 'text' },
        server: { label: 'server', type: 'text' },
        type: { label: 'type', type: 'text' }
      },
      async authorize(credentials, req) {
          const typeUrl = credentials?.type ? credentials?.type : 'login';
          const jsonType = typeUrl == "login" ?
          {
            email: credentials?.email,
						password: credentials?.password
          } :
          {
            user: {
              name: credentials?.name,
						  email: credentials?.email,
						  password: credentials?.password
            },
            character: {
              nick: credentials?.nick,
              server: credentials?.server,
            },
          };
          const response = await fetch(`${apiUrl}/${typeUrl}`, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(jsonType),
				})
				const user = await response.json()
				if (user && response.ok) {
					return user
				}else{
          throw new Error(user.meta.target); 
        }          
      }
    })
  ],
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    async jwt({ token, user}){
      user && (token.user = user);
      return token;
    },
    async session({ session, token }){
      session = token.user as any;
      return session;
    }
  },
  secret: secretToken,
};