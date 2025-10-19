import { Request, Response } from 'express';
export declare const getAllBooks: (req: Request, res: Response) => Promise<void>;
export declare const getBookById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getGenres: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=bookController.d.ts.map