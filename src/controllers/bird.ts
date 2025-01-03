import express from "express";
import Bird from "../models/bird";
import { ObjectId } from "mongodb";

export const getAllBirds = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const birds = await Bird.find({});
    res.json({
      success: true,
      data: birds || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const createBird = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const {
      commonName,
      scientificName,
      description,
      habitat,
      appearance,
      photos,
    } = req.body;

    if (
      !commonName ||
      !scientificName ||
      !description ||
      !habitat ||
      !appearance?.size ||
      !appearance?.color?.length
    ) {
      res.status(400).json({
        success: false,
        error: "Missing required fields or invalid appearance data",
      });
      return;
    }

    const bird = await Bird.create(req.body);
    res.status(201).json({ success: true, data: bird });
  } catch (error) {
    console.error(error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ success: false, error: errorMessage });
  }
};

export const getOneBird = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const bird = await Bird.findById(id);
    if (!bird) {
      res.status(404).json({
        success: false,
        message: "Bird not found",
      });
      return;
    }
    res.status(200).json({ success: true, data: bird });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const updateBird = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const bird = await Bird.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!bird) {
      res.status(404).json({ success: false, message: "Bird not found" });
      return;
    }
    res.status(200).json({ success: true, data: bird });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteBird = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const bird = await Bird.findOneAndDelete({ _id: id });
    if (!bird) {
      res.status(404).json({
        success: false,
        message: "Bird not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Bird deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
