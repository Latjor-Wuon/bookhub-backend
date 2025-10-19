import mongoose, { Document } from 'mongoose';
export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
    isbn: string;
    description: string;
    coverImage?: string;
    rating?: number;
    price?: number;
    availability: 'available' | 'unavailable';
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IBook, {}, {}, {}, mongoose.Document<unknown, {}, IBook, {}, {}> & IBook & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Book.d.ts.map