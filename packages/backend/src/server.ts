import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import axios from 'axios';

import AppRouter from './routes';
import connectDB from './config/database';
// import todoCollectionsRouter from './routes/api/todos-collection.route';
// import todosRouter from './routes/api/todos.route';
// import authRouter from './routes/api/auth.route';

const app = express();

const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

const router = new AppRouter(app);
connectDB();

app.set('port', process.env.PORT || 4200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

router.init();

const schema = buildSchema(`
  type Query {
    todos: String
  }
`);

const rootValue = {
  todos: async () => {
    const todos = await axios.get('http://localhost:5000/api/todos');
    return todos.data;
  }
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
