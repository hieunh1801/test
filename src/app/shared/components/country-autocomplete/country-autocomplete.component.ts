import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { CountryService, Country } from '@shared/services/country.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-country-autocomplete',
  exportAs: 'countryAutocomplete',
  templateUrl: './country-autocomplete.component.html',
  styleUrls: ['./country-autocomplete.component.scss'],
})
export class CountryAutocompleteComponent implements OnInit, OnDestroy {
  control = new FormControl();

  countryOptions: Country[] = null;

  subscription$ = new Subscription();

  @ViewChild(MatAutocomplete) autoComplete: MatAutocomplete;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    const sub = this.control.valueChanges
      .pipe(
        filter((value) => value?.trim()),
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe((value: string) => {
        this.loadCountry(value);
      });

    this.subscription$.add(sub);
  }

  loadCountry(name: string): void {
    this.countryService.getAllCountry(name).subscribe((response) => {
      this.countryOptions = response?.data?.items || [];
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
