-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_unitId_fkey";

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "unitId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
