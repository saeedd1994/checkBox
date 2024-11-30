import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  filterForm: FormGroup;
  mockData: any[] = [];

  // Checkbox options
  checkBoxOptions = ['sale', 'resale', 'block', 'unblock'];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      selectedOptions: [[]], // For storing selected checkboxes
    });
  }


  // Fetch mock data (simulate server request)
  fetchData() {
    // Mock data
    const mockServerResponse = [
      { id: 1, type: 'sale', date: '2024-11-29' },
      { id: 2, type: 'resale', date: '2024-11-28' },
      { id: 3, type: 'block', date: '2024-11-27' },
      { id: 4, type: 'unblock', date: '2024-11-26' },
    ];
    console.log('Fetched Data:', mockServerResponse);
    this.mockData = mockServerResponse;
  }


  // Handle form submission
  applyFilters() {
    if (this.filterForm.valid) {
      const { fromDate, toDate, selectedOptions } = this.filterForm.value;

      // Filter the mock data
      const filteredData = this.mockData.filter((item) =>
        selectedOptions.includes(item.type)
      );
      console.log('Filtered Data:', filteredData);
    } else {
      console.log('Form is invalid');
    }
  }

  toggleOption(option: string, checked: boolean): void {
    const selectedOptions: string[] = this.filterForm.value.selectedOptions || [];

    if (checked) {
      // Add the option to the selected options if it's not already there
      if (!selectedOptions.includes(option)) {
        selectedOptions.push(option);
      }
    } else {
      // Remove the option from the selected options
      const index = selectedOptions.indexOf(option);
      if (index > -1) {
        selectedOptions.splice(index, 1);
      }
    }

    // Update the form control value
    this.filterForm.patchValue({ selectedOptions });
  }

}
