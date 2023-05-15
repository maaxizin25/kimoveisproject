import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { iCreateSchedule } from "../../interfaces/schedule.interfaces";

export const createScheduleService = async (
  data: iCreateSchedule,
  id: number
) => {
  const day = new Date(data.date).getDay();

  if (day === 6 || day === 0) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const hour: Array<string> = data.hour.split(":");

  if (Number(hour[0]) < 8 || Number(hour[0]) > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const repoEstate: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const repoSchedule: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const repoUser: Repository<User> = AppDataSource.getRepository(User);

  const schedule = repoSchedule.createQueryBuilder("schedule");

  const verifyDisponibilityRealEstate = await schedule
    .innerJoinAndSelect("schedule.realEstate", "scheduleReal")
    .where("scheduleReal.id = :id", { id: data.realEstateId })
    .andWhere("schedule.hour = :hour", { hour: data.hour })
    .andWhere("schedule.date = :date", { date: data.date })
    .getOne();

  if (verifyDisponibilityRealEstate) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const verifyUserAlreadySchedule = await schedule
    .innerJoinAndSelect("schedule.user", "scheduleUser")
    .where("scheduleUser.id = :userId", { userId: id })
    .andWhere("schedule.hour = :hour", { hour: data.hour })
    .andWhere("schedule.date = :date", { date: data.date })
    .getOne();

  if (verifyUserAlreadySchedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const findUser = await repoUser.findOneBy({
    id: id,
  });

  const findEstate = await repoEstate.findOneBy({
    id: data.realEstateId,
  });

  if (!findEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const createSchedule = repoSchedule.create({
    ...data,
    realEstate: findEstate!,
    user: findUser!,
  });

  await repoSchedule.save(createSchedule);

  return;
};
