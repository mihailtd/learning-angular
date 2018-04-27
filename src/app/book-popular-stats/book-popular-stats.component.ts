import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { BookModel } from '../book-model';

@Component({
  selector: 'app-book-popular-stats',
  templateUrl: './book-popular-stats.component.html',
  styleUrls: ['./book-popular-stats.component.css']
})
export class BookPopularStatsComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  public barChartData: any[]
  public barChartLabels: String[]
  public barChartType: String = 'bar'


  constructor(private libraryService: LibraryService) { }

  public chartClicked(e:any):void {
    console.log(e)
  }

  public chartHovered(e:any):void {
    console.log(e)
  }

  ngOnInit() {
    let booksWithUser = this.libraryService.books.filter((book: BookModel) => book.users && book.users.length >= 1)
    let data = booksWithUser.map(book => {
      return { title: book.title, numberOfUsers: book.users.length }
    })
    let chartData = {
      labels: data.reduce((acc: String[], book: {title: String, numberOfUsers: Number}): String[] => {
        return [...acc, book.title]
      }, []),
      data: data.reduce((acc: Number[], book: {title: String, numberOfUsers: Number}): Number[] => {
        return [...acc, book.numberOfUsers]
      }, [])
    }
    this.barChartLabels = chartData.labels
    this.barChartData = [ { data: chartData.data, label: 'Books'} ]
  }

}
