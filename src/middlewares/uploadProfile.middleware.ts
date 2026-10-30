import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import multer from "multer";
import type { RequestHandler } from "express";

export const profileUploadsPath = path.join(process.cwd(), "uploads", "perfiles");
fs.mkdirSync(profileUploadsPath, { recursive: true });

const extensionByMimeType: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export const uploadProfilePhoto = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, profileUploadsPath),
    filename: (_req, file, callback) => {
      const extension = extensionByMimeType[file.mimetype];
      callback(null, `${randomUUID()}${extension}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!extensionByMimeType[file.mimetype]) {
      callback(new Error("La foto debe ser JPG, PNG o WEBP"));
      return;
    }
    callback(null, true);
  },
});

export const receiveProfilePhoto: RequestHandler = (req, res, next) => {
  uploadProfilePhoto.single("foto")(req, res, (error: unknown) => {
    if (!error) {
      next();
      return;
    }
    const message = error instanceof Error ? error.message : "No se pudo procesar la foto";
    const status = error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    res.status(status).json({ message });
  });
};
