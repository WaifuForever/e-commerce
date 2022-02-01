export interface IProduct {
    name: string;
    price: number;
    description: string;   
    _id?: string;
    user_id?: string;
}

export interface IFindOne {
    _id: string;
    price: string;
    description: string;  
    name: string;
}

export interface IUpdate {
    _id: string;
    price?: string;
    description?: string;  
    name?: string;
}

