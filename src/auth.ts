// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [GitHub],
// });

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/lib/connectMongo"; // Your MongoDB connection function
import Author from "@/models/author"; // Your Mongoose model

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB(); // Connect to MongoDB

        // Check if user already exists
        const existingUser = await Author.findOne({ email: user.email });

        if (!existingUser) {
          // Create a new user in MongoDB
          await Author.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          console.log("New user created:", user);
        } else {
          console.log("User already exists:", existingUser);
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error storing user in MongoDB:", error);
        return false; // Reject sign-in if an error occurs
      }
    },
    async session({ session, user }) {
      // Add user ID to session object
      const dbUser = await Author.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
