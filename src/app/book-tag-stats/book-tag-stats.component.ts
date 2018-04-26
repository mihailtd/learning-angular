import { Component, OnInit } from '@angular/core';
import { BookModel, tags } from '../book-model';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-book-tag-stats',
  templateUrl: './book-tag-stats.component.html',
  styleUrls: ['./book-tag-stats.component.css']
})
export class BookTagStatsComponent implements OnInit {
  public barChartOptions:any = {
    responsive: true
  }
  public pieChartLabels: String[] = this.libraryService.tags;
  public pieChartData: number[] = [10, 10, 10, 10];
  public pieChartType: string = 'pie';

  constructor(private libraryService: LibraryService) { }

  countBooksByTag(tag: String, books: BookModel[]): number {
    return books.reduce((accumulator: number, book: BookModel): number => {
      if (book.tags.includes(tag)) return ++accumulator
      return accumulator
    }, 0)
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    this.libraryService.refetchBooks()
      .then(
        () => this.pieChartData = this.libraryService.tags.map(tag => { return this.countBooksByTag(tag, this.libraryService.books)})
      )
  }

}
