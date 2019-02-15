import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartCustomComponent, DataSourceRegistry, SmartDataSource } from '@consultingwerk/smartcomponent-library';
import { filter, pairwise, map, tap, debounce } from 'rxjs/operators';
import { CalendarComponent, CalendarView } from '@progress/kendo-angular-dateinputs';

@SmartCustomComponent('OrdersCalendar')
@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {

  selectedDate: Date;

  ordersDataSource: SmartDataSource;

  currentOrderData: any[];

  constructor(private dsReg: DataSourceRegistry) { }

  ngOnInit() {
    this.dsReg.dataSourceAdded.pipe(filter(ev => ev.dataSourceName === 'OrderCustomerDataSource'))
      .subscribe(ev => {
        const ordersDataSource = ev.dataSource;

        ordersDataSource.subscribe(ev => this.currentOrderData = ev.data);

        ordersDataSource.selectionChanged.pipe(filter(ev => !!ev && !!ev.newSelection)).subscribe(ev => {
          const selection = ev.newSelection as Consultingwerk.SmartComponentsDemo.OERA.Sports2000.OrderBusinessEntity.eOrder;
          const currentDate: Date = selection.OrderDate;
          this.selectedDate = currentDate;
        });

        this.ordersDataSource = ordersDataSource;
      });
  }

  hasOrder(date: Date) {
    const orderRec = this.findOrderByDate(date);
    return !!orderRec ? 'order' : '';
  }

  selectByOrderDate(date: Date) {
    const orderRec = this.findOrderByDate(date);
    if (!orderRec) {
      return;
    }
    this.ordersDataSource.selected = orderRec;
  }

  findOrderByDate(date: Date) {
    if (!this.currentOrderData) {
      return null;
    }
    const orderRec = this.currentOrderData.filter(record => !!record).find(record => {
      const orderDate: Date = record.OrderDate;
      return orderDate.getFullYear() === date.getFullYear() && orderDate.getMonth() === date.getMonth() && orderDate.getDate() === date.getDate();
    });
    return orderRec;
  }

  monthSelected(date: Date) {
    this.selectedDate = date;
    this.filterOrdersByDate(date);
  }

  filterOrdersByDate(date: Date) {
    if (!date) {
      return;
    }
    const beginDate = new Date(date);
    beginDate.setDate(1);

    const endDate = new Date(date);
    endDate.setMonth(date.getMonth() + 1);
    endDate.setDate(1);

    this.ordersDataSource.filter = [{
      field: 'OrderDate',
      operator: 'gte',
      value: beginDate
    }, {
      field: 'OrderDate',
      operator: 'lt',
      value: endDate
    }]
  }

}
