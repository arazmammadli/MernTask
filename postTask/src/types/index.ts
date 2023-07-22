export interface IPost {
    id: number,
    istifadeciAdi: string,
    profilSekli: string,
    tarix: string,
    terkib: string,
    beyenmeler: number,
    seyranlar: number,
    comments: IComment[];
    beyenilibMi: boolean,
}

export interface IComment {
    id: string;
    comment: string
}