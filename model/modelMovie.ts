export interface Movie {
    name:   string;
    detail: string;
    rating: string;
    head:   string;
    day:    string;
    video:  string;
    type:   string[];
    img:    string;
}
export interface resMovie {
    MID:    number;
    Name:   string;
    Image:  string;
    Type:   string;
    detail: string;
    rating: string;
    day:    string;
    head:   string;
    Actor:  Actor[];
    Creaters : Creaters[];
}


export interface Actor {
    PID:    number;
    Name:   string;
    Image:  string;
    detail: string;
}


export interface Creaters {
    PID:    number;
    Name:   string;
    Image:  string;
    detail: string;
}
