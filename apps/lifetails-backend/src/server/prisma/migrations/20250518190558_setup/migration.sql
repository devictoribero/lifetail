-- CreateEnum
CREATE TYPE "LanguageCode" AS ENUM ('en', 'es');

-- CreateEnum
CREATE TYPE "Species" AS ENUM ('Dog', 'Cat');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "LifeMomentType" AS ENUM ('Achievement', 'Anniversary', 'Arrival', 'Bath', 'Death', 'DietChange', 'Discomfort', 'Excursion', 'Exercise', 'Gift', 'Goodbye', 'GroomingVisit', 'Hydration', 'Illness', 'Injury', 'Medication', 'Move', 'NailCut', 'Play', 'Socialization', 'SpecialMeal', 'Surgery', 'Training', 'Vaccination', 'VeterinaryVisit', 'Walk');

-- CreateEnum
CREATE TYPE "LifeMomentTheme" AS ENUM ('Celebration', 'Memories', 'Activity', 'DeliciousMoments', 'GroomingAndCare', 'Wellness', 'Farewell');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preferred_language" "LanguageCode" NOT NULL DEFAULT 'en',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "species" "Species" NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "sterilized" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL,
    "anniversary_date" TIMESTAMP(3),
    "owner_id" TEXT,
    "chip_id" TEXT,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veterinary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "email" TEXT,
    "primary_phone" TEXT,
    "emergency_phone" TEXT,
    "notes" TEXT,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Veterinary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifeMoment" (
    "id" TEXT NOT NULL,
    "type" "LifeMomentType" NOT NULL,
    "theme" "LifeMomentTheme" NOT NULL,
    "pet_id" TEXT NOT NULL,
    "occurred_on" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "LifeMoment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_id_key" ON "User"("account_id");
