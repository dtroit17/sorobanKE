const { buildConfig } = require('payload/config');
const BlogPosts = require('./collections/BlogPosts');
const Courses = require('./collections/Courses');
const Users = require('./collections/Users');
const NFTs = require('./collections/NFTs');
const Crowdfunding = require('./collections/Crowdfunding');

module.exports = buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    BlogPosts,
    Courses,
    Users,
    NFTs,
    Crowdfunding,
  ],
  globals: [],
  cors: '*',
  csrf: [],
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  upload: {
    limits: {
      fileSize: 1000000, // 1MB
    },
  },
  localization: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
  },
  graphQL: {
    disable: false,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, previousDoc }) => {
        if (operation === 'create' || operation === 'update') {
          // Custom logic after document change
        }
      },
    ],
  },
});
