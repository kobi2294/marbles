export interface DiagramViewModel {
    readonly totalTime: number;
    readonly nexts: NextViewModel[];
}

export interface NextViewModel {
    readonly value: string;
    readonly time: number;
}