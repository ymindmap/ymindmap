import { IFourNumber } from '@leafer-ui/interface';
export function getPadding(value: IFourNumber): [number, number, number, number] {
    const list = Array.isArray(value) ? value : [value];

    switch (list.length) {
        case 1:
            return [list[0], list[0], list[0], list[0]];
        case 2:
            return [list[1], list[0], list[1], list[0]];
        case 3:
            return [list[0], list[1], list[2], list[1]];
        case 4:
            return [list[0], list[1], list[2], list[3]];
    }
    return [0, 0, 0, 0];
}