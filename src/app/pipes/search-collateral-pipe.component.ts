import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchCollateral'
})
export class SearchCollateralPipe implements PipeTransform {

    transform(arrayValue: any, term: any): any {
        let collateral_search: Array<any> = [];
        // console.log(term);
        if (arrayValue === null) {
            return null;
        } else if (!term) {
            return arrayValue;
        } else {
            collateral_search = arrayValue.filter((item) => {
                // console.log('inside filter', item);
                if (item.fieldName.toLowerCase().indexOf(term.toLowerCase())!=-1) {
                    return true;
                } else if (item.values !== null) {
                    // console.log('inside filter not true', item);
                    for (let i = 0; i < item.values.length; i++) {
                        // console.log(' i = ' + i + ' ' + item.values[i]);
                        if (item.values[i].fieldName.toLowerCase().indexOf(term.toLowerCase())!=-1) {
                            return true;
                        }
                        if (item.values[i].values != null) {
                            console.log('Need to come here for All corporates', item.values[i].values);
                            for (let j = 0; j < item.values[i].values.length; j++) {
                                // console.log('corporate Bonds' + item.values[i].values[j]);
                                if (item.values[i].values[j].fieldName.toLowerCase().indexOf(term.toLowerCase())!=-1) {
                                    return true;
                                }
                            }
                        }
                    }
                } else {
                    return false;
                }
            }
            );
            return collateral_search;
        }

    }

}