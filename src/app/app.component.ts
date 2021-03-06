import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

import {SearchService} from './services/search.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Metadata Registry Service';

  public dynamicClass = 'notScrolled';

  searchForm = this.fb.group({
    searchTerm: FormControl['']
  });

  constructor(
    private search: SearchService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.search.clearSearchField.subscribe(
      res => {
        if (res === true) {
          this.searchForm.get('searchTerm').setValue('');
        }
      }
    );
  }

  get pageTitle(): Subject<string> {
    return this.search.pageTitle;
  }

  get searchField(): Subject<boolean> {
    return this.search.searchField;
  }

  updateSearchTerm() {
    this.search.searchTerm.next(this.searchForm.get('searchTerm').value);
    // console.log(this.searchForm.get('searchTerm').value);
  }

  @HostListener('window:scroll', ['$event'])
  navBarScroll() {
    if (window.scrollY > 50) {
      this.dynamicClass = 'scrolled';
    } else {
      this.dynamicClass = 'notScrolled';
    }
  }
}
