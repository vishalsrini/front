import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchElligibleCriteria'
})
export class SearchEligibleCriteriaPipe implements PipeTransform {

  transform(arrayValue: any, term: any): any {
    let eligible_Values: any[] = [];

     if (arrayValue === null) {
            return null;
        } else if (!term) {
            return arrayValue;
        } else {
          eligible_Values = arrayValue.filter( (item) => {
             if (item.label.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
                         item.value.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
                    return true;
                } else {
                  return false;
                }

          } );
        }

    return eligible_Values;
  }

}
