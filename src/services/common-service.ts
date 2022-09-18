import { DeleteResult, EntityTarget, FindOptionsWhereProperty, ObjectLiteral, UpdateResult } from 'typeorm'
import { dataSource } from '../config'

export const findAll = async <Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Promise<Entity[]> => {
  return await dataSource.getRepository(target).find()
}

export const findById = async <Entity extends ObjectLiteral>(target: EntityTarget<Entity>, id: FindOptionsWhereProperty<NonNullable<Entity[string]>>): Promise<Entity | null> => {
  return await dataSource.getRepository(target).findOne({ where: { id } })
}

export const updateById = async <Entity extends ObjectLiteral>(target: EntityTarget<Entity>, id: FindOptionsWhereProperty<NonNullable<Entity[string]>>, updatedEntity: Entity): Promise<UpdateResult> => {
  return await dataSource.getRepository(target).update(id, updatedEntity)
}

export const create = async <Entity extends ObjectLiteral>(target: EntityTarget<Entity>, newEntity: Entity): Promise<Entity> => {
  delete newEntity.id
  return await dataSource.getRepository(target).save(newEntity)
}

export const deleteById = async <Entity extends ObjectLiteral>(target: EntityTarget<Entity>, id: FindOptionsWhereProperty<NonNullable<Entity[string]>>): Promise<DeleteResult> => {
  return await dataSource.getRepository(target).delete(id)
}
