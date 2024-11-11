import express, { Request, Response } from "express";
import helmet from "helmet";
import csrf from "csurf";
import cors from "cors";
import { publicRouter } from "../routes/publicRoutes";
import { authMiddleware } from "../middlewares/auth.middleware";
import { apiRoutes } from "../routes/api";

export const web = express();
// const csrfProtection = csrf({ cookie: true });

web.use(helmet());
web.use(cors());
web.use(express.json());
// web.use(csrfProtection)

web.use('/v1/api', publicRouter);
web.use('/v1/api', authMiddleware, apiRoutes);

web.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.send({message: 'This is protected'});
})