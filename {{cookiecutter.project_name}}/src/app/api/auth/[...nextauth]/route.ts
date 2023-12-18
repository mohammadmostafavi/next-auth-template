import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { $axios } from "@/services/core/$axios";

interface IToken {
  access: string;
}
interface IUser {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}
interface ILoginResponse {
  access: string;
  refresh: string;
}

async function refreshAccessToken(token:string) {
  try {
    const response = await $axios.post("/api/authentication/jwt/refresh/", {
      refresh: token,
    });
    const refreshedTokens:IToken = response.data;

    return {accessToken: refreshedTokens.access, refreshToken: token};
  } catch (error) {
    // console.log(error);

    return {
      refreshToken: token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions : AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {

        const resToken = await $axios.post(
          "/api/authentication/jwt/login/",
          {
            username: credentials?.username,
            password: credentials?.password,
          }
        );
        const tokens = resToken.data;
        if (tokens) {
          // Any object returned will be saved in `user` property of the JWT
          const resUser = await $axios.get("/api/users/profile/",{
            headers: {
              Authorization: `Bearer ${tokens.access}`,
            },
          });
          const user:IUser = resUser.data;
          // If no error and we have access token, return it
          if (user) {
            return {...user,accessToken:tokens.access,refreshToken:tokens.refresh};
          }
        }

        
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      
      // Initial sign in
      if (user) {
        return {
          accessToken : user.accessToken,
          refreshToken: user.refreshToken,
          user,
        }
      }

      // Return previous token if the access token has not expired yet
      
      if (Date.now() < (token as { exp: number }).exp * 1000 ) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken((token as { refreshToken: string }).refreshToken);
    },
    async session ({session}) {
      return session;
    },
  },
  pages:{
    signIn: '/login',
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
