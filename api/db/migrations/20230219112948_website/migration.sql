-- CreateTable
CREATE TABLE "Website" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "domain" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Website_domain_idx" ON "Website"("domain");
