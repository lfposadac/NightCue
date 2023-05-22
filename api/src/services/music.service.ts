import { CreateMusicDto, UpdateMusicDto } from "../dtos/music.dto";
import { MusicDocument } from "../interfaces/music.document";
import MusicModel from "../models/music.model";

class MusicService {
  async getMusic(where = {}): Promise<MusicDocument[]> {
    try {
      const musics = await MusicModel.find(where);
      return musics;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createMusic(musicDto: CreateMusicDto): Promise<MusicDocument> {
    try {
      const music = new MusicModel({ ...musicDto, status: true });
      const savedMusic = await music.save();
      return savedMusic;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateMusic(
    id: string,
    musicDto: UpdateMusicDto
  ): Promise<MusicDocument> {
    try {
      const musicUpdated = await MusicModel.findByIdAndUpdate(id, musicDto, {
        new: true,
      });
      if (!musicUpdated) throw new Error("Music not found");
      return musicUpdated;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteMusic(id: string): Promise<MusicDocument> {
    try {
      const musicDeleted = await MusicModel.findByIdAndDelete(id);
      if (!musicDeleted) throw new Error("Music not found");
      return musicDeleted;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

const musicService = new MusicService();

export default musicService;
