import { Component } from '@angular/core';
import { ProfileComponent } from '../components/profile/profile.component';
import { PortfolioComponent } from '../components/portfolio/portfolio.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileComponent, PortfolioComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
