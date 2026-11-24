import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins/jwt";
import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/wedplan";

let client: MongoClient;

declare global {
  var _mongoClientPromise: MongoClient | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri);
  }
  client = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
}

const db = client.db("wedplan");

const getAuthBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === "production") return "https://client-rho-five-11.vercel.app";
  return "http://localhost:3000";
};

export const auth = betterAuth({
  database: mongodbAdapter(db),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "customer",
        required: false,
      },
      isBlocked: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      businessName: {
        type: "string",
        required: false,
      },
      subscriptionPlan: {
        type: "string",
        defaultValue: "free",
        required: false,
      },
      subscriptionExpiresAt: {
        type: "date",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "mock_google_client_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_google_client_secret",
    },
  },
  plugins: [
    jwt({
      jwt: {
        definePayload: async (session) => {
          return {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: (session.user as any).role || "customer",
          };
        },
      },
    }),
  ],
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://client-rho-five-11.vercel.app",
    "https://wedplan-server-gilt.vercel.app",
    process.env.NEXT_PUBLIC_APP_URL || "",
    process.env.BETTER_AUTH_URL || "",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
  ].filter(Boolean),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "wedplan_local_dev_only_better_auth_secret_change_me",
  baseURL: getAuthBaseUrl(),
});
