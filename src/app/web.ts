import express, { Request, Response } from "express";
import helmet from "helmet";
import csrf from "csurf";
import cors from "cors";
import { publicRouter } from "../routes/publicRoutes";
import { authMiddleware } from "../middlewares/auth.middleware";
import { apiRoutes } from "../routes/api";
import  rateLimit from "express-rate-limit";

export const web = express();
// const csrfProtection = csrf({ cookie: true });
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});


web.use(helmet());
web.use(cors());
web.use(express.json());
web.use(limiter);
// web.use(csrfProtection)

web.use('/api/v1', publicRouter);
web.use('/api/v1', authMiddleware, apiRoutes);

web.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.send({message: 'This is protected'});
})