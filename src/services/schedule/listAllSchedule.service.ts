import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { iListScheduleAndReal } from "../../interfaces/schedule.interfaces";

export const listAllScheduleAndRealService = async (
  id: Number
): Promise<iListScheduleAndReal> => {
  const realRepo = AppDataSource.getRepository(RealEstate);

  const listAllSchedule = await realRepo
    .createQueryBuilder("realEstate")
    .innerJoinAndSelect("realEstate.address", "realAddress")
    .innerJoinAndSelect("realEstate.schedules", "realSchedule")
    .innerJoinAndSelect("realSchedule.user", "scheduleUser")
    .innerJoinAndSelect("realEstate.category", "realCategory")
    .where("realEstate.id = :id", { id: id })
    .getOne();

  if (!listAllSchedule) {
    throw new AppError("RealEstate not found", 404);
  }

  return listAllSchedule;
};
