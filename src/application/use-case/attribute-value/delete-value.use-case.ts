import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IAttributeValue } from "../../../domain/interfaces/value.interface";

@Injectable()
export class DeleteAttributeValue {
    constructor(private readonly repository: IAttributeValue) { }

    async delete(id: number) {
        const value = await this.repository.findById(id);
        if (!value) {
            throw new NotFoundException('value not found')
        }

        try {
            await this.repository.delete(value.id, value.name);
        } catch (e) {
            console.log(e);

            throw new BadRequestException('ups algo salio mal')
        }
    }
}