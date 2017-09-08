import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginationPipePipe implements PipeTransform {

 transform(items: any[], args: any[]): any {

    let pagedItems: any[]; // total filter items
    const start = args[0]; // startIndex
    const end = args[1]; // endIndex

     //   console.log('pagination arguments----' + args[0] + 'and' + args[1] );

     pagedItems = items.slice(start, end + 1);  // show currentpage items by filtering the array
    return pagedItems;
  }
}
