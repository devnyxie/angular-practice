import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article style="position: relative;">
      <div>
        <img
          class="listing-photo"
          [src]="housingLocation?.photo"
          alt="Exterior photo of {{ housingLocation?.name }}"
          (click)="addOverlay(housingLocation?.photo, $event)"
        />
      </div>
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
      <div *ngIf="showOverlay" class="overlay" (click)="closeOverlay()">
        <!-- Overlay content -->
        <div class="overlay-content">
          <img
            *ngFor="let photo of overlayImgUrls"
            [src]="photo"
            alt="Exterior photo of {{ housingLocation?.name }}"
            class="overlay-photo"
          />
        </div>
      </div>
    </article>
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  //
  showOverlay: boolean = false;
  overlayImgUrls: string[] = [];
  overlayImgUrl: string = '';

  //func to add div to article with custom template. dont use dom manipulation
  addOverlay(url: string | undefined, event: Event) {
    const targetElement = event.target as HTMLElement;
    const parentElement = targetElement.parentElement;
    const childrenCount = parentElement?.children.length || 0;
    if (childrenCount > 0) {
      for (let i = 0; i < childrenCount; i++) {
        const childElement = parentElement?.children[i];
        if (childElement) {
          const url = childElement.getAttribute('src');
          if (url) {
            this.overlayImgUrls.push(url);
          }
        }
      }
    }
    this.showOverlay = true;
  }
  //
  closeOverlay() {
    this.showOverlay = false;
    this.overlayImgUrls = [];
  }
  //
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  //form
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  //
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
