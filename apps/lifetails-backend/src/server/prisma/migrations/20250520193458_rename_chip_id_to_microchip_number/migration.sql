/*
  Warnings:

  - The values [Male,Female] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [en,es] on the enum `LanguageCode` will be removed. If these variants are still used in the database, this will fail.
  - The values [Celebration,Memories,Activity,DeliciousMoments,GroomingAndCare,Wellness,Farewell] on the enum `LifeMomentTheme` will be removed. If these variants are still used in the database, this will fail.
  - The values [Achievement,Anniversary,Arrival,Bath,Death,DietChange,Discomfort,Excursion,Exercise,Gift,Goodbye,GroomingVisit,Hydration,Illness,Injury,Medication,Move,NailCut,Play,Socialization,SpecialMeal,Surgery,Training,Vaccination,VeterinaryVisit,Walk] on the enum `LifeMomentType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Dog,Cat] on the enum `Species` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `anniversary_date` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `chip_id` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "Pet" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "LanguageCode_new" AS ENUM ('EN', 'ES');
ALTER TABLE "User" ALTER COLUMN "preferred_language" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "preferred_language" TYPE "LanguageCode_new" USING ("preferred_language"::text::"LanguageCode_new");
ALTER TYPE "LanguageCode" RENAME TO "LanguageCode_old";
ALTER TYPE "LanguageCode_new" RENAME TO "LanguageCode";
DROP TYPE "LanguageCode_old";
ALTER TABLE "User" ALTER COLUMN "preferred_language" SET DEFAULT 'EN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "LifeMomentTheme_new" AS ENUM ('CELEBRATION', 'MEMORIES', 'ACTIVITY', 'DELICIOUS_MOMENTS', 'GROOMING_AND_CARE', 'WELLNESS', 'FAREWELL');
ALTER TABLE "LifeMoment" ALTER COLUMN "theme" TYPE "LifeMomentTheme_new" USING ("theme"::text::"LifeMomentTheme_new");
ALTER TYPE "LifeMomentTheme" RENAME TO "LifeMomentTheme_old";
ALTER TYPE "LifeMomentTheme_new" RENAME TO "LifeMomentTheme";
DROP TYPE "LifeMomentTheme_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "LifeMomentType_new" AS ENUM ('ACHIEVEMENT', 'ANNIVERSARY', 'ARRIVAL', 'BATH', 'DEATH', 'DIET_CHANGE', 'DISCOMFORT', 'EXCURSION', 'EXERCISE', 'GIFT', 'GOODBYE', 'GROOMING_VISIT', 'HYDRATION', 'ILLNESS', 'INJURY', 'MEDICATION', 'MOVE', 'NAIL_CUT', 'PLAY', 'SOCIALIZATION', 'SPECIAL_MEAL', 'SURGERY', 'TRAINING', 'VACCINATION', 'VETERINARY_VISIT', 'WALK');
ALTER TABLE "LifeMoment" ALTER COLUMN "type" TYPE "LifeMomentType_new" USING ("type"::text::"LifeMomentType_new");
ALTER TYPE "LifeMomentType" RENAME TO "LifeMomentType_old";
ALTER TYPE "LifeMomentType_new" RENAME TO "LifeMomentType";
DROP TYPE "LifeMomentType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Species_new" AS ENUM ('DOG', 'CAT');
ALTER TABLE "Pet" ALTER COLUMN "species" TYPE "Species_new" USING ("species"::text::"Species_new");
ALTER TYPE "Species" RENAME TO "Species_old";
ALTER TYPE "Species_new" RENAME TO "Species";
DROP TYPE "Species_old";
COMMIT;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "anniversary_date",
DROP COLUMN "chip_id",
ADD COLUMN     "arrival_date" TIMESTAMP(3),
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "color" TEXT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "microchip_number" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "preferred_language" SET DEFAULT 'EN';
