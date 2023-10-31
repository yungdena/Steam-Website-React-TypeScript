/* eslint-disable no-console */
import { ConnectionOptions, connect } from 'mongoose';

const connectDB = async () => {
  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };
    await connect(process.env.MONGO_URI, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(`Encountered error while connecting to database ${err}`);
    process.exit(1);
  }
};

export default connectDB;
