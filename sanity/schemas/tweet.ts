import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    defineField({
      name: 'tweetType',
      title: 'Tweet Type',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text in Tweet',
      type: 'string',
    }),
    defineField({
      name: 'blockTweet',
      title: 'Block Tweet',
      description: 'ADMIN controls: Toggle if Tweet is deemed inappropriate',
      type: 'boolean',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'retweeter',
      title: 'Retweeter Name',
      type: 'string',
    }),
    defineField({
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Tweet Image',
      type: 'string',
    }),
    defineField({
      name: 'likes',
      title: 'Liked Users',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'retweets',
      title: 'Retweeted Users',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
