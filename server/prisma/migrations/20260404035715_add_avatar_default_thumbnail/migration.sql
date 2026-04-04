-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '/public/defaults/default-avatar.png';

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "thumbnail" SET DEFAULT '/public/defaults/default-thumbnail.png';
