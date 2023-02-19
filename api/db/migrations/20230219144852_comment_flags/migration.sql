-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "websiteId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "parentId" INTEGER,
    "isSpam" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Comment" ("createdAt", "id", "link", "message", "parentId", "updatedAt", "websiteId") SELECT "createdAt", "id", "link", "message", "parentId", "updatedAt", "websiteId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE INDEX "Comment_websiteId_link_parentId_idx" ON "Comment"("websiteId", "link", "parentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
