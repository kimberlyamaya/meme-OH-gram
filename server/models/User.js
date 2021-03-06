const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: false,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },

    password: {
      type: String,
      required: true,
    },
    memes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Meme'
      }
    ]
  }
 )

 // hash password
 userSchema.pre('save', async function (next) {
   if (this.isNew || this.isModified('password')) {
     const costFactor = 10
     this.password = await bcrypt.hash(this.password, costFactor) 
   }

   next()
 })

 // compare and validate password for logging in
 userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
 }

 // populate virtual

 const User = model('User', userSchema)

 module.exports = User