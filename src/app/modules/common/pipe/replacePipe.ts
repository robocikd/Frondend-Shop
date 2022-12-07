import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'replace' })
export class ReplacePipe implements PipeTransform {
    transform(value: string, strToReplace: string, replacedStr: string) {
        if (!value || !strToReplace || !replacedStr) {
            return value;
        }
        return value.replace(new RegExp(strToReplace, 'g'), replacedStr);
    }
}