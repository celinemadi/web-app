/** Angular Imports */
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

/** rxjs Imports */
import { of } from 'rxjs';

/**
 * Categories component.
 */
@Component({
  selector: 'mifosx-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  /** Category data. */
  categoryData: any;
  /** Columns to be displayed in categories table. */
  displayedColumns: string[] = ['name', 'currency', 'minimum', 'maximum'];
  /** Data source for categories table. */
  dataSource: MatTableDataSource<any>;

  /** Paginator for categories table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  /** Sorter for categories table. */
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * Retrieves the categories data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(( data: { categories: any }) => {
      this.categoryData = data.categories;
    });
  }

  /**
   * Filters data in categories table based on passed value.
   * @param {string} filterValue Value to filter data.
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Sets the categories table.
   */
  ngOnInit() {
    this.setCategories();
  }

  /**
   * Initializes the data source, paginator and sorter for categories table.
   */
  setCategories() {
    this.dataSource = new MatTableDataSource(this.categoryData);
    this.dataSource.paginator = this.paginator;
  
    this.dataSource.sort = this.sort;
  }

}
