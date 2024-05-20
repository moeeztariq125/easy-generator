import {
  ModelStatic,
  FindOptions,
  UpdateOptions,
  CreateOptions,
  Model,
  FindAttributeOptions,
  DestroyOptions,
  CountOptions,
} from 'sequelize';

abstract class BaseRepository<T extends {}> {
  private model: ModelStatic<any>;
  constructor(model: ModelStatic<any>) {
    this.model = model;
  }
  async findById(id: string, attributes?: FindAttributeOptions): Promise<T | null> {
    return await this.model.findByPk(id, { attributes });
  }
  async findOne(filter: FindOptions): Promise<T> {
    return await this.model.findOne(filter);
  }
  async create(createObj: Partial<T>, createOptions?: CreateOptions): Promise<T | null> {
    try {
      return await this.model.create(createObj, createOptions);
    } catch (error) {
      console.error('Error creating entity:', error);
      return null;
    }
  }

  async updateOne(updateObj: Partial<T>, filter: UpdateOptions): Promise<T | null> {
    try {
      const [numOfRowsUpdated, [updatedDoc]] = await this.model.update(updateObj, {
        ...filter,
        returning: true,
      });

      if (numOfRowsUpdated === 0 || !updatedDoc) {
        // If no rows were updated or no document was returned, the document was not found
        return null;
      }

      return updatedDoc;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default BaseRepository;
