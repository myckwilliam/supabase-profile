import { environment } from 'src/environments/environment';
import { Component, inject, OnInit } from '@angular/core';

import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private readonly supabase = inject(SupabaseService);
  env = environment;

  session = this.supabase.session;

  ngOnInit() {
    this.supabase.authChanges((event, session) => {
      this.session = session;
    });
  }
}
