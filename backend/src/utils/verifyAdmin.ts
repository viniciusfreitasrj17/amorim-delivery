/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { getRepository } from 'typeorm';
import Admin from '../models/AdminMaster';

export const verifyAdmin = async (userId: string): Promise<boolean> => {
  const repoAdmin = getRepository(Admin);
  const adminVerify = await repoAdmin.findOne({ where: { id: userId } });
  if (adminVerify?.master === undefined) {
    return false;
  }
  return true;
};

export const verifyAdminMaster = async (userId: string): Promise<boolean> => {
  const repoAdmin = getRepository(Admin);
  const adminVerify = await repoAdmin.findOne({ where: { id: userId } });
  if (!adminVerify?.master) {
    return false;
  }
  return true;
};
