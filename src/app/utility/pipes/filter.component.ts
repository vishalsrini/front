import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy'
})
export class FilterPipe implements PipeTransform {

    transform(value: any[], filter: string, keys: any): any {
        // console.log(filter, keys, value); // Checking
        // let keys = Object.keys(value); // Checking
        // console.log(keys); // Checking
        let filterShowsFalse = false; // Have it to check whether the item present or not
        filter = filter ? filter.toLocaleLowerCase() : null; // Check whether any data present in filter
        return filter ? value.filter((item) => { // Checking whether filter has value. If so then do this function
            for (const key of keys){
                // console.log(key, item[key]); // Checking
                filterShowsFalse = item[key].toString().toLocaleLowerCase().indexOf(filter) !== -1; // Check whether item is present.
                if (filterShowsFalse === true) {
                    return filterShowsFalse; // If item is present then dont check on remaining columns. Just return
                }
            }
            return filterShowsFalse; // Return the final result if item is not there
        }) : value; // return value if filter is not defined
    }
}
