import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/ErrorResponse.interface";
import { createError } from "../utils/errors/createError";
import { MusicDocument } from "../interfaces/music.document";
import musicService from "../services/music.service";
import { CreateMusicDto, UpdateMusicDto } from "../dtos/music.dto";

export const getMusic = () => {
  return async (req: Request, res: Response) => {
    try {
      const query = req.query;
      const music: MusicDocument[] = await musicService.getMusic(query);
      return res.status(200).json({
        message: "Music found",
        status: 200,
        data: music,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const createMusic = () => {
  return async (req: Request, res: Response) => {
    try {
      const music: CreateMusicDto = req.body;
      const newMusic: MusicDocument = await musicService.createMusic(music);
      return res.status(200).json({
        message: "Music created",
        status: 200,
        data: newMusic,
      });
    } catch (error) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const updateMusic = () => {
  return async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const music: UpdateMusicDto = req.body;
      const musicUpdated: MusicDocument = await musicService.updateMusic(
        id,
        music
      );
      return res.status(200).json({
        message: "Music updated",
        status: 200,
        data: musicUpdated,
      });
    } catch (error: any) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};

export const deleteMusic = () => {
  return async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const musicDeleted: MusicDocument = await musicService.deleteMusic(id);
      return res.status(200).json({
        message: "Music deleted",
        status: 200,
        data: musicDeleted,
      });
    } catch (error: any) {
      const errorResponse: ErrorResponse = createError(error);
      return res.status(errorResponse.status).json(errorResponse);
    }
  };
};
