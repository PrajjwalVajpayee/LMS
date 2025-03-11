import mongoose from 'mongoose';

// Database connection function
const connectdb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/LMS`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database Connected');
  } catch (error) {
    console.error('Database Connection Error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectdb;
