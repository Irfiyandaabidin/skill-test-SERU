/*
  Warnings:

  - You are about to drop the `Pricelist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleYear` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pricelist" DROP CONSTRAINT "Pricelist_model_id_fkey";

-- DropForeignKey
ALTER TABLE "Pricelist" DROP CONSTRAINT "Pricelist_year_id_fkey";

-- DropTable
DROP TABLE "Pricelist";

-- DropTable
DROP TABLE "VehicleYear";

-- CreateTable
CREATE TABLE "vehicle_year" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "vehicle_year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricelist" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL,
    "year_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "pricelist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pricelist" ADD CONSTRAINT "pricelist_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "vehicle_year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricelist" ADD CONSTRAINT "pricelist_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "vehicle_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
