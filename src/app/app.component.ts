import {Component, OnInit} from '@angular/core';
import restaurants from '../assets/restaurants.json';
import {Event} from '@angular/router';
import {MatSelectChange, MatTableDataSource} from '@angular/material';
import {Restaurant} from './models/Restaurant';
import {FormControl} from '@angular/forms';

let RESTAURANTS: Restaurant[];
RESTAURANTS = restaurants;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor() {

  }
  title = 'Restaurants';
  cusinesArr = [];
  displayedColumns: string[] = [
    'restaurantName',
    'cuisines',
    'averageCostForTwo',
    'currency', 'hasTableBooking',
    'hasOnlineDelivery'
  ];
  dataSource = new MatTableDataSource(RESTAURANTS);
  cusineFormControl: any;

  ngOnInit(): void {
    const cusines = new Set();
    RESTAURANTS.forEach((res) => {
      res.cuisines.split(',').forEach(cusine => {
        if (cusine.trim() !== '') {
          cusines.add(cusine.trim());
        }
      });
    });
    this.cusinesArr = Array.from(cusines.values());
    this.cusineFormControl = new FormControl();
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByCusine(change: MatSelectChange) {
    this.dataSource.filter = change.value;
  }
}
