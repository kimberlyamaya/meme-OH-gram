const { Schema } = require('mongoose')

// import like
const likeSchema = require('./Like')

const memeSchema = new Schema({
  meme: {
    type: String
  },
  likes: [likeSchema]
},
{
  toJSON: {
    virtuals: true,
  },
})

// populate virtual
memeSchema.virtual('getLikes').get(function () {
  return this.likes;
});

// has to be a model so they can standalone from the user, to be displayed as generated memes
const Meme = model('Meme', memeSchema)

module.exports = Meme;