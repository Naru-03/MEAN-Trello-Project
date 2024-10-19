import { Request, Response, NextFunction } from "express";
import BoardModel from '../models/board';
import { ExpressRequestInterface } from '../types/expressRequest.intetface';
export const getBoards = async (req: ExpressRequestInterface, res: Response, next: NextFunction): Promise<any> => {
    try {
        if (!req.user) {
            return res.sendStatus(401)
        }
        const boards = await BoardModel.find({ userId: req.user.id })
        if (!boards) {
            return res.sendStatus(401)
        }
        res.send(boards)
    } catch (err) {
        next(err as Error);
    }
}