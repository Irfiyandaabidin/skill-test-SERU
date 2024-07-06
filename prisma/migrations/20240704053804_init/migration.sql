-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_brand" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "vehicle_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "vehicle_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_model" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "vehicle_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleYear" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "VehicleYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricelist" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL,
    "year_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Pricelist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vehicle_type" ADD CONSTRAINT "vehicle_type_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "vehicle_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_model" ADD CONSTRAINT "vehicle_model_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "vehicle_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricelist" ADD CONSTRAINT "Pricelist_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "VehicleYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricelist" ADD CONSTRAINT "Pricelist_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "vehicle_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
