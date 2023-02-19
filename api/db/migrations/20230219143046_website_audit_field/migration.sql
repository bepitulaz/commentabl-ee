/*
  Warnings:

  - Added the required column `updatedAt` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Website" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "domain" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Website" ("domain", "id") SELECT "domain", "id" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
CREATE INDEX "Website_domain_idx" ON "Website"("domain");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
