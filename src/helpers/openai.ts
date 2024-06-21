import OpenAI from 'openai';
const {OPENAI_API_KEY}: any =process.env

export const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });