import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

interface UrlResponse {
  original_url: string;
  short_url: string;
  expires_at: string;
  created_at: string;
  access_count: number;
}

interface UrlInfo {
  original_url: string;
  short_code: string;
  short_url: string;
  expires_at: string;
  created_at: string;
  access_count: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isValidUrl = false;
  isValidExpiry = true; 
  shortenedUrl: string = '';
  userUrls: UrlInfo[] = [];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth']);
      return;
    }
    this.loadUrls();
  }

  validateUrl(event: any) {
    try {
      new URL(event.target.value);
      this.isValidUrl = true;
    } catch {
      this.isValidUrl = false;
    }
  }

  validateExpiry(event: any) {
    const value = event.target.value;
    this.isValidExpiry = value !== '' && parseInt(value) > 0;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '');
  }

  onShortenUrlClick() {
    const urlInput = document.getElementById('urlInput') as HTMLInputElement;
    const expiryInput = document.getElementById('expiryInput') as HTMLInputElement;
    
    const url = urlInput.value;
    const expiry = parseInt(expiryInput.value) || 7;

    this.dashboardService.shortenUrl(url, expiry).subscribe(
      (response: UrlResponse) => {
        this.shortenedUrl = response.short_url;
        this.loadUrls();
        urlInput.value = '';
        expiryInput.value = '7';
        this.isValidUrl = false;
      },
      error => {
        alert('Error shortening URL: ' + error.message);
      }
    );
  }

  loadUrls() {
    this.dashboardService.getUserUrls().subscribe(
      (response: UrlInfo[]) => {
        this.userUrls = response;
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(['/auth']);
        }
        alert('Error loading URLs: ' + error.message);
      }
    );
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  signOut() {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('token');
      this.router.navigate(['/auth']);
    }
  }
}
