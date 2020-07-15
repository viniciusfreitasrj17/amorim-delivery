import { EntityRepository, Repository } from 'typeorm';
import Food from '../models/Food';

@EntityRepository(Food)
export default class ClassRepository extends Repository<Food> {
  public async findByFoodId(id: string): Promise<Food[]> {
    return this.find({
      where: {
        id
      }
    });
  }
}
