import { Request, Response } from "express";
import { LibraryService } from "../services/library.service";

export class LibraryController {
  constructor(private libraryService: LibraryService) {}

  async addToWishlist(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.libraryService.addToWishlist(userId, appId, res);
  }

  async addToLibrary(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.libraryService.addToLibrary(userId, appId, res);
  }

  async deleteFromWishlist(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.libraryService.deleteFromWishlist(userId, appId, res);
  }

  async deleteFromLibrary(req: Request, res: Response) {
    const { userId, appId } = req.body;

    await this.libraryService.deleteFromLibrary(userId, appId, res);
  }

  async getWishlist(req: Request, res: Response) {
    const { id } = req.params;

    await this.libraryService.getWishlist(id, res);
  }

  async getLibrary(req: Request, res: Response) {
    const { id } = req.params;

    await this.libraryService.getLibrary(id, res);
  }
}

const libraryController = new LibraryController(new LibraryService());
export default libraryController;
