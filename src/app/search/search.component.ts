import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterPipe } from '../filter.pipe';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: string = '';
  reminders = [];
  constructor(private route: ActivatedRoute, private filter: FilterPipe<any>) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.reminders = data.reminders;
    });
  }

  get filtered() {
    return this.filter.transform(this.reminders, this.search, 'note');
  }
}
