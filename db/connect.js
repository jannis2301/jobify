import mongoose from 'mongoose'

const connectDB = (url) => {
  mongoose.set('strictQuery', false) // only needed in older node versions
  return mongoose.connect(url)
}
export default connectDB
