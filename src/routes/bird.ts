import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import {
  getAllBirds,
  createBird,
  getOneBird,
  updateBird,
  deleteBird,
} from "../controllers/bird";

const router = Router();

const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    res.status(400).json({ success: false, error: "Invalid ID format" });
    return;
  }

  next();
};

router.get("/", getAllBirds);

router.get("/:id", validateObjectId, getOneBird);

router.post("/", createBird);

router.put("/:id", validateObjectId, updateBird);

router.delete("/:id", validateObjectId, deleteBird);

export default router;
