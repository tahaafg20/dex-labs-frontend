import { Component , Input , OnChanges , Output , EventEmitter} from '@angular/core';  
  
@Component({  
  selector: 'app-pagination',  
  templateUrl: './app-pagination.component.html'  
})  
  
export class AppPaginationComponent implements OnChanges {  
    // Check how many total records exist and how many records for every page (Helps to set the component to be used easier dynamically)
    @Input() totalRecords = 0;  
    @Input() recordsPerPage = 0;  
  
    @Output() onPageChange: EventEmitter<number> = new EventEmitter();  
  
    public pages: number [] = [];  
    activePage: number;  
  
    ngOnChanges(): any {  
      const pageCount = this.getPageCount();  
      this.pages = this.getArrayOfPage(pageCount);  
      this.activePage = 1;  
      this.onPageChange.emit(1);  
    }  
  
    private  getPageCount(): number {  
      let totalPage = 0;  
       
      // Check if the inputs to the component are larger than 0
      if (this.totalRecords > 0 && this.recordsPerPage > 0) {  

        // then if they are the number of pages will be the number of records divided by the number of records in any page.
        const pageCount = this.totalRecords / this.recordsPerPage;  

        // Rounding the number of pages
        const roundedPageCount = Math.floor(pageCount);  
        
        // Check if after rounding the pages it is less than the number of pages which are not rounded which sometimes happens and if it is increment it by one.
        totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;  
      }  
  
      return totalPage;  
    }  
    
    // The function that checks the number of how many pages are there and assignes the pages attribute to it.
    private getArrayOfPage(pageCount: number): number [] {  
      const pageArray = [];  
  
      if (pageCount > 0) {  
          for(let i = 1 ; i <= pageCount ; i++) {  
            pageArray.push(i);  
          }  
      }  
  
      return pageArray;  
    }  
  
    // Responsible to handle clicks on any of the pages, to keep track of the current active page and change the active page attribute to the new value.
    onClickPage(pageNumber: number): void {  
        if (pageNumber >= 1 && pageNumber <= this.pages.length) {  
            this.activePage = pageNumber;  
            this.onPageChange.emit(this.activePage);  
        }  
    }  
}  