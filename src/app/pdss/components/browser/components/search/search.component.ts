import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm = this.formBuilder.group({
    keyword: ['', Validators.required],
  });
  searchKeyword: string | null;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  search(): void {
    // get the input text send to browser
    this.searchForm.markAllAsTouched();

    if (this.searchForm.valid) {
      const formValue = this.searchForm.value;
      const keyword = formValue.keyword;
      this.searchKeyword = keyword;
      this.searchKeyword = this.searchKeyword.trim();
    }
    this.router.navigate(['/pdss/browser'], {
      queryParams: { keyword: this.searchKeyword },
    });
  }
}
