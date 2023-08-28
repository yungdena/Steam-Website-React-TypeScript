import { Application } from 'express';
import appsRouter from './api/apps.route';
import authRouter from './api/auth.route';
import bannersRouter from './api/banners.route';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/apps', appsRouter);
    this.app.use('/api/banners', bannersRouter);
  }
}

export default AppRouter;
