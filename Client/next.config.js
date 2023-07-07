// module.exports = {
//   env: {
//     OPENAI_API_KEY: process.env.OPENAI_API_KEY,
//     PINECONE_API_KEY: process.env.PINECONE_API_KEY,
//     PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
//     PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
//     BACK_URL: process.env.BACK_URL,
//     STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   webpack(config) {
      config.experiments = { ...config.experiments, topLevelAwait: true };
      return config;
   },
   env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      PINECONE_API_KEY: process.env.PINECONE_API_KEY,
      PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
      PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
      BACK_URL: process.env.BACK_URL,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      FOOT_API: process.env.FOOT_API,

   },
};

module.exports = nextConfig;
