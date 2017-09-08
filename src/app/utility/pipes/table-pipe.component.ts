import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'thPipe'
})
export class TablePipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/([a-z])([A-Z])/g, '$1 $2')
                                // space before last upper in a sequence followed by lower
                                .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
                                // uppercase the first character
                                .replace(/^./, function(str){ return str.toUpperCase(); });
    }
}
