import { Request, Response } from "express";
import { createNewEvent } from "../service/create.service";

export const postNew = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const result = await createNewEvent(req.body)
  
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  };